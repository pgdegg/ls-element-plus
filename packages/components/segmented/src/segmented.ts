import {
  buildProps,
  definePropType,
  isBoolean,
  isNumber,
  isString,
} from '@element-plus/utils'
import { useAriaProps, useSizeProp } from '@element-plus/hooks'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'

import type { Option } from './types'
import type { ComponentInstance } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import type { ComponentSize } from '@element-plus/constants'
import type Segmented from './segmented.vue'

export interface Props {
  label?: string
  value?: string
  disabled?: string
}

export const defaultProps: Required<Props> = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
}

export interface SegmentedProps<T extends Option = Option> {
  direction?: 'vertical' | 'horizontal'
  /**
   * @description segmented 的选项
   */
  options?: T[]
  /**
   * @description 绑定值
   */
  modelValue?: string | number | boolean
  /**
   * @description 配置项，见下表
   */
  props?: Props
  /**
   * @description 适配父内容宽度
   */
  block?: boolean
  /**
   * @description 组件尺寸
   */
  size?: ComponentSize
  /**
   * @description segmented 是否禁用
   */
  disabled?: boolean
  /**
   * @description 是否触发表单校验
   */
  validateEvent?: boolean
  /**
   * @description 原生 input id
   */
  id?: string
  /**
   * @description 原生 `name` 属性
   */
  name?: string
  /**
   * @description 原生 `aria-label` 属性
   */
  ariaLabel?: string
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const segmentedPropDefs = buildProps({
  direction: {
    type: definePropType<'vertical' | 'horizontal'>(String),
    default: 'horizontal',
  },
  /**
   * @description segmented 的选项
   */
  options: {
    type: definePropType<Option[]>(Array),
    default: () => [],
  },
  /**
   * @description 绑定值
   */
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * @description 配置项，见下表
   */
  props: {
    type: definePropType<Props>(Object),
    default: () => defaultProps,
  },
  /**
   * @description 适配父内容宽度
   */
  block: Boolean,
  /**
   * @description 组件尺寸
   */
  size: useSizeProp,
  /**
   * @description segmented 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 原生 input id
   */
  id: String,
  /**
   * @description 原生 `name` 属性
   */
  name: String,
  ...useAriaProps(['ariaLabel']),
})

export const segmentedEmits = {
  [UPDATE_MODEL_EVENT]: (val: any) =>
    isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val: any) =>
    isString(val) || isNumber(val) || isBoolean(val),
}
export type SegmentedEmits = typeof segmentedEmits

export type SegmentedInstance = ComponentInstance<typeof Segmented> &
  ComponentExposed<typeof Segmented>
