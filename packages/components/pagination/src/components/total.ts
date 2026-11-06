import { buildProps } from '@element-plus/utils'

import type Total from './total.vue'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

export const PaginationTotalDefaultValueProps = buildProps({
  total: {
    type: Number,
    default: 1000,
  },
} as const)

export type PaginationTotalProps = ExtractPropTypes<
  typeof PaginationTotalDefaultValueProps
>
export type PaginationTotalPropsPublic = ExtractPublicPropTypes<
  typeof PaginationTotalDefaultValueProps
>

export type TotalInstance = InstanceType<typeof Total> & unknown
