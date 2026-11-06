import { buildProps } from '@element-plus/utils'
import {
  PanelRangeSharedDefaultValueProps,
  PanelSharedDefaultValueProps,
} from './shared'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const PanelDateRangeDefaultValueProps = buildProps({
  ...PanelSharedDefaultValueProps,
  ...PanelRangeSharedDefaultValueProps,
} as const)

export type PanelDateRangeProps = ExtractPropTypes<
  typeof PanelDateRangeDefaultValueProps
>
export type PanelDateRangePropsPublic = ExtractPublicPropTypes<
  typeof PanelDateRangeDefaultValueProps
>
