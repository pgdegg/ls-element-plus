import { buildProps, isBoolean } from '@element-plus/utils'
import { TooltipDefaultValueProps } from '@element-plus/components/tooltip/src/tooltip'
import { DropdownDefaultValueProps } from '@element-plus/components/dropdown'
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

/** Runtime prop definitions; use the public props interface for types. */
export const PopoverDefaultValueProps = buildProps({
  ...omit(TooltipDefaultValueProps, [
    'ariaLabel',
    'gpuAcceleration',
    'rawContent',
  ]),
  /**
   * @description popover 的弹出位置
   */
  placement: DropdownDefaultValueProps.placement,
  /**
   * @description Popover 的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
   */
  tabindex: DropdownDefaultValueProps.tabindex,
  /**
   * @description Tooltip 主题，内置主题：`dark` / `light`
   */
  effect: {
    ...TooltipDefaultValueProps.effect,
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
    ...TooltipDefaultValueProps.offset,
    default: undefined,
  },
  /**
   * @description 当 popover 不处于激活状态且 `persistent` 为 `false` 时，popover 将被销毁
   */
  persistent: {
    type: Boolean,
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
