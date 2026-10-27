import { buildProps } from '@element-plus/utils'

import type Arrow from './arrow.vue'

export interface PopperArrowProps {
  /**
   * @description 箭头偏移量
   */
  arrowOffset?: number
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const popperArrowPropDefs = buildProps({
  arrowOffset: {
    type: Number,
    default: 5,
  },
} as const)

export const popperArrowPropsDefaults = {
  arrowOffset: 5,
} as const

export type PopperArrowInstance = InstanceType<typeof Arrow> & unknown
