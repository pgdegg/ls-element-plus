import { buildProps, isBoolean, isNumber, isString } from '@element-plus/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { useSizeProp } from '@element-plus/hooks'

import type { ComponentSize } from '@element-plus/constants'
import type Radio from './radio.vue'

export interface RadioPropsBase {
  /**
   * @description 绑定值
   */
  modelValue?: string | number | boolean
  /**
   * @description Radio 的尺寸
   */
  size?: ComponentSize
  /**
   * @description Radio 是否禁用
   */
  disabled?: boolean
  /**
   * @description Radio 的标签
   */
  label?: string | number | boolean
  /**
   * @description Radio 的值
   */
  value?: string | number | boolean
  /**
   * @description 原生 `name` 属性
   */
  name?: string
}

export interface RadioProps extends RadioPropsBase {
  /** @description 隐藏指示器但保留原生 input */
  hideCircle?: boolean
  /**
   * @description 是否在 Radio 周围添加边框
   */
  border?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const radioBasePropDefs = buildProps({
  /**
   * @description 绑定值
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * @description Radio 的尺寸
   */
  size: useSizeProp,
  /**
   * @description Radio 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description Radio 的标签
   */
  label: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * @description Radio 的值
   */
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * @description 原生 `name` 属性
   */
  name: {
    type: String,
    default: undefined,
  },
})

/** @internal Runtime prop definitions; use the public props interface for types. */
export const radioPropDefs = buildProps({
  ...radioBasePropDefs,
  hideCircle: Boolean,
  /**
   * @description 是否在 Radio 周围添加边框
   */
  border: Boolean,
} as const)

export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | number | boolean | undefined) =>
    isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val: string | number | boolean | undefined) =>
    isString(val) || isNumber(val) || isBoolean(val),
}
export type RadioEmits = typeof radioEmits
export type RadioInstance = InstanceType<typeof Radio> & unknown

/**
 * @description RadioProps 的默认值
 */
export const radioPropsDefaults = {
  modelValue: undefined,
  disabled: undefined,
  label: undefined,
  value: undefined,
  name: undefined,
  border: false,
} as const
