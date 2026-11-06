import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type { DateCell } from '../types'

export const BasicCellDefaultValueProps = buildProps({
  cell: {
    type: definePropType<DateCell>(Object),
  },
} as const)

export type BasicCellProps = ExtractPropTypes<typeof BasicCellDefaultValueProps>
export type BasicCellPropsPublic = ExtractPublicPropTypes<
  typeof BasicCellDefaultValueProps
>
