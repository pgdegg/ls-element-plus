import { buildProps } from '@element-plus/utils'
import { PanelRangeSharedDefaultValueProps } from './shared'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const PanelMonthRangeDefaultValueProps = buildProps({
  ...PanelRangeSharedDefaultValueProps,
} as const)

export const panelMonthRangeEmits = [
  'pick',
  'set-picker-option',
  'calendar-change',
]

export type PanelMonthRangeProps = ExtractPropTypes<
  typeof PanelMonthRangeDefaultValueProps
>
export type PanelMonthRangePropsPublic = ExtractPublicPropTypes<
  typeof PanelMonthRangeDefaultValueProps
>
