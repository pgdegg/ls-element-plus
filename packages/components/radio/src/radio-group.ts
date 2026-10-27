import { buildProps, definePropType } from '@element-plus/utils'
import { useAriaProps, useSizeProp } from '@element-plus/hooks'
import { radioEmits } from './radio'

import type { ComponentSize } from '@element-plus/constants'
import type RadioGroup from './radio-group.vue'

export type radioOptionProp = {
  value?: string
  label?: string
  disabled?: string
}

export const radioDefaultProps: Required<radioOptionProp> = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
}

export type radioOption = Record<string, any>

export interface RadioGroupProps {
  /**
   * @description 原生 `id` 属性
   */
  id?: string
  /**
   * @description 单选按钮或带边框单选框的尺寸
   */
  size?: ComponentSize
  /**
   * @description 内部嵌套的单选框是否禁用
   */
  disabled?: boolean
  /**
   * @description 绑定值
   */
  modelValue?: string | number | boolean
  /**
   * @description 按钮激活时的边框和背景色
   */
  fill?: string
  /**
   * @description 按钮激活时的字体颜色
   */
  textColor?: string
  /**
   * @description 原生 `name` 属性
   */
  name?: string
  /**
   * @description 是否触发表单校验
   */
  validateEvent?: boolean
  /**
   * @description 单选框选项
   */
  options?: radioOption[]
  /**
   * @description 选项的自定义属性名
   */
  props?: radioOptionProp
  /**
   * @description 单选框类型
   */
  type?: 'radio' | 'button'
  /**
   * @description 原生 `aria-label` 属性
   */
  ariaLabel?: string
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const radioGroupPropDefs = buildProps({
  /**
   * @description 原生 `id` 属性
   */
  id: {
    type: String,
    default: undefined,
  },
  /**
   * @description 单选按钮或带边框单选框的尺寸
   */
  size: useSizeProp,
  /**
   * @description 内部嵌套的单选框是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 绑定值
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * @description 按钮激活时的边框和背景色
   */
  fill: {
    type: String,
    default: '',
  },
  /**
   * @description 按钮激活时的字体颜色
   */
  textColor: {
    type: String,
    default: '',
  },
  /**
   * @description 原生 `name` 属性
   */
  name: {
    type: String,
    default: undefined,
  },
  /**
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  options: {
    type: definePropType<radioOption[]>(Array),
  },
  props: {
    type: definePropType<radioOptionProp>(Object),
    default: () => radioDefaultProps,
  },
  type: {
    type: String,
    values: ['radio', 'button'] as const,
    default: 'radio',
  },
  ...useAriaProps(['ariaLabel']),
} as const)

export const radioGroupEmits = radioEmits
export type RadioGroupEmits = typeof radioGroupEmits
export type RadioGroupInstance = InstanceType<typeof RadioGroup> & unknown

/**
 * @description RadioGroupProps 的默认值
 */
export const radioGroupPropsDefaults = {
  id: undefined,
  disabled: undefined,
  modelValue: undefined,
  fill: '',
  textColor: '',
  name: undefined,
  validateEvent: true,
  props: () => radioDefaultProps,
  type: 'radio',
} as const
