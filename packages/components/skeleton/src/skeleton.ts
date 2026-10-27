import { buildProps, definePropType } from '@element-plus/utils'

import type Skeleton from './skeleton.vue'
import type { ThrottleType } from '@element-plus/hooks'

export interface SkeletonProps {
  /**
   * @description 是否显示动画
   */
  animated?: boolean
  /**
   * @description 渲染到 DOM 的伪条目数量
   */
  count?: number
  /**
   * @description 行数，仅在未提供模板 slot 时有效
   */
  rows?: number
  /**
   * @description 是否显示真实 DOM
   */
  loading?: boolean
  /**
   * @description 渲染延迟，单位毫秒
   */
  throttle?: ThrottleType
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const skeletonPropDefs = buildProps({
  /**
   * @description 是否显示动画
   */
  animated: Boolean,
  /**
   * @description 渲染到 DOM 的伪条目数量
   */
  count: {
    type: Number,
    default: 1,
  },
  /**
   * @description 行数，仅在未提供模板 slot 时有效
   */
  rows: {
    type: Number,
    default: 3,
  },
  /**
   * @description 是否显示真实 DOM
   */
  loading: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 渲染延迟，单位毫秒
   */
  throttle: {
    type: definePropType<ThrottleType>([Number, Object]),
  },
} as const)

export type SkeletonInstance = InstanceType<typeof Skeleton> & unknown
