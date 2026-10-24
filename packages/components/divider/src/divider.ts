import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type Divider from './divider.vue'

export type BorderStyle = CSSStyleDeclaration['borderStyle']

export interface DividerProps {
  /**
   * @description 设置分割线方向
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * @description 分割线上自定义内容的位置
   */
  contentPosition?: 'left' | 'center' | 'right'
  /**
   * @description 设置分割线样式
   */
  borderStyle?: BorderStyle
}

/**
 * @deprecated 3.0.0 后移除，请改用 `DividerProps`。
 */
export const dividerProps = buildProps({
  /**
   * @description 设置分割线方向
   */
  direction: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
  /**
   * @description 分割线上自定义内容的位置
   */
  contentPosition: {
    type: String,
    values: ['left', 'center', 'right'],
    default: 'center',
  },
  /**
   * @description 设置分割线样式
   */
  borderStyle: {
    type: definePropType<BorderStyle>(String),
    default: 'solid',
  },
} as const)

/**
 * @deprecated 3.0.0 后移除，请改用 `DividerProps`。
 */
export type DividerPropsPublic = ExtractPublicPropTypes<typeof dividerProps>

export type DividerInstance = InstanceType<typeof Divider> & unknown
