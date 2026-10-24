import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type { Placement, Strategy, VirtualElement } from '@floating-ui/dom'

export const tourStrategies = ['absolute', 'fixed'] as const

export const tourPlacements = [
  'top-start',
  'top-end',
  'top',
  'bottom-start',
  'bottom-end',
  'bottom',
  'left-start',
  'left-end',
  'left',
  'right-start',
  'right-end',
  'right',
] as const

export interface TourContentProps {
  /**
   * @description 引导卡片相对于目标元素的位置
   */
  placement?: Placement
  /**
   * @description 参考 dom
   */
  reference?: HTMLElement | VirtualElement | null
  /**
   * @description 内容的定位策略
   */
  strategy?: Strategy
  /**
   * @description 箭头的偏移量
   */
  offset?: number
  /**
   * @description 是否显示箭头
   */
  showArrow?: boolean
  /**
   * @description 内容的 zIndex
   */
  zIndex?: number
}

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TourContentProps`。
 */
export const tourContentProps = buildProps({
  /**
   * @description 引导卡片相对于目标元素的位置
   */
  placement: {
    type: definePropType<Placement>(String),
    values: tourPlacements,
    default: 'bottom',
  },
  /**
   * @description 参考 dom
   */
  reference: {
    type: definePropType<HTMLElement | VirtualElement | null>(Object),
    default: null,
  },
  /**
   * @description 内容的定位策略
   */
  strategy: {
    type: definePropType<Strategy>(String),
    values: tourStrategies,
    default: 'absolute',
  },
  /**
   * @description 箭头的偏移量
   */
  offset: {
    type: Number,
    default: 10,
  },
  /**
   * @description 是否显示箭头
   */
  showArrow: Boolean,
  /**
   * @description 内容的 zIndex
   */
  zIndex: {
    type: Number,
    default: 2001,
  },
})

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TourContentProps`。
 */
export type TourContentPropsPublic = ExtractPublicPropTypes<
  typeof tourContentProps
>

export const tourContentEmits = {
  close: () => true,
}
export type TourContentEmits = typeof tourContentEmits
