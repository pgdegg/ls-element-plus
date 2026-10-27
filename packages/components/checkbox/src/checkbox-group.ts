import { UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { useAriaProps, useSizeProp } from '@element-plus/hooks'
import { buildProps, definePropType, isArray } from '@element-plus/utils'

import type checkboxGroup from './checkbox-group.vue'
import type { CheckboxProps, CheckboxValueType } from './checkbox'
import type { ComponentSize } from '@element-plus/constants'
import type { AriaProps } from '@element-plus/hooks'

export type CheckboxGroupValueType = Exclude<CheckboxValueType, boolean>[]

export interface CheckboxGroupProps extends Pick<AriaProps, 'ariaLabel'> {
  /**
   * @description 绑定值
   */
  modelValue?: CheckboxGroupValueType
  /**
   * @description 嵌套的复选框是否禁用
   */
  disabled?: boolean
  /**
   * @description 最少选中的复选框数量
   */
  min?: number
  /**
   * @description 最多选中的复选框数量
   */
  max?: number
  /**
   * @description 复选框尺寸
   */
  size?: ComponentSize
  /**
   * @description 按钮激活时的边框和背景色
   */
  fill?: string
  /**
   * @description 按钮激活时的字体颜色
   */
  textColor?: string
  /**
   * @description 复选框组的元素标签
   */
  tag?: string
  /**
   * @description 是否触发表单校验
   */
  validateEvent?: boolean
  /**
   * @description 选项数据，`value`、`label` 和 `disabled` 的键可通过 `props` 自定义
   */
  options?: CheckboxOption[]
  /**
   * @description 配置选项
   */
  props?: CheckboxOptionProps
  /**
   * @description 渲染选项的组件类型（如 `'button'`）
   */
  type?: 'checkbox' | 'button'
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const checkboxGroupPropDefs = buildProps({
  /**
   * @description 绑定值
   */
  modelValue: {
    type: definePropType<CheckboxGroupValueType>(Array),
    default: () => [],
  },
  /**
   * @description 嵌套的复选框是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 最少选中的复选框数量
   */
  min: Number,
  /**
   * @description 最多选中的复选框数量
   */
  max: Number,
  /**
   * @description 复选框尺寸
   */
  size: useSizeProp,
  /**
   * @description 按钮激活时的边框和背景色
   */
  fill: String,
  /**
   * @description 按钮激活时的字体颜色
   */
  textColor: String,
  /**
   * @description 复选框组的元素标签
   */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  options: {
    type: definePropType<CheckboxOption[]>(Array),
  },
  props: {
    type: definePropType<CheckboxOptionProps>(Object),
    default: () => checkboxDefaultProps,
  },
  type: {
    type: String,
    values: ['checkbox', 'button'] as const,
    default: 'checkbox',
  },
  ...useAriaProps(['ariaLabel']),
} as const)

export const checkboxGroupEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxGroupValueType) => isArray(val),
  change: (val: CheckboxValueType[]) => isArray(val),
}
export type CheckboxGroupEmits = typeof checkboxGroupEmits
export type CheckboxGroupInstance = InstanceType<typeof checkboxGroup> & unknown

export type CheckboxOption = CheckboxProps & Record<string, any>

type CheckboxOptionProps = {
  value?: string
  label?: string
  disabled?: string
}
export const checkboxDefaultProps: Required<CheckboxOptionProps> = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
}
