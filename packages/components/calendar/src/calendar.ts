import {
  buildProps,
  definePropType,
  isArray,
  isDate,
} from '@element-plus/utils'
import { INPUT_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'

export type CalendarDateType =
  'prev-month' | 'next-month' | 'prev-year' | 'next-year' | 'today'

const isValidRange = (range: unknown): range is [Date, Date] =>
  isArray(range) && range.length === 2 && range.every((item) => isDate(item))

export interface CalendarProps {
  /**
   * @description 绑定值
   */
  modelValue?: Date
  /**
   * @description 时间范围，包括开始时间和结束时间。
   *   开始时间必须是一周的第一天，结束时间必须是一周的最后一天，时间跨度不能超过两个月。
   */
  range?: [Date, Date]
  /**
   * @description Calendar 头部控制器的类型
   */
  controllerType?: 'button' | 'select'
  /**
   * @description `controller-type` 为 'select' 时标签的格式
   */
  formatter?: (value: number, type: 'year' | 'month') => string | number
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const calendarPropDefs = buildProps({
  /**
   * @description 绑定值
   */
  modelValue: {
    type: Date,
  },
  /**
   * @description 时间范围，包括开始时间和结束时间。
   *   开始时间必须是一周的第一天，结束时间必须是一周的最后一天，时间跨度不能超过两个月。
   */
  range: {
    type: definePropType<[Date, Date]>(Array),
    validator: isValidRange,
  },
  /**
   * @description Calendar 头部控制器的类型
   */
  controllerType: {
    type: String,
    values: ['button', 'select'],
    default: 'button',
  },
  /**
   * @description `controller-type` 为 'select' 时标签的格式
   */
  formatter: {
    type: definePropType<
      (value: number, type: 'year' | 'month') => string | number
    >(Function),
  },
} as const)

export const calendarEmits = {
  [UPDATE_MODEL_EVENT]: (value: Date) => isDate(value),
  [INPUT_EVENT]: (value: Date) => isDate(value),
}
export type CalendarEmits = typeof calendarEmits
