import { buildProps, isBoolean } from '@element-plus/utils'
import {
  useTooltipContentPropsDefaults,
  useTooltipTriggerPropsDefaults,
} from '@element-plus/components/tooltip'
import { tooltipPropDefs } from '@element-plus/components/tooltip/src/tooltip'
import { dropdownProps } from '@element-plus/components/dropdown'
import { popperArrowPropsDefaults } from '@element-plus/components/popper'
import { omit } from 'lodash-unified'

import type { UseTooltipProps } from '@element-plus/components/tooltip'
import type Popover from './popover.vue'

export interface PopoverProps extends Omit<
  UseTooltipProps,
  'ariaLabel' | 'gpuAcceleration' | 'rawContent'
> {
  /**
   * @description Popover 的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
   */
  tabindex?: string | number
  /**
   * @description popover 标题
   */
  title?: string
  /**
   * @description popover 宽度
   */
  width?: string | number
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const popoverPropDefs = buildProps({
  ...omit(tooltipPropDefs, ['ariaLabel', 'gpuAcceleration', 'rawContent']),
  /**
   * @description popover 的弹出位置
   */
  placement: dropdownProps.placement,
  /**
   * @description Popover 的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
   */
  tabindex: dropdownProps.tabindex,
  /**
   * @description Tooltip 主题，内置主题：`dark` / `light`
   */
  effect: {
    ...tooltipPropDefs.effect,
    default: 'light',
  },
  /**
   * @description popover 标题
   */
  title: String,
  /**
   * @description popover 宽度
   */
  width: {
    type: [String, Number],
    default: 150,
  },
  /**
   * @description popover 偏移量
   */
  offset: {
    ...tooltipPropDefs.offset,
    default: undefined,
  },
  /**
   * @description 当 popover 不处于激活状态且 `persistent` 为 `false` 时，popover 将被销毁
   */
  persistent: {
    ...tooltipPropDefs.persistent,
    default: true,
  },
} as const)

export const popoverEmits = {
  'update:visible': (value: boolean) => isBoolean(value),
  'before-enter': () => true,
  'before-leave': () => true,
  'after-enter': () => true,
  'after-leave': () => true,
}
export type PopoverEmits = typeof popoverEmits

export type PopoverInstance = InstanceType<typeof Popover> & unknown

/**
 * @description PopoverProps 的默认值
 */
export const popoverPropsDefaults = {
  ...omit(useTooltipContentPropsDefaults, ['gpuAcceleration']),
  ...useTooltipTriggerPropsDefaults,
  ...popperArrowPropsDefaults,
  title: undefined,
  tabindex: 0,
  effect: 'light',
  width: 150,
  offset: undefined,
  showArrow: true,
  persistent: true,
} as const
