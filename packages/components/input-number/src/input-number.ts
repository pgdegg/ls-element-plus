import { isNil } from 'lodash-unified'
import { buildProps, definePropType, isNumber } from '@element-plus/utils'
import { useAriaProps, useSizeProp } from '@element-plus/hooks'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '@element-plus/constants'

import type { ExtractPublicPropTypes, HTMLAttributes } from 'vue'
import type { ComponentSize } from '@element-plus/constants'
import type InputNumber from './input-number.vue'

/**
 * @description input-number 组件的 props
 */
export interface InputNumberProps {
  /** @description 不补零显示的最大小数位数 */
  maxPrecision?: number
  /**
   * @description 与原生 input 的 `id` 相同
   */
  id?: string
  /**
   * @description 递增步长
   */
  step?: number
  /**
   * @description 输入值是否只能是 step 的整数倍
   */
  stepStrictly?: boolean
  /**
   * @description 允许的最大值
   */
  max?: number
  /**
   * @description 允许的最小值
   */
  min?: number
  /**
   * @description 绑定值
   */
  modelValue?: number | null
  /**
   * @description 与原生 input 的 `readonly` 相同
   */
  readonly?: boolean
  /**
   * @description 组件是否禁用
   */
  disabled?: boolean
  /**
   * @description 组件尺寸
   */
  size?: ComponentSize
  /**
   * @description 是否启用控制按钮
   */
  controls?: boolean
  /**
   * @description 控制按钮的位置
   */
  controlsPosition?: '' | 'right'
  /**
   * @description 清除输入框时应设置的值
   */
  valueOnClear?: 'min' | 'max' | number | null
  /**
   * @description 与原生 input 的 `name` 相同
   */
  name?: string
  /**
   * @description 与原生 input 的 `placeholder` 相同
   */
  placeholder?: string
  /**
   * @description 输入值的精度
   */
  precision?: number
  /**
   * @description 是否触发表单校验
   */
  validateEvent?: boolean
  /**
   * @description 原生 aria-label 属性
   */
  ariaLabel?: string
  /**
   * @description 用于虚拟键盘的原生 input mode
   */
  inputmode?: HTMLAttributes['inputmode']
  /**
   * @description 内部输入文本的对齐方式
   */
  align?: 'left' | 'right' | 'center'
  /**
   * @description 是否禁用科学计数法输入（例如 'e'、'E'）
   */
  disabledScientific?: boolean
  /**
   * @description 指定输入框中展示值的格式
   */
  formatter?: (value: string) => string
  /**
   * @description 指定从格式化输入中提取的值
   */
  parser?: (value: string) => string
  /**
   * @description 与原生 input 的 `tabindex` 相同
   */
  tabindex?: string | number
}

/**
 * @deprecated 3.0.0 后移除，请改用 `InputNumberProps`。
 */
export const inputNumberProps = buildProps({
  maxPrecision: Number,
  /**
   * @description 与原生 input 的 `id` 相同
   */
  id: {
    type: String,
    default: undefined,
  },
  /**
   * @description 递增步长
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * @description 输入值是否只能是 step 的整数倍
   */
  stepStrictly: Boolean,
  /**
   * @description 允许的最大值
   */
  max: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  },
  /**
   * @description 允许的最小值
   */
  min: {
    type: Number,
    default: Number.MIN_SAFE_INTEGER,
  },
  /**
   * @description 绑定值
   */
  modelValue: {
    type: [Number, null],
  },
  /**
   * @description 与原生 input 的 `readonly` 相同
   */
  readonly: Boolean,
  /**
   * @description 组件是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 组件尺寸
   */
  size: useSizeProp,
  /**
   * @description 是否启用控制按钮
   */
  controls: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 控制按钮的位置
   */
  controlsPosition: {
    type: String,
    default: '',
    values: ['', 'right'],
  },
  /**
   * @description 清除输入框时应设置的值
   */
  valueOnClear: {
    type: definePropType<'min' | 'max' | number | null>([String, Number, null]),
    validator: (val: 'min' | 'max' | number | null) =>
      val === null || isNumber(val) || ['min', 'max'].includes(val),
    default: null,
  },
  /**
   * @description 与原生 input 的 `name` 相同
   */
  name: String,
  /**
   * @description 与原生 input 的 `placeholder` 相同
   */
  placeholder: String,
  /**
   * @description 输入值的精度
   */
  precision: {
    type: Number,
    validator: (val: number) =>
      val >= 0 && val === Number.parseInt(`${val}`, 10),
  },
  /**
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
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
   * @description 内部输入文本的对齐方式
   */
  align: {
    type: definePropType<'left' | 'right' | 'center'>(String),
    default: 'center',
  },
  /**
   * @description 是否禁用科学计数法输入（例如 'e'、'E'）
   */
  disabledScientific: Boolean,
  /**
   * @description 指定输入框中展示值的格式
   */
  formatter: {
    type: Function,
  },
  /**
   * @description 指定从格式化输入中提取的值
   */
  parser: {
    type: Function,
  },
  /**
   * @description 与原生 input 的 `tabindex` 相同
   */
  tabindex: {
    type: [String, Number],
    default: 0,
  },
} as const)

/**
 * @deprecated 3.0.0 后移除，请改用 `InputNumberProps`。
 */
export type InputNumberPropsPublic = ExtractPublicPropTypes<
  typeof inputNumberProps
>

export const inputNumberEmits = {
  'precision-exceed': (value: number, precision: number) =>
    isNumber(value) && isNumber(precision),
  [CHANGE_EVENT]: (cur: number | undefined, prev: number | undefined) =>
    prev !== cur,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  [INPUT_EVENT]: (val: number | null | undefined) =>
    isNumber(val) || isNil(val),
  [UPDATE_MODEL_EVENT]: (val: number | undefined) =>
    isNumber(val) || isNil(val),
}
export type InputNumberEmits = typeof inputNumberEmits

export type InputNumberInstance = InstanceType<typeof InputNumber> & unknown
