import {
  buildProps,
  definePropType,
  isFunction,
  isObject,
  isString,
} from '@element-plus/utils'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { inputPropDefs } from '@element-plus/components/input/src/input'
import { filterOption } from './helper'
import { tooltipContentPropDefs } from '@element-plus/components/tooltip/src/content'

import type { ComponentInstance } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import type Mention from './mention.vue'
import type { MentionOption } from './types'
import type { Options } from '@element-plus/components/popper'
import type { InputProps } from '@element-plus/components/input'
import type { ElTooltipContentProps } from '@element-plus/components/tooltip'

export interface MentionProps<
  T extends MentionOption = MentionOption,
> extends InputProps {
  /**
   * @description @提及选项列表
   */
  options?: T[]
  /**
   * @description 触发 @提及的前缀字符。字符串长度必须恰好为 1。
   */
  prefix?: string | string[]
  /**
   * @description 分隔 @提及的字符。字符串长度必须恰好为 1。
   */
  split?: string
  /**
   * @description 自定义选项过滤逻辑。
   */
  filterOption?: false | typeof filterOption<T>
  /**
   * @description 设置弹层位置
   */
  placement?: 'bottom' | 'top'
  /**
   * @description 下拉面板是否带箭头
   */
  showArrow?: boolean
  /**
   * @description 下拉面板的偏移量
   */
  offset?: number
  /**
   * @description 按 backspace 删除时，是否将 @提及内容整体删除
   */
  whole?: boolean
  /**
   * @description 按 backspace 删除时，检查 @提及是否为整体
   */
  checkIsWhole?: (pattern: string, prefix: string) => boolean
  /**
   * @description 输入值
   */
  modelValue?: string
  /**
   * @description @提及下拉面板是否处于加载状态。
   */
  loading?: boolean
  /**
   * @description 下拉面板的自定义类名
   */
  popperClass?: ElTooltipContentProps['popperClass']
  /**
   * @description 下拉面板的自定义样式
   */
  popperStyle?: ElTooltipContentProps['popperStyle']
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) 参数
   */
  popperOptions?: Partial<Options>
  /**
   * @description 配置选项
   */
  props?: MentionOptionProps
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const mentionPropDefs = buildProps({
  ...inputPropDefs,
  /**
   * @description @提及选项列表
   */
  options: {
    type: definePropType<MentionOption[]>(Array),
    default: () => [],
  },
  /**
   * @description 触发 @提及的前缀字符。字符串长度必须恰好为 1。
   */
  prefix: {
    type: definePropType<string | string[]>([String, Array]),
    default: '@',
    validator: (val: string | string[]) => {
      if (isString(val)) return val.length === 1
      return val.every((v) => isString(v) && v.length === 1)
    },
  },
  /**
   * @description 分隔 @提及的字符。字符串长度必须恰好为 1。
   */
  split: {
    type: String,
    default: ' ',
    validator: (val: string) => val.length === 1,
  },
  /**
   * @description 自定义选项过滤逻辑。
   */
  filterOption: {
    type: definePropType<false | typeof filterOption>([Boolean, Function]),
    default: () => filterOption,
    validator: (val) => {
      if (val === false) return true
      return isFunction(val)
    },
  },
  /**
   * @description 设置弹层位置
   */
  placement: {
    type: definePropType<'bottom' | 'top'>(String),
    default: 'bottom',
  },
  /**
   * @description 下拉面板是否带箭头
   */
  showArrow: Boolean,
  /**
   * @description 下拉面板的偏移量
   */
  offset: {
    type: Number,
    default: 0,
  },
  /**
   * @description 按 backspace 删除时，是否将 @提及内容整体删除
   */
  whole: Boolean,
  /**
   * @description 按 backspace 删除时，检查 @提及是否为整体
   */
  checkIsWhole: {
    type: definePropType<(pattern: string, prefix: string) => boolean>(
      Function
    ),
  },
  /**
   * @description 输入值
   */
  modelValue: String,
  /**
   * @description @提及下拉面板是否处于加载状态。
   */
  loading: Boolean,
  /**
   * @description 下拉面板的自定义类名
   */
  popperClass: tooltipContentPropDefs.popperClass,
  /**
   * @description 下拉面板的自定义样式
   */
  popperStyle: tooltipContentPropDefs.popperStyle,
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) 参数
   */
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({}) as Partial<Options>,
  },
  /**
   * @description 配置选项
   */
  props: {
    type: definePropType<MentionOptionProps>(Object),
    default: () => mentionDefaultProps,
  },
})

export const mentionEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  'whole-remove': (pattern: string, prefix: string) =>
    isString(pattern) && isString(prefix),
  input: (value: string) => isString(value),
  search: (pattern: string, prefix: string) =>
    isString(pattern) && isString(prefix),
  select: (option: MentionOption, prefix: string) =>
    isObject(option) && isString(prefix),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
}

export type MentionEmits = typeof mentionEmits
export type MentionInstance = ComponentInstance<typeof Mention> &
  ComponentExposed<typeof Mention>

export type { MentionOption } from './types'

export type MentionOptionProps = {
  value?: string
  label?: string
  disabled?: string
  [key: string]: string | undefined
}

export const mentionDefaultProps: Required<MentionOptionProps> = {
  value: 'value',
  label: 'label',
  disabled: 'disabled',
}
