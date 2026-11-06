import { buildProps } from '@element-plus/utils'
import {
  DatePickerSharedDefaultValueProps,
  selectionModeWithDefault,
} from './shared'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'

export const BasicDateTableDefaultValueProps = buildProps({
  ...DatePickerSharedDefaultValueProps,
  showWeekNumber: Boolean,
  selectionMode: selectionModeWithDefault('date'),
} as const)

export const basicDateTableEmits = ['changerange', 'pick', 'select']

export type BasicDateTableProps = ExtractPropTypes<
  typeof BasicDateTableDefaultValueProps
>
export type BasicDateTablePropsPublic = ExtractPublicPropTypes<
  typeof BasicDateTableDefaultValueProps
>
export type BasicDateTableEmits = typeof basicDateTableEmits

export type RangePickerEmits = { minDate: Dayjs; maxDate: null }
export type DatePickerEmits = Dayjs
export type DatesPickerEmits = Dayjs[]
export type MonthsPickerEmits = Dayjs[]
export type YearsPickerEmits = Dayjs[]
export type QuartersPickerEmits = Dayjs[]
export type WeekPickerEmits = {
  year: number
  week: number
  value: string
  date: Dayjs
}

export type DateTableEmits =
  RangePickerEmits | DatePickerEmits | DatesPickerEmits | WeekPickerEmits
