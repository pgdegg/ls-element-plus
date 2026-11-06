import { buildProps } from '@element-plus/utils'
import { PanelRangeSharedDefaultValueProps } from './shared'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const PanelQuarterRangeDefaultValueProps = buildProps({
  ...PanelRangeSharedDefaultValueProps,
} as const)

export const panelQuarterRangeEmits = [
  'pick',
  'set-picker-option',
  'calendar-change',
]

export type PanelQuarterRangeProps = ExtractPropTypes<
  typeof PanelQuarterRangeDefaultValueProps
>
export type PanelQuarterRangePropsPublic = ExtractPublicPropTypes<
  typeof PanelQuarterRangeDefaultValueProps
>
