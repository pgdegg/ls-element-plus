import { buildProps } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type Bar from './bar.vue'

export interface BarProps {
  always?: boolean
  minSize: number
}

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `BarProps`。
 */
export const barProps = buildProps({
  always: {
    type: Boolean,
    default: true,
  },
  minSize: {
    type: Number,
    required: true,
  },
} as const)

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `BarProps`。
 */
export type BarPropsPublic = ExtractPublicPropTypes<typeof barProps>

export type BarInstance = InstanceType<typeof Bar> & unknown
