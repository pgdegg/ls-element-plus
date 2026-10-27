import { buildProps, definePropType } from '@element-plus/utils'
import { CircleClose, Clock } from '@element-plus/icons-vue'
import { useSizeProp } from '@element-plus/hooks'
import { emptyValuesPropDefs } from '@element-plus/hooks/use-empty-values/index'

import type { UseEmptyValuesProps } from '@element-plus/hooks'
import type { PopperEffect } from '@element-plus/components/popper'
import type TimeSelect from './time-select.vue'
import type { Component, StyleValue } from 'vue'
import type { ComponentSize } from '@element-plus/constants'
import type { ClassValue, IconPropType } from '@element-plus/utils'

export interface TimeSelectProps extends UseEmptyValuesProps {
  hidePlaceholder?: boolean
  /**
   * @description 设置时间格式
   */
  format?: string
  /**
   * @description 绑定值
   */
  modelValue?: string | null
  /**
   * @description TimeSelect 是否禁用
   */
  disabled?: boolean
  /**
   * @description 输入框是否可编辑
   */
  editable?: boolean
  /**
   * @description Tooltip 主题，内置主题：`dark` / `light`
   */
  effect?: PopperEffect
  /**
   * @description 是否显示清除按钮
   */
  clearable?: boolean
  /**
   * @description Input 的尺寸
   */
  size?: ComponentSize
  /**
   * @description 非范围模式下的占位符
   */
  placeholder?: string
  /**
   * @description 开始时间
   */
  start?: string
  /**
   * @description 结束时间
   */
  end?: string
  /**
   * @description 时间步长
   */
  step?: string
  /**
   * @description 最小时间，早于该时间的时刻将被禁用
   */
  minTime?: string | null
  /**
   * @description 最大时间，晚于该时间的时刻将被禁用
   */
  maxTime?: string | null
  /**
   * @description 选项中是否包含 `end`
   */
  includeEndTime?: boolean
  /**
   * @description 与原生 input 的 `name` 相同
   */
  name?: string
  /**
   * @description 自定义前缀图标组件
   */
  prefixIcon?: IconPropType
  /**
   * @description 自定义清除图标组件
   */
  clearIcon?: IconPropType
  /**
   * @description TimeSelect 下拉框的自定义类名
   */
  popperClass?: ClassValue
  /**
   * @description TimeSelect 下拉框的自定义样式
   */
  popperStyle?: StyleValue
}

export const DEFAULT_START = '09:00'
export const DEFAULT_END = '18:00'
export const DEFAULT_STEP = '00:30'

/** @internal Runtime prop definitions; use the public props interface for types. */
export const timeSelectPropDefs = buildProps({
  /** @description 是否隐藏占位文本；默认在禁用或只读时隐藏，false 强制显示。 */
  hidePlaceholder: { type: Boolean, default: undefined },
  /**
   * @description 设置时间格式
   */
  format: {
    type: String,
    default: 'HH:mm',
  },
  /**
   * @description 绑定值
   */
  modelValue: {
    type: definePropType<string | null>(String),
  },
  /**
   * @description TimeSelect 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 输入框是否可编辑
   */
  editable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description Tooltip 主题，内置主题：`dark` / `light`
   */
  effect: {
    type: definePropType<PopperEffect>(String),
    default: 'light',
  },
  /**
   * @description 是否显示清除按钮
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description Input 的尺寸
   */
  size: useSizeProp,
  /**
   * @description 非范围模式下的占位符
   */
  placeholder: String,
  /**
   * @description 开始时间
   */
  start: {
    type: String,
    default: DEFAULT_START,
  },
  /**
   * @description 结束时间
   */
  end: {
    type: String,
    default: DEFAULT_END,
  },
  /**
   * @description 时间步长
   */
  step: {
    type: String,
    default: DEFAULT_STEP,
  },
  /**
   * @description 最小时间，早于该时间的时刻将被禁用
   */
  minTime: {
    type: definePropType<string | null>(String),
  },
  /**
   * @description 最大时间，晚于该时间的时刻将被禁用
   */
  maxTime: {
    type: definePropType<string | null>(String),
  },
  /**
   * @description 选项中是否包含 `end`
   */
  includeEndTime: Boolean,
  /**
   * @description 与原生 input 的 `name` 相同
   */
  name: String,
  /**
   * @description 自定义前缀图标组件
   */
  prefixIcon: {
    type: definePropType<string | Component>([String, Object]),
    default: () => Clock,
  },
  /**
   * @description 自定义清除图标组件
   */
  clearIcon: {
    type: definePropType<string | Component>([String, Object]),
    default: () => CircleClose,
  },
  /**
   * @description TimeSelect 下拉框的自定义类名
   */
  popperClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: '',
  },
  /**
   * @description TimeSelect 下拉框的自定义样式
   */
  popperStyle: {
    type: definePropType<StyleValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  ...emptyValuesPropDefs,
} as const)

export type TimeSelectInstance = InstanceType<typeof TimeSelect> & unknown
