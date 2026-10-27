import { buildProps } from '@element-plus/utils'

import type Bar from './bar.vue'

export interface BarProps {
  always?: boolean
  minSize: number
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const barPropDefs = buildProps({
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
