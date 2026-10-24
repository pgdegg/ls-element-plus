import { buildProps, definePropType } from '@element-plus/utils'
import { componentSizes } from '@element-plus/constants'

import type { ExtractPublicPropTypes } from 'vue'
import type { ComponentSize } from '@element-plus/constants'
import type Text from './text.vue'

export interface TextProps {
  /**
   * @description 渲染元素上的原生 click 处理函数
   */
  onClick?: (event: MouseEvent) => void
  /**
   * @description 文本类型
   */
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | ''
  /**
   * @description 文本尺寸
   */
  size?: ComponentSize
  /**
   * @description 是否渲染省略号
   */
  truncated?: boolean
  /**
   * @description 最大行数
   */
  lineClamp?: number | string
  /**
   * @description 自定义元素标签
   */
  tag?: string
}

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TextProps`。
 */
export const textProps = buildProps({
  onClick: {
    type: definePropType<(event: MouseEvent) => void>(Function),
  },
  /**
   * @description 文本类型
   */
  type: {
    type: String,
    values: ['primary', 'success', 'info', 'warning', 'danger', ''],
    default: '',
  },
  /**
   * @description 文本尺寸
   */
  size: {
    type: String,
    values: componentSizes,
    default: '',
  },
  /**
   * @description 是否渲染省略号
   */
  truncated: Boolean,
  /**
   * @description 最大行数
   */
  lineClamp: {
    type: [String, Number],
  },
  /**
   * @description 自定义元素标签
   */
  tag: {
    type: String,
    default: 'span',
  },
} as const)

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TextProps`。
 */
export type TextPropsPublic = ExtractPublicPropTypes<typeof textProps>

export type TextInstance = InstanceType<typeof Text> & unknown
