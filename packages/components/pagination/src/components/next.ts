import { buildProps, iconPropType } from '@element-plus/utils'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type Next from './next.vue'

export const PaginationNextDefaultValueProps = buildProps({
  disabled: Boolean,
  currentPage: {
    type: Number,
    default: 1,
  },
  pageCount: {
    type: Number,
    default: 50,
  },
  nextText: {
    type: String,
  },
  nextIcon: {
    type: iconPropType,
  },
} as const)

export type PaginationNextProps = ExtractPropTypes<
  typeof PaginationNextDefaultValueProps
>
export type PaginationNextPropsPublic = ExtractPublicPropTypes<
  typeof PaginationNextDefaultValueProps
>

export type NextInstance = InstanceType<typeof Next> & unknown
