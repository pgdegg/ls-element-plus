import { buildProps } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type Thumb from './thumb.vue'

export interface ThumbProps {
  vertical?: boolean
  size?: string
  move?: number
  ratio: number
  always?: boolean
}

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `ThumbProps`。
 */
export const thumbProps = buildProps({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true,
  },
  always: Boolean,
} as const)

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `ThumbProps`。
 */
export type ThumbPropsPublic = ExtractPublicPropTypes<typeof thumbProps>

export type ThumbInstance = InstanceType<typeof Thumb> & unknown
