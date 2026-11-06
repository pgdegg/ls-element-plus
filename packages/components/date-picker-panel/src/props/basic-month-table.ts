import { buildProps } from '@element-plus/utils'
import {
  DatePickerSharedDefaultValueProps,
  selectionModeWithDefault,
} from './shared'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const BasicMonthTableDefaultValueProps = buildProps({
  ...DatePickerSharedDefaultValueProps,
  selectionMode: selectionModeWithDefault('month'),
})

export type BasicMonthTableProps = ExtractPropTypes<
  typeof BasicMonthTableDefaultValueProps
>
export type BasicMonthTablePropsPublic = ExtractPublicPropTypes<
  typeof BasicMonthTableDefaultValueProps
>
