import { buildProps, definePropType, mutable } from '@element-plus/utils'

import type Col from './col.vue'

export type ColSizeObject = {
  span?: number
  offset?: number
  pull?: number
  push?: number
}
export type ColSize = number | ColSizeObject

export interface ColProps {
  /**
   * @description 自定义元素标签
   */
  tag?: string
  /**
   * @description 栅格占据的列数
   */
  span?: number
  /**
   * @description 栅格左侧的间隔列数
   */
  offset?: number
  /**
   * @description 栅格向左移动的列数
   */
  pull?: number
  /**
   * @description 栅格向右移动的列数
   */
  push?: number
  /**
   * @description `<768px` 响应式列数或列属性对象
   */
  xs?: ColSize
  /**
   * @description `≥768px` 响应式列数或列属性对象
   */
  sm?: ColSize
  /**
   * @description `≥992px` 响应式列数或列属性对象
   */
  md?: ColSize
  /**
   * @description `≥1200px` 响应式列数或列属性对象
   */
  lg?: ColSize
  /**
   * @description `≥1920px` 响应式列数或列属性对象
   */
  xl?: ColSize
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const colPropDefs = buildProps({
  /**
   * @description 自定义元素标签
   */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * @description 栅格占据的列数
   */
  span: {
    type: Number,
    default: 24,
  },
  /**
   * @description 栅格左侧的间隔列数
   */
  offset: {
    type: Number,
    default: 0,
  },
  /**
   * @description 栅格向左移动的列数
   */
  pull: {
    type: Number,
    default: 0,
  },
  /**
   * @description 栅格向右移动的列数
   */
  push: {
    type: Number,
    default: 0,
  },
  /**
   * @description `<768px` 响应式列数或列属性对象
   */
  xs: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => mutable({} as const),
  },
  /**
   * @description `≥768px` 响应式列数或列属性对象
   */
  sm: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => mutable({} as const),
  },
  /**
   * @description `≥992px` 响应式列数或列属性对象
   */
  md: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => mutable({} as const),
  },
  /**
   * @description `≥1200px` 响应式列数或列属性对象
   */
  lg: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => mutable({} as const),
  },
  /**
   * @description `≥1920px` 响应式列数或列属性对象
   */
  xl: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => mutable({} as const),
  },
} as const)
export type ColInstance = InstanceType<typeof Col> & unknown
