import { buildProps } from '@element-plus/utils'

import type SkeletonItem from './skeleton-item.vue'
import type { ExtractPublicPropTypes } from 'vue'

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

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `SkeletonItemProps`。
 */
export const skeletonItemProps = buildProps({
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

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `SkeletonItemProps`。
 */
export type SkeletonItemPropsPublic = ExtractPublicPropTypes<
  typeof skeletonItemProps
>

export type SkeletonItemInstance = InstanceType<typeof SkeletonItem> & unknown
