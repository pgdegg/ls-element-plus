import { buildProps } from '@element-plus/utils'
import {
  DatePickerSharedDefaultValueProps,
  selectionModeWithDefault,
} from './shared'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const BasicYearTableDefaultValueProps = buildProps({
  ...DatePickerSharedDefaultValueProps,
  selectionMode: selectionModeWithDefault('year'),
} as const)

export type BasicYearTableProps = ExtractPropTypes<
  typeof BasicYearTableDefaultValueProps
>
export type BasicYearTablePropsPublic = ExtractPublicPropTypes<
  typeof BasicYearTableDefaultValueProps
>
