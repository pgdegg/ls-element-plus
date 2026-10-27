import { buildProps, definePropType } from '@element-plus/utils'
import { popperTriggerPropDefs } from '@element-plus/components/popper/src/trigger'
import { EVENT_CODE } from '@element-plus/constants'

import type { PopperTriggerProps } from '@element-plus/components/popper'
import type { Arrayable } from '@element-plus/utils'

export type TooltipTriggerType = 'hover' | 'focus' | 'click' | 'contextmenu'

export interface UseTooltipTriggerProps extends PopperTriggerProps {
  /**
   * @description Tooltip 是否禁用
   */
  disabled?: boolean
  /**
   * @description tooltip 如何触发（显示），在受控模式下无效
   */
  trigger?: Arrayable<TooltipTriggerType>
  /**
   * @description 鼠标点击聚焦到触发元素时，可定义一组键盘码，通过键盘控制 tooltip 的显示，在受控模式下无效
   */
  triggerKeys?: string[]
  /**
   * @description 通过 hover 触发 tooltip 时，是否聚焦触发元素，以提升可访问性
   */
  focusOnTarget?: boolean
}

export const useTooltipTriggerPropsDefaults = {
  trigger: 'hover',
  triggerKeys: () => [
    EVENT_CODE.enter,
    EVENT_CODE.numpadEnter,
    EVENT_CODE.space,
  ],
} as const

/** @internal Runtime prop definitions; use the public props interface for types. */
export const tooltipTriggerPropDefs = buildProps({
  ...popperTriggerPropDefs,
  /**
   * @description Tooltip 是否禁用
   */
  disabled: Boolean,
  /**
   * @description tooltip 如何触发（显示），在受控模式下无效
   */
  trigger: {
    type: definePropType<Arrayable<TooltipTriggerType>>([String, Array]),
    default: 'hover',
  },
  /**
   * @description 鼠标点击聚焦到触发元素时，可定义一组键盘码，通过键盘控制 tooltip 的显示，在受控模式下无效
   */
  triggerKeys: {
    type: definePropType<string[]>(Array),
    default: () => [EVENT_CODE.enter, EVENT_CODE.numpadEnter, EVENT_CODE.space],
  },
  /**
   * @description 通过 hover 触发 tooltip 时，是否聚焦触发元素，以提升可访问性
   */
  focusOnTarget: Boolean,
} as const)
