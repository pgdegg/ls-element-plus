import { buildProps } from '@element-plus/utils'
import { classType, column } from './common'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const TableV2HeaderCellDefaultValueProps = buildProps({
  class: classType,
  columnIndex: Number,
  column,
})

export type TableV2HeaderCell = ExtractPropTypes<
  typeof TableV2HeaderCellDefaultValueProps
>
export type TableV2HeaderCellPublic = ExtractPublicPropTypes<
  typeof TableV2HeaderCellDefaultValueProps
>
