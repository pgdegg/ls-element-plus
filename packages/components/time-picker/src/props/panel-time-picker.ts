import { buildProps, definePropType } from '@element-plus/utils'
import { TimePanelSharedDefaultValueProps } from './shared'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'

export const PanelTimePickerDefaultValueProps = buildProps({
  ...TimePanelSharedDefaultValueProps,
  datetimeRole: String,
  parsedValue: {
    type: definePropType<Dayjs>(Object),
  },
} as const)

export type PanelTimePickerProps = ExtractPropTypes<
  typeof PanelTimePickerDefaultValueProps
>
export type PanelTimePickerPropsPublic = ExtractPublicPropTypes<
  typeof PanelTimePickerDefaultValueProps
>
