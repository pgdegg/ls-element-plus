import { buildProps } from '@element-plus/utils'
import {
  CircleCheckFilled,
  CircleCloseFilled,
  InfoFilled,
  WarningFilled,
} from '@element-plus/icons-vue'

import type { Component } from 'vue'
import type Result from './result.vue'

export const IconMap = {
  primary: 'icon-primary',
  success: 'icon-success',
  warning: 'icon-warning',
  error: 'icon-error',
  info: 'icon-info',
} as const

export const IconComponentMap: Record<
  (typeof IconMap)[keyof typeof IconMap],
  Component
> = {
  [IconMap.primary]: InfoFilled,
  [IconMap.success]: CircleCheckFilled,
  [IconMap.warning]: WarningFilled,
  [IconMap.error]: CircleCloseFilled,
  [IconMap.info]: InfoFilled,
}

export interface ResultProps {
  /**
   * @description 结果的标题
   */
  title?: string
  /**
   * @description 结果的副标题
   */
  subTitle?: string
  /**
   * @description 结果的图标类型
   */
  icon?: 'primary' | 'success' | 'warning' | 'info' | 'error'
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const resultPropDefs = buildProps({
  /**
   * @description 结果的标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 结果的副标题
   */
  subTitle: {
    type: String,
    default: '',
  },
  /**
   * @description 结果的图标类型
   */
  icon: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'error'],
    default: 'info',
  },
} as const)

export type ResultInstance = InstanceType<typeof Result> & unknown
