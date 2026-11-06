import { buildProps, definePropType } from '@element-plus/utils'
import { PanelSharedDefaultValueProps } from './shared'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type { DayOrDays } from '@element-plus/components/time-picker'

export const PanelDatePickDefaultValueProps = buildProps({
  ...PanelSharedDefaultValueProps,
  parsedValue: {
    type: definePropType<DayOrDays>([Object, Array]),
  },
  visible: {
    type: Boolean,
    default: true,
  },
  format: {
    type: String,
    default: '',
  },
} as const)

export type PanelDatePickProps = ExtractPropTypes<
  typeof PanelDatePickDefaultValueProps
>
export type PanelDatePickPropsPublic = ExtractPublicPropTypes<
  typeof PanelDatePickDefaultValueProps
>
