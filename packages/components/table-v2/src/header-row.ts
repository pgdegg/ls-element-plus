import { buildProps, definePropType } from '@element-plus/utils'
import { columns } from './common'

import type {
  CSSProperties,
  ExtractPropTypes,
  ExtractPublicPropTypes,
} from 'vue'
import type { KeyType } from './types'

export const TableV2HeaderRowDefaultValueProps = buildProps({
  class: String,
  columns,
  columnsStyles: {
    type: definePropType<Record<KeyType, CSSProperties>>(Object),
    required: true,
  },
  headerIndex: Number,
  style: { type: definePropType<CSSProperties>(Object) },
} as const)

export type TableV2HeaderRowProps = ExtractPropTypes<
  typeof TableV2HeaderRowDefaultValueProps
>
export type TableV2HeaderRowPropsPublic = ExtractPublicPropTypes<
  typeof TableV2HeaderRowDefaultValueProps
>
