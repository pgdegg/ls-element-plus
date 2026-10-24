import {
  buildProps,
  definePropType,
  isString,
  isUndefined,
} from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type Anchor from './anchor.vue'

export interface AnchorProps {
  /**
   * @description 滚动容器
   */
  container?: string | HTMLElement | Window | null
  /**
   * @description 设置锚点滚动的偏移量
   */
  offset?: number
  /**
   * @description 开始触发锚点的元素偏移量
   */
  bound?: number
  /**
   * @description 点击锚点时容器的滚动时长，单位为毫秒
   */
  duration?: number
  /**
   * @description 是否显示标记
   */
  marker?: boolean
  /**
   * @description 设置 Anchor 类型
   */
  type?: 'default' | 'underline'
  /**
   * @description 设置 Anchor 方向
   */
  direction?: 'vertical' | 'horizontal'
  /**
   * @description 滚动至顶部时链接是否被选中
   */
  selectScrollTop?: boolean
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `AnchorProps`
 */
export const anchorProps = buildProps({
  /**
   * @description 滚动容器
   */
  container: {
    type: definePropType<string | HTMLElement | Window | null>([
      String,
      Object,
    ]),
  },
  /**
   * @description 设置锚点滚动的偏移量
   */
  offset: {
    type: Number,
    default: 0,
  },
  /**
   * @description 开始触发锚点的元素偏移量
   */
  bound: {
    type: Number,
    default: 15,
  },
  /**
   * @description 点击锚点时容器的滚动时长，单位为毫秒
   */
  duration: {
    type: Number,
    default: 300,
  },
  /**
   * @description 是否显示标记
   */
  marker: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 设置 Anchor 类型
   */
  type: {
    type: definePropType<'default' | 'underline'>(String),
    default: 'default',
  },
  /**
   * @description 设置 Anchor 方向
   */
  direction: {
    type: definePropType<'vertical' | 'horizontal'>(String),
    default: 'vertical',
  },
  /**
   * @description 滚动至顶部时链接是否被选中
   */
  selectScrollTop: Boolean,
})

/**
 * @deprecated 自 3.0.0 后移除，请使用 `AnchorProps`
 */
export type AnchorPropsPublic = ExtractPublicPropTypes<typeof anchorProps>
export type AnchorInstance = InstanceType<typeof Anchor> & unknown

export const anchorEmits = {
  change: (href: string) => isString(href),
  click: (e: MouseEvent, href?: string) =>
    e instanceof MouseEvent && (isString(href) || isUndefined(href)),
}
export type AnchorEmits = typeof anchorEmits
