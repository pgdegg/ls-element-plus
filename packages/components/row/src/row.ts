import { buildProps } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type Row from './row.vue'

export const RowJustify = [
  'start',
  'center',
  'end',
  'space-around',
  'space-between',
  'space-evenly',
] as const

export const RowAlign = ['top', 'middle', 'bottom'] as const

export interface RowProps {
  /**
   * @description 自定义元素标签
   */
  tag?: string
  /**
   * @description 栅格间距
   */
  gutter?: number
  /**
   * @description flex 布局的水平对齐方式
   */
  justify?: (typeof RowJustify)[number]
  /**
   * @description flex 布局的垂直对齐方式
   */
  align?: (typeof RowAlign)[number]
}

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `RowProps`。
 */
export const rowProps = buildProps({
  /**
   * @description 自定义元素标签
   */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * @description 栅格间距
   */
  gutter: {
    type: Number,
    default: 0,
  },
  /**
   * @description flex 布局的水平对齐方式
   */
  justify: {
    type: String,
    values: RowJustify,
    default: 'start',
  },
  /**
   * @description flex 布局的垂直对齐方式
   */
  align: {
    type: String,
    values: RowAlign,
  },
} as const)

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `RowProps`。
 */
export type RowPropsPublic = ExtractPublicPropTypes<typeof rowProps>
export type RowInstance = InstanceType<typeof Row> & unknown
