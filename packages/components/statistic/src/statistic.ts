import { buildProps, definePropType } from '@element-plus/utils'

import type { StyleValue } from 'vue'
import type { Dayjs } from 'dayjs'
import type Statistic from './statistic.vue'

export interface StatisticProps {
  /**
   * @description 设置小数点
   */
  decimalSeparator?: string
  /**
   * @description 设置千分位分隔符
   */
  groupSeparator?: string
  /**
   * @description 数值精度
   */
  precision?: number
  /**
   * @description 自定义数值展示
   */
  formatter?: (...args: any[]) => string | number
  /**
   * @description 数值内容
   */
  value?: number | Dayjs
  /**
   * @description 设置数字前缀
   */
  prefix?: string
  /**
   * @description 设置数字后缀
   */
  suffix?: string
  /**
   * @description 数值标题
   */
  title?: string
  /**
   * @description 数值样式
   */
  valueStyle?: StyleValue
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const statisticPropDefs = buildProps({
  /**
   * @description 设置小数点
   */
  decimalSeparator: {
    type: String,
    default: '.',
  },
  /**
   * @description 设置千分位分隔符
   */
  groupSeparator: {
    type: String,
    default: ',',
  },
  /**
   * @description 数值精度
   */
  precision: {
    type: Number,
    default: 0,
  },
  /**
   * @description 自定义数值展示
   */
  formatter: Function,
  /**
   * @description 数值内容
   */
  value: {
    type: definePropType<number | Dayjs>([Number, Object]),
    default: 0,
  },
  /**
   * @description 设置数字前缀
   */
  prefix: String,

  /**
   * @description 设置数字后缀
   */
  suffix: String,
  /**
   * @description 数值标题
   */
  title: String,
  /**
   * @description 数值样式
   */
  valueStyle: {
    type: definePropType<StyleValue>([String, Object, Array, Boolean]),
    default: undefined,
  },
} as const)

export type StatisticInstance = InstanceType<typeof Statistic> & unknown
