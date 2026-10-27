import { componentSizes } from '@element-plus/constants'
import {
  buildProps,
  definePropType,
  isArray,
  isBoolean,
  isString,
} from '@element-plus/utils'

import type { ComponentSize } from '@element-plus/constants'
import type { FormItemProp } from './form-item'
import type { FormRules } from './types'

export interface FormMetaProps {
  /**
   * @description 控制该表单内组件的尺寸。
   */
  size?: ComponentSize
  /**
   * @description 是否禁用该表单内的所有组件。设为 `true` 时，将覆盖内部组件的 `disabled` prop。
   */
  disabled?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const formMetaPropDefs = buildProps({
  /**
   * @description 控制该表单内组件的尺寸。
   */
  size: {
    type: String,
    values: componentSizes,
  },
  /**
   * @description 是否禁用该表单内的所有组件。设为 `true` 时，将覆盖内部组件的 `disabled` prop。
   */
  disabled: Boolean,
} as const)

export interface FormProps extends FormMetaProps {
  /** @description 为可编辑控件继承 readonly 状态 */
  readonly?: boolean
  /** @description 显示选择控件但不允许更改 */
  readonlyRaw?: boolean
  /** @description 隐藏后代控件中的占位符 */
  hidePlaceholder?: boolean
  /** @description 内联表单内容的宽度 */
  contentWidth?: number
  /**
   * @description 表单组件的数据。
   */
  model?: Record<string, any>
  /**
   * @description 表单校验规则。
   */
  rules?: FormRules
  /**
   * @description 标签位置。若设为 `'left'` 或 `'right'`，还需提供 `label-width` prop。
   */
  labelPosition?: 'left' | 'right' | 'top'
  /**
   * @description 星号的位置。
   */
  requireAsteriskPosition?: 'left' | 'right'
  /**
   * @description 标签宽度，例如 `'50px'`。其所有直接子 form-item 都将继承此值，支持 `auto`。
   */
  labelWidth?: string | number
  /**
   * @description 标签的后缀。
   */
  labelSuffix?: string
  /**
   * @description 表单是否为内联。
   */
  inline?: boolean
  /**
   * @description 是否将错误信息与表单项内联显示。
   */
  inlineMessage?: boolean
  /**
   * @description 是否显示指示校验结果的图标。
   */
  statusIcon?: boolean
  /**
   * @description 是否显示错误信息。
   */
  showMessage?: boolean
  /**
   * @description 当 `rules` prop 改变时是否触发校验。
   */
  validateOnRuleChange?: boolean
  /**
   * @description 是否隐藏必填字段标签旁的红色星号（*）。
   */
  hideRequiredAsterisk?: boolean
  /**
   * @description 校验失败时，滚动到第一个出错的表单项。
   */
  scrollToError?: boolean
  /**
   * @description 校验失败时，根据 scrollIntoView 选项滚动到第一个出错项。
   */
  scrollIntoViewOptions?: ScrollIntoViewOptions | boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const formPropDefs = buildProps({
  ...formMetaPropDefs,
  readonly: Boolean,
  readonlyRaw: Boolean,
  hidePlaceholder: Boolean,
  contentWidth: Number,
  /**
   * @description 表单组件的数据。
   */
  model: Object,
  /**
   * @description 表单校验规则。
   */
  rules: {
    type: definePropType<FormRules>(Object),
  },
  /**
   * @description 标签位置。若设为 `'left'` 或 `'right'`，还需提供 `label-width` prop。
   */
  labelPosition: {
    type: String,
    values: ['left', 'right', 'top'],
    default: 'right',
  },
  /**
   * @description 星号的位置。
   */
  requireAsteriskPosition: {
    type: String,
    values: ['left', 'right'],
    default: 'left',
  },
  /**
   * @description 标签宽度，例如 `'50px'`。其所有直接子 form-item 都将继承此值，支持 `auto`。
   */
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 标签的后缀。
   */
  labelSuffix: {
    type: String,
    default: '',
  },
  /**
   * @description 表单是否为内联。
   */
  inline: Boolean,
  /**
   * @description 是否将错误信息与表单项内联显示。
   */
  inlineMessage: Boolean,
  /**
   * @description 是否显示指示校验结果的图标。
   */
  statusIcon: Boolean,
  /**
   * @description 是否显示错误信息。
   */
  showMessage: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 当 `rules` prop 改变时是否触发校验。
   */
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否隐藏必填字段标签旁的红色星号（*）。
   */
  hideRequiredAsterisk: Boolean,
  /**
   * @description 校验失败时，滚动到第一个出错的表单项。
   */
  scrollToError: Boolean,
  /**
   * @description 校验失败时，根据 scrollIntoView 选项滚动到第一个出错项。
   */
  scrollIntoViewOptions: {
    type: definePropType<ScrollIntoViewOptions | boolean>([Object, Boolean]),
    default: true,
  },
} as const)

export const formEmits = {
  validate: (prop: FormItemProp, isValid: boolean, message: string) =>
    (isArray(prop) || isString(prop)) &&
    isBoolean(isValid) &&
    isString(message),
}
export type FormEmits = typeof formEmits
