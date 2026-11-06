import { buildProps, definePropType } from '@element-plus/utils'
import { DisabledTimeListsDefaultValueProps } from '../props/shared'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type { Dayjs } from 'dayjs'

export const BasicTimeSpinnerDefaultValueProps = buildProps({
  role: {
    type: String,
    required: true,
  },
  spinnerDate: {
    type: definePropType<Dayjs>(Object),
    required: true,
  },
  showSeconds: {
    type: Boolean,
    default: true,
  },
  arrowControl: Boolean,
  amPmMode: {
    // 'a': am/pm; 'A': AM/PM
    type: definePropType<'a' | 'A' | ''>(String),
    default: '',
  },
  ...DisabledTimeListsDefaultValueProps,
} as const)

export type BasicTimeSpinnerProps = ExtractPropTypes<
  typeof BasicTimeSpinnerDefaultValueProps
>
export type BasicTimeSpinnerPropsPublic = ExtractPublicPropTypes<
  typeof BasicTimeSpinnerDefaultValueProps
>
