import { buildProps, isBoolean } from '@element-plus/utils'
import {
  useTooltipContentPropsDefaults,
  useTooltipProps,
  useTooltipTriggerPropsDefaults,
} from '@element-plus/components/tooltip'
import { dropdownProps } from '@element-plus/components/dropdown'
import { popperArrowPropsDefaults } from '@element-plus/components/popper'
import { omit } from 'lodash-unified'

import type { UseTooltipProps } from '@element-plus/components/tooltip'
import type { ExtractPublicPropTypes } from 'vue'
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

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `PopoverProps`。
 */
export const popoverProps = buildProps({
  ...omit(useTooltipProps, ['ariaLabel', 'gpuAcceleration', 'rawContent']),
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
    ...useTooltipProps.effect,
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
    ...useTooltipProps.offset,
    default: undefined,
  },
  /**
   * @description 当 popover 不处于激活状态且 `persistent` 为 `false` 时，popover 将被销毁
   */
  persistent: {
    ...useTooltipProps.persistent,
    default: true,
  },
} as const)

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `PopoverProps`。
 */
export type PopoverPropsPublic = ExtractPublicPropTypes<typeof popoverProps>

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
