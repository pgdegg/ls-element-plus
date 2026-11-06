import { buildProps } from '@element-plus/utils'

import type Arrow from './arrow.vue'

export interface PopperArrowProps {
  /**
   * @description 箭头偏移量
   */
  arrowOffset?: number
}

/** Runtime prop definitions; use the public props interface for types. */
export const PopperArrowDefaultValueProps = buildProps({
  arrowOffset: {
    type: Number,
    default: 5,
  },
} as const)

export type PopperArrowInstance = InstanceType<typeof Arrow> & unknown
