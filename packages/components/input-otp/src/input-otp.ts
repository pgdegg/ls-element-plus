import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { isString } from '@element-plus/utils'

import type { InputHTMLAttributes, VNode } from 'vue'
import type { ComponentSize } from '@element-plus/constants'
import type { AriaProps } from '@element-plus/hooks'

export interface InputOtpProps extends Pick<AriaProps, 'ariaLabel'> {
  /**
   * @description OTP 字段的值。
   *
   * 由于数字不能有前导零，`modelValue` 仅在初始化时允许为数字。
   *
   * @default undefined
   */
  modelValue?: string | number
  /**
   * @description OTP 字段长度
   * @default 6
   */
  length?: number
  /**
   * @description 自定义校验器函数
   * @default () => true
   */
  validator?: (char: string, index: number) => boolean
  /**
   * @description 用于虚拟键盘的原生 input mode
   */
  inputmode?: InputHTMLAttributes['inputmode']
  /**
   * @description OTP 字段的类型
   * @default 'outlined'
   */
  type?: 'outlined' | 'filled' | 'underlined'
  /**
   * @description OTP 字段的尺寸
   * @default undefined
   */
  size?: ComponentSize
  /**
   * @description 是否启用密码模式
   */
  mask?: boolean
  /**
   * @description OTP 字段是否禁用
   * @default undefined
   */
  disabled?: boolean
  /**
   * @description 与原生 input 的 `readonly` 相同
   */
  readonly?: boolean
  /**
   * @description 与原生 input 的 `id` 相同
   */
  id?: string
  /**
   * @description 是否触发表单校验
   */
  validateEvent?: boolean
  /**
   * @description OTP 字段之间的分隔符
   */
  separator?: string | VNode | ((index: number) => string | VNode)
}

export const inputOtpEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  [CHANGE_EVENT]: (value: string) => isString(value),
  finish: (value: string) => isString(value),
  focus: (eve: FocusEvent) => eve instanceof FocusEvent,
  blur: (eve: FocusEvent) => eve instanceof FocusEvent,
}

export type InputOtpEmits = typeof inputOtpEmits
