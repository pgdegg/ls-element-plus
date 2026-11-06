import { buildProps, definePropType } from '@element-plus/utils'
import { column } from './common'

import type { ExtractPropTypes, ExtractPublicPropTypes, StyleValue } from 'vue'

export const TableV2CellDefaultValueProps = buildProps({
  class: String,
  cellData: {
    type: definePropType<any>([String, Boolean, Number, Object]),
  },
  column,
  columnIndex: Number,
  style: {
    type: definePropType<StyleValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  rowData: {
    type: definePropType<any>(Object),
  },
  rowIndex: Number,
} as const)

export type TableV2CellProps = ExtractPropTypes<
  typeof TableV2CellDefaultValueProps
>
export type TableV2CellPropsPublic = ExtractPublicPropTypes<
  typeof TableV2CellDefaultValueProps
>
