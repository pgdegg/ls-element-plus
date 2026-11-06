import { TimePickerCommonDefaultValueProps } from '@element-plus/components/time-picker'
import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type { DatePickerType } from '@element-plus/components/date-picker-panel/src/types'

export const DatePickerDefaultValueProps = buildProps({
  ...TimePickerCommonDefaultValueProps,
  /**
   * @description 选择器的类型
   */
  type: {
    type: definePropType<DatePickerType>(String),
    default: 'date',
  },
} as const)

export type DatePickerProps = ExtractPropTypes<
  typeof DatePickerDefaultValueProps
>
export type DatePickerPropsPublic = ExtractPublicPropTypes<
  typeof DatePickerDefaultValueProps
>
