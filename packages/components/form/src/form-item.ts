import { componentSizes } from '@element-plus/constants'
import { buildProps, definePropType } from '@element-plus/utils'

import type { ComponentSize } from '@element-plus/constants'
import type { Arrayable } from '@element-plus/utils'
import type { FormItemRule } from './types'

export const formItemValidateStates = [
  '',
  'error',
  'validating',
  'success',
] as const
export type FormItemValidateState = (typeof formItemValidateStates)[number]

export type FormItemProp = Arrayable<string>

export interface FormItemProps {
  /**
   * @description 标签文本。
   */
  label?: string
  /**
   * @description 标签宽度，例如 `'50px'`，支持 `'auto'`。
   */
  labelWidth?: string | number
  /**
   * @description 标签位置。若设为 `'left'` 或 `'right'`，还需提供 `label-width` prop。默认继承自 `form label-position`。
   */
  labelPosition?: 'left' | 'right' | 'top' | ''
  /**
   * @description `model` 的键。可以是属性路径数组（例如 `['a', 'b', '0']`）。使用 `validate` 和 `resetFields` 方法时，该属性为必填。
   */
  prop?: FormItemProp
  /**
   * @description 该字段是否为必填；省略时由校验规则决定。
   */
  required?: boolean
  /**
   * @description 表单校验规则，见[下表](#formitemrule)，更高级用法参见 [async-validator](https://github.com/yiminghe/async-validator)。
   */
  rules?: Arrayable<FormItemRule>
  /**
   * @description 字段错误信息；设置其值后，该字段将校验失败并立即显示此消息。
   */
  error?: string
  /**
   * @description formItem 的校验状态。
   */
  validateStatus?: FormItemValidateState
  /**
   * @description 与原生 label 的 for 相同。
   */
  for?: string
  /**
   * @description 内联样式的校验信息。
   */
  inlineMessage?: boolean
  /**
   * @description 是否显示错误信息。
   */
  showMessage?: boolean
  /**
   * @description 控制该 form-item 内组件的尺寸。
   */
  size?: ComponentSize
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const formItemPropDefs = buildProps({
  /**
   * @description 标签文本。
   */
  label: String,
  /**
   * @description 标签宽度，例如 `'50px'`，支持 `'auto'`。
   */
  labelWidth: {
    type: [String, Number],
  },
  /**
   * @description 标签位置。若设为 `'left'` 或 `'right'`，还需提供 `label-width` prop。默认继承自 `form label-position`。
   */
  labelPosition: {
    type: String,
    values: ['left', 'right', 'top', ''],
    default: '',
  },
  /**
   * @description `model` 的键。可以是属性路径数组（例如 `['a', 'b', '0']`）。使用 `validate` 和 `resetFields` 方法时，该属性为必填。
   */
  prop: {
    type: definePropType<FormItemProp>([String, Array]),
  },
  /**
   * @description 该字段是否为必填；省略时由校验规则决定。
   */
  required: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 表单校验规则，见[下表](#formitemrule)，更高级用法参见 [async-validator](https://github.com/yiminghe/async-validator)。
   */
  rules: {
    type: definePropType<Arrayable<FormItemRule>>([Object, Array]),
  },
  /**
   * @description 字段错误信息；设置其值后，该字段将校验失败并立即显示此消息。
   */
  error: String,
  /**
   * @description formItem 的校验状态。
   */
  validateStatus: {
    type: String,
    values: formItemValidateStates,
  },
  /**
   * @description 与原生 label 的 for 相同。
   */
  for: String,
  /**
   * @description 内联样式的校验信息。
   */
  inlineMessage: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 是否显示错误信息。
   */
  showMessage: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 控制该 form-item 内组件的尺寸。
   */
  size: {
    type: String,
    values: componentSizes,
  },
} as const)
