import { buildProps } from '@element-plus/utils'
import { componentSizes } from '@element-plus/constants'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type Jumper from './jumper.vue'

export const PaginationJumperDefaultValueProps = buildProps({
  size: {
    type: String,
    values: componentSizes,
  },
} as const)

export type PaginationJumperProps = ExtractPropTypes<
  typeof PaginationJumperDefaultValueProps
>
export type PaginationJumperPropsPublic = ExtractPublicPropTypes<
  typeof PaginationJumperDefaultValueProps
>

export type PaginationJumperInstance = InstanceType<typeof Jumper> & unknown
