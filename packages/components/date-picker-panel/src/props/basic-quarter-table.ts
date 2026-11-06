import { buildProps } from '@element-plus/utils'
import {
  DatePickerSharedDefaultValueProps,
  selectionModeWithDefault,
} from './shared'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const BasicQuarterTableDefaultValueProps = buildProps({
  ...DatePickerSharedDefaultValueProps,
  selectionMode: selectionModeWithDefault('quarter'),
})

export type BasicQuarterTableProps = ExtractPropTypes<
  typeof BasicQuarterTableDefaultValueProps
>
export type BasicQuarterTablePropsPublic = ExtractPublicPropTypes<
  typeof BasicQuarterTableDefaultValueProps
>
