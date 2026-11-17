import {
  computed,
  inject,
  onDeactivated,
  provide,
  shallowRef,
  watch,
} from 'vue'
import { useEventListener } from '@vueuse/core'

import type { InjectionKey, Ref, ShallowRef } from 'vue'

interface ScrollTarget {
  element: HTMLElement
  wrap: HTMLElement
}

interface NestedScrollbarContext {
  owner: ShallowRef<HTMLElement | undefined>
  targets: WeakMap<HTMLElement, Ref<HTMLDivElement | undefined>>
}

const nestedScrollbarKey: InjectionKey<NestedScrollbarContext> =
  Symbol('nestedScrollbar')

// 仅协调显示归属，滚动和边界传递仍由浏览器处理。
const resolveScrollbarOwner = (
  targets: ScrollTarget[],
  deltaX = 0,
  deltaY = 0
) => {
  const overflowing = targets.filter(
    ({ wrap }) =>
      wrap.scrollHeight > wrap.clientHeight + 1 ||
      wrap.scrollWidth > wrap.clientWidth + 1
  )
  if (!deltaX && !deltaY) return overflowing[0]?.element

  const horizontal = Math.abs(deltaX) > Math.abs(deltaY)
  const delta = horizontal ? deltaX : deltaY
  const directional = overflowing.filter(({ wrap }) =>
    horizontal
      ? wrap.scrollWidth > wrap.clientWidth + 1
      : wrap.scrollHeight > wrap.clientHeight + 1
  )
  const available = directional.find(({ wrap }) => {
    const offset = horizontal ? wrap.scrollLeft : wrap.scrollTop
    const limit = horizontal
      ? wrap.scrollWidth - wrap.clientWidth
      : wrap.scrollHeight - wrap.clientHeight
    return delta < 0 ? offset > 1 : offset < limit - 1
  })
  return (
    available?.element ??
    directional[directional.length - 1]?.element ??
    overflowing[0]?.element
  )
}

export const useNestedScrollbar = (
  root: Ref<HTMLDivElement | undefined>,
  wrap: Ref<HTMLDivElement | undefined>
) => {
  const context = inject(nestedScrollbarKey, undefined) ?? {
    owner: shallowRef<HTMLElement>(),
    targets: new WeakMap<HTMLElement, Ref<HTMLDivElement | undefined>>(),
  }
  provide(nestedScrollbarKey, context)

  const releaseOwner = () => {
    if (context.owner.value && root.value?.contains(context.owner.value)) {
      context.owner.value = undefined
    }
  }

  watch(root, (element, _previous, onCleanup) => {
    if (!element) return
    context.targets.set(element, wrap)
    onCleanup(() => {
      context.targets.delete(element)
      if (context.owner.value && element.contains(context.owner.value)) {
        context.owner.value = undefined
      }
    })
  })
  onDeactivated(releaseOwner)

  const selectOwner = (event: MouseEvent | WheelEvent) => {
    const targets: ScrollTarget[] = []
    for (const node of event.composedPath()) {
      if (!(node instanceof HTMLElement)) continue
      const targetWrap = context.targets.get(node)?.value
      if (targetWrap) targets.push({ element: node, wrap: targetWrap })
    }
    const wheel = event instanceof WheelEvent
    context.owner.value = resolveScrollbarOwner(
      targets,
      wheel
        ? event.shiftKey && !event.deltaX
          ? event.deltaY
          : event.deltaX
        : 0,
      wheel && !event.shiftKey ? event.deltaY : 0
    )
  }

  const closestScrollbar = (node: EventTarget | null) => {
    let element = node instanceof Element ? node : null
    while (element) {
      if (element instanceof HTMLElement && context.targets.has(element))
        return element
      element = element.parentElement
    }
    return null
  }

  useEventListener(root, 'mouseover', (event) => {
    // 在同一区域移动时，不抢回已经交给外层的显示归属。
    if (
      closestScrollbar(event.target) !== closestScrollbar(event.relatedTarget)
    ) {
      selectOwner(event)
    }
  })
  useEventListener(root, 'wheel', selectOwner, { passive: true })
  useEventListener(
    root,
    'scroll',
    (event) => {
      if (context.owner.value && event.target === wrap.value) {
        context.owner.value = root.value
      }
    },
    { capture: true, passive: true }
  )
  useEventListener(root, 'mouseleave', releaseOwner)

  const active = computed(
    () => !!root.value && context.owner.value === root.value
  )
  const suppressed = computed(() => !!context.owner.value && !active.value)
  return { active, suppressed }
}
