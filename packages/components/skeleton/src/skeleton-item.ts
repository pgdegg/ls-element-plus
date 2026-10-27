import { buildProps } from '@element-plus/utils'

import type SkeletonItem from './skeleton-item.vue'

export interface SkeletonItemProps {
  /**
   * @description 当前渲染的骨架类型
   */
  variant?:
    | 'circle'
    | 'rect'
    | 'h1'
    | 'h3'
    | 'text'
    | 'caption'
    | 'p'
    | 'image'
    | 'button'
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const skeletonItemPropDefs = buildProps({
  /**
   * @description 当前渲染的骨架类型
   */
  variant: {
    type: String,
    values: [
      'circle',
      'rect',
      'h1',
      'h3',
      'text',
      'caption',
      'p',
      'image',
      'button',
    ],
    default: 'text',
  },
} as const)

export type SkeletonItemInstance = InstanceType<typeof SkeletonItem> & unknown
