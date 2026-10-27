import { buildProps, definePropType } from '@element-plus/utils'

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

/** @internal Runtime prop definitions; use the public props interface for types. */
export const dividerPropDefs = buildProps({
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

export type DividerInstance = InstanceType<typeof Divider> & unknown
