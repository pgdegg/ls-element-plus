import { buildProps, definePropType, isNumber } from '@element-plus/utils'
import { CHANGE_EVENT } from '@element-plus/constants'

import type { StyleValue } from 'vue'
import type { Dayjs } from 'dayjs'
import type Countdown from './countdown.vue'

export interface CountdownProps {
  /**
   * @description 倒计时显示的格式化
   */
  format?: string
  /**
   * @description 设置倒计时前缀
   */
  prefix?: string
  /**
   * @description 设置倒计时后缀
   */
  suffix?: string
  /**
   * @description 倒计时标题
   */
  title?: string
  /**
   * @description 目标时间
   */
  value?: number | Dayjs
  /**
   * @description 设置倒计时数值样式
   */
  valueStyle?: StyleValue
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const countdownPropDefs = buildProps({
  /**
   * @description 倒计时显示的格式化
   */
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  /**
   * @description 设置倒计时前缀
   */
  prefix: String,
  /**
   * @description 设置倒计时后缀
   */
  suffix: String,
  /**
   * @description 倒计时标题
   */
  title: String,
  /**
   * @description 目标时间
   */
  value: {
    type: definePropType<number | Dayjs>([Number, Object]),
    default: 0,
  },
  /**
   * @description 设置倒计时数值样式
   */
  valueStyle: {
    type: definePropType<StyleValue>([String, Object, Array, Boolean]),
    default: undefined,
  },
} as const)

export const countdownEmits = {
  finish: () => true,
  [CHANGE_EVENT]: (value: number) => isNumber(value),
}
export type CountdownEmits = typeof countdownEmits

export type CountdownInstance = InstanceType<typeof Countdown> & unknown
