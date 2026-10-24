import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  unref,
  watch,
} from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { isUndefined } from 'lodash-unified'
import { usePopper } from '@element-plus/hooks'
import { POPPER_INJECTION_KEY } from '../constants'
import { buildPopperOptions, unwrapMeasurableEl } from '../utils'

import type { Modifier } from '@popperjs/core'
import type { PartialOptions } from '@element-plus/hooks'
import type { PopperContentProps } from '../content'

const DEFAULT_ARROW_OFFSET = 0

export const usePopperContent = (props: PopperContentProps) => {
  const { popperInstanceRef, contentRef, triggerRef, role } = inject(
    POPPER_INJECTION_KEY,
    undefined
  )!

  const arrowRef = ref<HTMLElement>()
  const arrowOffset = computed(() => props.arrowOffset)

  const eventListenerModifier = computed(() => {
    return {
      name: 'eventListeners',
      enabled: !!props.visible,
    } as Modifier<'eventListeners', any>
  })

  const arrowModifier = computed(() => {
    const arrowEl = unref(arrowRef)
    const offset = unref(arrowOffset) ?? DEFAULT_ARROW_OFFSET
    // 看起来 Modifier 类型要求提供 `phase` 和 `fn`
    // 但它的文档中并未明确说明这一点。
    // 参考 https://popper.js.org/docs/v2/modifiers/arrow/
    return {
      name: 'arrow',
      enabled: !isUndefined(arrowEl),
      options: {
        element: arrowEl,
        padding: offset,
      },
    } as any
  })

  const options = computed<PartialOptions>(() => {
    return {
      onFirstUpdate: () => {
        update()
      },
      ...buildPopperOptions(props, [
        unref(arrowModifier),
        unref(eventListenerModifier),
      ]),
    }
  })

  const computedReference = computed(
    () => unwrapMeasurableEl(props.referenceEl) || unref(triggerRef)
  )

  const { attributes, state, styles, update, forceUpdate, instanceRef } =
    usePopper(computedReference, contentRef, options)

  watch(instanceRef, (instance) => (popperInstanceRef.value = instance), {
    flush: 'sync',
  })

  onMounted(() => {
    watch(
      () => unref(computedReference)?.getBoundingClientRect?.(),
      () => {
        update()
      }
    )
  })

  // todo: 当 peerDependencies 中的 vue 为 ^3.5.0 时，替换为 onCleanup。
  let stopResizeObserver: (() => void) | undefined
  watch(
    () => props.visible,
    (visible) => {
      stopResizeObserver?.()
      stopResizeObserver = undefined
      if (visible) {
        stopResizeObserver = useResizeObserver(contentRef, update).stop
      }
    }
  )

  onBeforeUnmount(() => {
    popperInstanceRef.value = undefined
    stopResizeObserver?.()
    stopResizeObserver = undefined
  })

  return {
    attributes,
    arrowRef,
    contentRef,
    instanceRef,
    state,
    styles,
    role,

    forceUpdate,
    update,
  }
}

export type UsePopperContentReturn = ReturnType<typeof usePopperContent>
