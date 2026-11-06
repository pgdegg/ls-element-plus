import { buildProps } from '@element-plus/utils'

import type Thumb from './thumb.vue'

export interface ThumbProps {
  vertical?: boolean
  size?: string
  move?: number
  ratio: number
  always?: boolean
}

/** Runtime prop definitions; use the public props interface for types. */
export const ThumbDefaultValueProps = buildProps({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: true,
  },
  always: Boolean,
} as const)

export type ThumbInstance = InstanceType<typeof Thumb> & unknown
