import { buildProps, iconPropType } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type { IconPropType } from '@element-plus/utils'
import type TimelineItem from './timeline-item.vue'

export interface TimelineItemProps {
  /**
   * @description 时间戳内容
   */
  timestamp?: string
  /**
   * @description 是否显示时间戳
   */
  hideTimestamp?: boolean
  /**
   * @description 是否垂直居中
   */
  center?: boolean
  /**
   * @description 时间戳的位置
   */
  placement?: 'top' | 'bottom'
  /**
   * @description 节点类型
   */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | ''
  /**
   * @description 节点的背景色
   */
  color?: string
  /**
   * @description 节点尺寸
   */
  size?: 'normal' | 'large'
  /**
   * @description 图标组件
   */
  icon?: IconPropType
  /**
   * @description 图标是否为空心
   */
  hollow?: boolean
}

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TimelineItemProps`。
 */
export const timelineItemProps = buildProps({
  /**
   * @description 时间戳内容
   */
  timestamp: {
    type: String,
    default: '',
  },
  /**
   * @description 是否显示时间戳
   */
  hideTimestamp: Boolean,
  /**
   * @description 是否垂直居中
   */
  center: Boolean,
  /**
   * @description 时间戳的位置
   */
  placement: {
    type: String,
    values: ['top', 'bottom'],
    default: 'bottom',
  },
  /**
   * @description 节点类型
   */
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'danger', 'info'],
    default: '',
  },
  /**
   * @description 节点的背景色
   */
  color: {
    type: String,
    default: '',
  },
  /**
   * @description 节点尺寸
   */
  size: {
    type: String,
    values: ['normal', 'large'],
    default: 'normal',
  },
  /**
   * @description 图标组件
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description 图标是否为空心
   */
  hollow: Boolean,
} as const)

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TimelineItemProps`。
 */
export type TimelineItemPropsPublic = ExtractPublicPropTypes<
  typeof timelineItemProps
>

export type TimelineItemInstance = InstanceType<typeof TimelineItem> & unknown
