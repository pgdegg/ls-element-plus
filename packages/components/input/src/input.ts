import { markRaw } from 'vue'
import {
  buildProps,
  definePropType,
  iconPropType,
  isString,
  mutable,
} from '@element-plus/utils'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { useAriaProps, useSizeProp } from '@element-plus/hooks'
import { CircleClose } from '@element-plus/icons-vue'

import type { ExtractPublicPropTypes, HTMLAttributes, StyleValue } from 'vue'
import type { ComponentSize } from '@element-plus/constants'
import type { IconPropType } from '@element-plus/utils'

export type InputModelModifiers = {
  lazy?: true
  number?: true
  trim?: true
}
export type InputAutoSize = { minRows?: number; maxRows?: number } | boolean
// input type 的一些常用取值
export type InputType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'password'
  | 'email'
  | 'search'
  | 'tel'
  | 'url'
  | (string & NonNullable<unknown>)

export interface InputProps {
  hidePlaceholder?: boolean
  ignoreParentHidePlaceholder?: string | string[]
  ignoreParentReadonly?: boolean
  focusDelay?: number
  /** @description 输入期间保留的字符模式 */
  keeps?: string | RegExp | (string | RegExp)[]
  /** @description 与 keeps 一同保留的额外字面字符 */
  ignorekeeps?: string | string[]
  /**
   * @description 原生 input 的 id
   */
  id?: string
  /**
   * @description 输入框尺寸
   */
  size?: ComponentSize
  /**
   * @description 是否禁用
   */
  disabled?: boolean
  /**
   * @description 绑定值
   */
  modelValue?: string | number | null | undefined
  /**
   * @description v-model 修饰符，参考 [Vue modifiers](https://vuejs.org/guide/essentials/forms.html#modifiers)
   */
  modelModifiers?: InputModelModifiers
  /**
   * @description 与原生 input 的 `maxlength` 相同
   */
  maxlength?: string | number
  /**
   * @description 与原生 input 的 `minlength` 相同
   */
  minlength?: string | number
  /**
   * @description 输入框类型，详见 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)
   */
  type?: InputType
  /**
   * @description 控制是否可调整大小
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  /**
   * @description textarea 是否自适应高度
   */
  autosize?: InputAutoSize
  /**
   * @description 原生 input 的 autocomplete
   * - 当联合类型中字面量类型数量超过 315 时会出现 TS2590 错误，见：https://github.com/vuejs/core/issues/10514
   */
  autocomplete?: string // HTMLInputElement['autocomplete']
  /**
   * @description 格式化内容
   */
  formatter?: (value: string) => string
  /**
   * @description 解析内容
   */
  parser?: (value: string) => string
  /**
   * @description 占位文本
   */
  placeholder?: string
  /**
   * @description 原生 input 的 form
   */
  form?: string
  /**
   * @description 原生 input 的 readonly
   */
  readonly?: boolean
  /**
   * @description 是否显示清除按钮
   */
  clearable?: boolean
  /**
   * @description 自定义清除图标组件
   */
  clearIcon?: IconPropType
  /**
   * @description 可切换显示的密码输入框
   */
  showPassword?: boolean
  /**
   * @description 字数统计
   */
  showWordLimit?: boolean
  /**
   * @description 字数统计位置，`show-word-limit` 为 true 时生效
   */
  wordLimitPosition?: 'inside' | 'outside'
  /**
   * @description 后缀图标
   */
  suffixIcon?: IconPropType
  /**
   * @description 前缀图标
   */
  prefixIcon?: IconPropType
  /**
   * @description 容器 role，供 picker 组件使用的内部属性
   */
  containerRole?: string
  /**
   * @description 输入框 tabindex
   */
  tabindex?: string | number
  /**
   * @description 是否触发表单校验
   */
  validateEvent?: boolean
  /**
   * @description input 或 textarea 元素的样式
   */
  inputStyle?: StyleValue
  /**
   * @description 原生 input 的 autofocus
   */
  autofocus?: boolean
  /**
   * @description textarea 行数，仅在 `type` 为 'textarea' 时生效
   */
  rows?: number
  /**
   * @description 原生 `aria-label` 属性
   */
  ariaLabel?: string
  /**
   * @description 用于虚拟键盘的原生 input mode
   */
  inputmode?: HTMLAttributes['inputmode']
  /**
   * @description 与原生 input 的 `name` 相同
   */
  name?: string
  /**
   * @description 统计输入值的字形（grapheme）数量。设置后将不再使用原生 maxlength 和 minlength。
   */
  countGraphemes?: (value: string) => number
}

/**
 * @deprecated 3.0.0 后移除，请改用 `InputProps`。
 */
export const inputProps = buildProps({
  keeps: {
    type: definePropType<InputProps['keeps']>([String, RegExp, Array]),
  },
  ignorekeeps: {
    type: definePropType<string | string[]>([String, Array]),
  },
  hidePlaceholder: { type: Boolean, default: undefined },
  ignoreParentHidePlaceholder: {
    type: definePropType<string | string[]>([String, Array]),
  },
  ignoreParentReadonly: Boolean,
  focusDelay: Number,
  /**
   * @description 原生 input 的 id
   */
  id: {
    type: String,
    default: undefined,
  },
  /**
   * @description 输入框尺寸
   */
  size: useSizeProp,
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 绑定值
   */
  modelValue: {
    type: definePropType<string | number | null | undefined>([
      String,
      Number,
      Object,
    ]),
    default: '',
  },
  /**
   * @description v-model 修饰符，参考 [Vue modifiers](https://vuejs.org/guide/essentials/forms.html#modifiers)
   */
  modelModifiers: {
    type: definePropType<InputModelModifiers>(Object),
    default: () => ({}),
  },
  /**
   * @description 与原生 input 的 `maxlength` 相同
   */
  maxlength: {
    type: [String, Number],
  },
  /**
   * @description 与原生 input 的 `minlength` 相同
   */
  minlength: {
    type: [String, Number],
  },
  /**
   * @description 输入框类型，详见 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types)
   */
  type: {
    type: definePropType<InputType>(String),
    default: 'text',
  },
  /**
   * @description 控制是否可调整大小
   */
  resize: {
    type: String,
    values: ['none', 'both', 'horizontal', 'vertical'],
  },
  /**
   * @description textarea 是否自适应高度
   */
  autosize: {
    type: definePropType<InputAutoSize>([Boolean, Object]),
    default: false,
  },
  /**
   * @description 原生 input 的 autocomplete
   */
  autocomplete: {
    type: definePropType<HTMLInputElement['autocomplete']>(String),
    default: 'off',
  },
  /**
   * @description 格式化内容
   */
  formatter: {
    type: Function,
  },
  /**
   * @description 解析内容
   */
  parser: {
    type: Function,
  },
  /**
   * @description 占位文本
   */
  placeholder: {
    type: String,
  },
  /**
   * @description 原生 input 的 form
   */
  form: {
    type: String,
  },
  /**
   * @description 原生 input 的 readonly
   */
  readonly: Boolean,
  /**
   * @description 是否显示清除按钮
   */
  clearable: Boolean,
  /**
   * @description 自定义清除图标组件
   */
  clearIcon: {
    type: iconPropType,
    default: CircleClose,
  },
  /**
   * @description 可切换显示的密码输入框
   */
  showPassword: Boolean,
  /**
   * @description 字数统计
   */
  showWordLimit: Boolean,
  /**
   * @description 字数统计位置，`show-word-limit` 为 true 时生效
   */
  wordLimitPosition: {
    type: String,
    values: ['inside', 'outside'],
    default: 'inside',
  },
  /**
   * @description 后缀图标
   */
  suffixIcon: {
    type: iconPropType,
  },
  /**
   * @description 前缀图标
   */
  prefixIcon: {
    type: iconPropType,
  },
  /**
   * @description 容器 role，供 picker 组件使用的内部属性
   */
  containerRole: {
    type: String,
    default: undefined,
  },
  /**
   * @description 输入框 tabindex
   */
  tabindex: {
    type: [String, Number],
    default: 0,
  },
  /**
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description input 或 textarea 元素的样式
   */
  inputStyle: {
    type: definePropType<StyleValue>([Object, Array, String, Boolean]),
    default: () => mutable({} as const),
  },
  /**
   * @description 统计输入值的字形（grapheme）数量。设置后将不再使用原生 maxlength 和 minlength。
   */
  countGraphemes: {
    type: definePropType<(value: string) => number>(Function),
  },
  /**
   * @description 原生 input 的 autofocus
   */
  autofocus: Boolean,
  rows: {
    type: Number,
    default: 2,
  },
  ...useAriaProps(['ariaLabel']),
  /**
   * @description 用于虚拟键盘的原生 input mode
   */
  inputmode: {
    type: definePropType<HTMLAttributes['inputmode']>(String),
    default: undefined,
  },
  /**
   * @description 与原生 input 的 `name` 相同
   */
  name: String,
} as const)

/**
 * @deprecated 3.0.0 后移除，请改用 `InputProps`。
 */
export type InputPropsPublic = ExtractPublicPropTypes<typeof inputProps>

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string, evt?: Event) =>
    isString(value) && (evt instanceof Event || evt === undefined),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: (evt: MouseEvent | undefined) =>
    evt === undefined || evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  // 注意：浏览器自动填充时，keydown 事件是 Event 的实例，而非 KeyboardEvent
  // 相关 bug 报告 https://github.com/element-plus/element-plus/issues/6665
  keydown: (evt: KeyboardEvent | Event) => evt instanceof Event,
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent,
}
export type InputEmits = typeof inputEmits

/**
 * @description InputProps 的默认值，用于继承 InputProps 的组件（如 Autocomplete）
 */
export const inputPropsDefaults = {
  hidePlaceholder: undefined,
  disabled: undefined,
  modelValue: '',
  modelModifiers: () => ({}),
  type: 'text' as InputType,
  autocomplete: 'off',
  clearIcon: markRaw(CircleClose),
  wordLimitPosition: 'inside',
  tabindex: 0,
  validateEvent: true,
  inputStyle: () => ({}),
  rows: 2,
} as const
