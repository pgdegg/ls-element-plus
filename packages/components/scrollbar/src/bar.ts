import { buildProps } from '@element-plus/utils'

import type Bar from './bar.vue'

export interface BarProps {
  always?: boolean
  minSize: number
}

/** Runtime prop definitions; use the public props interface for types. */
export const BarDefaultValueProps = buildProps({
  always: {
    type: Boolean,
    default: true,
  },
  minSize: {
    type: Number,
    required: true,
  },
} as const)

export type BarInstance = InstanceType<typeof Bar> & unknown
