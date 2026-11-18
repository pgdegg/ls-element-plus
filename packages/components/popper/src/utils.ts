import { unrefElement } from '@vueuse/core'
import { detectOverflow } from '@popperjs/core'
import { isClient } from '@element-plus/utils'

import type { ComponentPublicInstance, MaybeRef } from 'vue'
import type { Modifier } from '@popperjs/core'
import type { Measurable } from './constants'
import type { PopperCoreConfigProps } from './content'

export const buildPopperOptions = (
  props: PopperCoreConfigProps,
  modifiers: Modifier<any, any>[] = []
) => {
  const { placement, strategy, popperOptions } = props
  const options = {
    placement,
    strategy,
    ...popperOptions,
    modifiers: [...genModifiers(props), ...modifiers],
  }

  deriveExtraModifiers(options, popperOptions?.modifiers)
  return options
}

export const unwrapMeasurableEl = (
  $el: MaybeRef<Measurable | undefined | ComponentPublicInstance>
) => {
  if (!isClient) return
  return unrefElement($el as HTMLElement)
}

function genModifiers(options: PopperCoreConfigProps) {
  const { offset, gpuAcceleration, fallbackPlacements, boundariesPadding } =
    options
  return [
    {
      name: 'offset',
      options: {
        offset: [0, offset ?? 12],
      },
    },
    createSizeModifier(),
    {
      name: 'preventOverflow',
      options: {
        padding: boundariesPadding ?? 0,
        // 空间不足时允许沿两个方向避让，不为保持贴边而将面板留在视口外。
        altAxis: true,
        tether: false,
      },
    },
    {
      name: 'flip',
      options: {
        padding: boundariesPadding ?? 0,
        // 横向或纵向偏移交给避让处理，不因侧边空间不足而错误翻到其他方向。
        altAxis: false,
        fallbackPlacements,
      },
    },
    {
      name: 'computeStyles',
      options: {
        gpuAcceleration,
      },
    },
  ]
}

// 先限制尺寸再进行翻转和避让，超出边界的内容在面板内滚动。
function createSizeModifier(): Modifier<'limitSize', Record<string, never>> {
  let originalStyle: Record<string, string> = {}
  let originalLimits: Record<string, string> = {}
  return {
    name: 'limitSize',
    enabled: true,
    phase: 'main',
    requires: ['popperOffsets'],
    requiresIfExists: ['offset'],
    effect: ({ state }) => {
      const element = state.elements.popper
      const computedStyle = getComputedStyle(element)
      originalStyle = {}
      originalLimits = {}
      for (const key of [
        'maxWidth',
        'maxHeight',
        'minWidth',
        'minHeight',
        'overflow',
        'overflowX',
        'overflowY',
      ] as const) {
        originalStyle[key] = element.style[key]
        originalLimits[key] =
          computedStyle[key] || (key.startsWith('max') ? 'none' : '0px')
      }
      return () => Object.assign(element.style, originalStyle)
    },
    fn: ({ state }) => {
      const element = state.elements.popper
      const overflowOptions =
        state.orderedModifiers.find(({ name }) => name === 'preventOverflow')
          ?.options ?? {}
      const overflow = detectOverflow(state, overflowOptions)
      const referenceOverflow = detectOverflow(state, {
        ...overflowOptions,
        elementContext: 'reference',
        altBoundary: !overflowOptions.altBoundary,
      })
      const parent = element.offsetParent
      const parentRect =
        parent instanceof HTMLElement
          ? parent.getBoundingClientRect()
          : undefined
      const scaleX =
        parent instanceof HTMLElement && parent.offsetWidth
          ? parentRect!.width / parent.offsetWidth || 1
          : 1
      const scaleY =
        parent instanceof HTMLElement && parent.offsetHeight
          ? parentRect!.height / parent.offsetHeight || 1
          : 1
      let width = Math.max(
        0,
        (state.rects.popper.width - overflow.left - overflow.right) / scaleX
      )
      let height = Math.max(
        0,
        (state.rects.popper.height - overflow.top - overflow.bottom) / scaleY
      )
      const placement = state.options.placement.split('-')[0]
      const offset = state.modifiersData.offset?.[state.placement]
      // 优先使用触发元素两侧的可用空间，避免大面板遮住输入框或触发按钮。
      if (placement === 'top' || placement === 'bottom') {
        const available =
          (Math.max(-referenceOverflow.top, -referenceOverflow.bottom) -
            Math.abs(offset?.y ?? 0)) /
          scaleY
        if (available > 0) height = Math.min(height, available)
      } else if (placement === 'left' || placement === 'right') {
        const available =
          (Math.max(-referenceOverflow.left, -referenceOverflow.right) -
            Math.abs(offset?.x ?? 0)) /
          scaleX
        if (available > 0) width = Math.min(width, available)
      }
      const computedStyle = getComputedStyle(element)
      const extraWidth =
        computedStyle.boxSizing === 'border-box'
          ? 0
          : Number.parseFloat(computedStyle.borderLeftWidth || '0') +
            Number.parseFloat(computedStyle.borderRightWidth || '0') +
            Number.parseFloat(computedStyle.paddingLeft || '0') +
            Number.parseFloat(computedStyle.paddingRight || '0')
      const extraHeight =
        computedStyle.boxSizing === 'border-box'
          ? 0
          : Number.parseFloat(computedStyle.borderTopWidth || '0') +
            Number.parseFloat(computedStyle.borderBottomWidth || '0') +
            Number.parseFloat(computedStyle.paddingTop || '0') +
            Number.parseFloat(computedStyle.paddingBottom || '0')
      for (const [dimension, limit] of [
        ['Width', Math.max(0, width - extraWidth)],
        ['Height', Math.max(0, height - extraHeight)],
      ] as const) {
        const maximum = `max${dimension}` as 'maxWidth' | 'maxHeight'
        const minimum = `min${dimension}` as 'minWidth' | 'minHeight'
        element.style[maximum] =
          originalLimits[maximum] === 'none'
            ? `${limit}px`
            : `min(${originalLimits[maximum]}, ${limit}px)`
        element.style[minimum] = `min(${originalLimits[minimum]}, ${limit}px)`
      }
      if (
        element.scrollWidth > element.clientWidth ||
        element.scrollHeight > element.clientHeight
      ) {
        element.style.overflow = 'auto'
      } else {
        Object.assign(element.style, {
          overflow: originalStyle.overflow,
          overflowX: originalStyle.overflowX,
          overflowY: originalStyle.overflowY,
        })
      }
      if (
        state.rects.popper.width !== element.offsetWidth ||
        state.rects.popper.height !== element.offsetHeight
      ) {
        state.rects.popper.width = element.offsetWidth
        state.rects.popper.height = element.offsetHeight
        state.reset = true
      }
    },
  }
}

function deriveExtraModifiers(
  options: any,
  modifiers: NonNullable<PopperCoreConfigProps['popperOptions']>['modifiers']
) {
  if (modifiers) {
    options.modifiers = [...options.modifiers, ...(modifiers ?? [])]
  }
}
