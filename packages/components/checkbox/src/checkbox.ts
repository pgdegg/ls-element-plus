import { UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { useAriaProps, useSizeProp } from '@element-plus/hooks'
import { isBoolean, isNumber, isString } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type { ComponentSize } from '@element-plus/constants'
import type { AriaProps } from '@element-plus/hooks'
import type Checkbox from './checkbox.vue'

export type CheckboxValueType = string | number | boolean

export interface CheckboxProps extends Pick<
  AriaProps,
  'ariaLabel' | 'ariaControls'
> {
  /**
   * @description 绑定值
   */
  hideCircle?: boolean
  cancelDisabled?: boolean
  modelValue?: number | string | boolean
  /**
   * @description 在 `checkbox-group` 中使用时 Checkbox 的标签
   */
  label?: string | boolean | number | object
  /**
   * @description 在 `checkbox-group` 中使用时 Checkbox 的值
   */
  value?: string | boolean | number | object
  /**
   * @description 设置半选状态，仅负责样式控制
   */
  indeterminate?: boolean
  /**
   * @description Checkbox 是否禁用
   */
  disabled?: boolean
  /**
   * @description Checkbox 是否被选中
   */
  checked?: boolean
  /**
   * @description 原生 'name' 属性
   */
  name?: string
  /**
   * @description Checkbox 选中时的值
   */
  trueValue?: string | number
  /**
   * @description Checkbox 未选中时的值
   */
  falseValue?: string | number
  /**
   * @deprecated 请使用 `trueValue` 代替
   * @description Checkbox 选中时的值
   */
  trueLabel?: string | number
  /**
   * @deprecated 请使用 `falseValue` 代替
   * @description Checkbox 未选中时的值
   */
  falseLabel?: string | number
  /**
   * @description 输入框 id
   */
  id?: string
  /**
   * @description 是否在 Checkbox 周围添加边框
   */
  border?: boolean
  /**
   * @description Checkbox 尺寸
   */
  size?: ComponentSize
  /**
   * @description 输入框 tabindex
   */
  tabindex?: string | number
  /**
   * @description 是否触发表单校验
   */
  validateEvent?: boolean
}
/**
 * @deprecated 自 3.0.0 后移除，请使用 `CheckboxProps`
 */
export const checkboxProps = {
  hideCircle: Boolean,
  cancelDisabled: Boolean,
  /**
   * @description 绑定值
   */
  modelValue: {
    type: [Number, String, Boolean],
    default: undefined,
  },
  /**
   * @description 在 `checkbox-group` 中使用时 Checkbox 的标签
   */
  label: {
    type: [String, Boolean, Number, Object],
    default: undefined,
  },
  /**
   * @description 在 `checkbox-group` 中使用时 Checkbox 的值
   */
  value: {
    type: [String, Boolean, Number, Object],
    default: undefined,
  },
  /**
   * @description 设置半选状态，仅负责样式控制
   */
  indeterminate: Boolean,
  /**
   * @description Checkbox 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description Checkbox 是否被选中
   */
  checked: Boolean,
  /**
   * @description 原生 'name' 属性
   */
  name: {
    type: String,
    default: undefined,
  },
  /**
   * @description Checkbox 选中时的值
   */
  trueValue: {
    type: [String, Number],
    default: undefined,
  },
  /**
   * @description Checkbox 未选中时的值
   */
  falseValue: {
    type: [String, Number],
    default: undefined,
  },
  /**
   * @deprecated 请使用 `trueValue` 代替
   * @description Checkbox 选中时的值
   */
  trueLabel: {
    type: [String, Number],
    default: undefined,
  },
  /**
   * @deprecated 请使用 `falseValue` 代替
   * @description Checkbox 未选中时的值
   */
  falseLabel: {
    type: [String, Number],
    default: undefined,
  },
  /**
   * @description 输入框 id
   */
  id: {
    type: String,
    default: undefined,
  },
  /**
   * @description 是否在 Checkbox 周围添加边框
   */
  border: Boolean,
  /**
   * @description Checkbox 尺寸
   */
  size: useSizeProp,
  /**
   * @description 输入框 tabindex
   */
  tabindex: [String, Number],
  /**
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  ariaLabel: String,
  ...useAriaProps(['ariaControls']),
}

export const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxValueType) =>
    isString(val) || isNumber(val) || isBoolean(val),
  change: (val: CheckboxValueType) =>
    isString(val) || isNumber(val) || isBoolean(val),
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `CheckboxProps`
 */
export type CheckboxPropsPublic = ExtractPublicPropTypes<typeof checkboxProps>
export type CheckboxEmits = typeof checkboxEmits
export type CheckboxInstance = InstanceType<typeof Checkbox> & unknown

export const checkboxPropsDefaults = {
  modelValue: undefined,
  label: undefined,
  value: undefined,
  disabled: undefined,
  name: undefined,
  trueValue: undefined,
  falseValue: undefined,
  trueLabel: undefined,
  falseLabel: undefined,
  id: undefined,
  validateEvent: true,
} as const
