import { buildProps } from '@element-plus/utils'
import { PanelRangeSharedDefaultValueProps } from './shared'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const PanelYearRangeDefaultValueProps = buildProps({
  ...PanelRangeSharedDefaultValueProps,
} as const)

export const panelYearRangeEmits = [
  'pick',
  'set-picker-option',
  'calendar-change',
]

export type PanelYearRangeProps = ExtractPropTypes<
  typeof PanelYearRangeDefaultValueProps
>
export type PanelYearRangePropsPublic = ExtractPublicPropTypes<
  typeof PanelYearRangeDefaultValueProps
>
