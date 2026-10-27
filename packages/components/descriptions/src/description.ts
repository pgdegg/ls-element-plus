import { buildProps } from '@element-plus/utils'
import { useSizeProp } from '@element-plus/hooks'

import type { ComponentSize } from '@element-plus/constants'
import type Description from './description.vue'

export interface DescriptionProps {
  /**
   * @description 是否带边框
   * @default false
   */
  border?: boolean
  /**
   * @description 一行中 `Descriptions Item` 的数量
   * @default 3
   */
  column?: number
  /**
   * @description 列表方向
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * @description 列表尺寸
   * @default ''
   */
  size?: ComponentSize
  /**
   * @description 标题文本，显示在左上角
   * @default ''
   */
  title?: string
  /**
   * @description 额外文本，显示在右上角
   * @default ''
   */
  extra?: string
  /**
   * @description 每个标签列的宽度
   */
  labelWidth?: string | number
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const descriptionPropDefs = buildProps({
  /**
   * @description 是否带边框
   */
  border: Boolean,
  /**
   * @description 一行中 `Descriptions Item` 的数量
   */
  column: {
    type: Number,
    default: 3,
  },
  /**
   * @description 列表方向
   */
  direction: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
  /**
   * @description 列表尺寸
   */
  size: useSizeProp,
  /**
   * @description 标题文本，显示在左上角
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 额外文本，显示在右上角
   */
  extra: {
    type: String,
    default: '',
  },
  /**
   * @description 每个标签列的宽度
   */
  labelWidth: {
    type: [String, Number],
  },
} as const)
export type DescriptionInstance = InstanceType<typeof Description> & unknown
