import { buildProps, definePropType, isNumber } from '@element-plus/utils'
import { useAriaProps } from '@element-plus/hooks'

import type { ClassValue } from '@element-plus/utils'
import type { ExtractPublicPropTypes, StyleValue } from 'vue'
import type Scrollbar from './scrollbar.vue'

export interface ScrollbarProps {
  overflowWidth?: number
  overflowHeight?: number
  /**
   * @description 触发距离（px）
   * @default 0
   */
  distance?: number
  /**
   * @description 滚动条高度
   * @default ''
   */
  height?: number | string
  /**
   * @description 滚动条最大高度
   * @default ''
   */
  maxHeight?: number | string
  /**
   * @description 是否使用原生滚动条
   */
  native?: boolean
  /**
   * @description wrap 的样式
   * @default ''
   */
  wrapStyle?: StyleValue
  /**
   * @description wrap 的类名
   * @default ''
   */
  wrapClass?: ClassValue
  /**
   * @description view 的类名
   * @default ''
   */
  viewClass?: ClassValue
  /**
   * @description view 的样式
   * @default ''
   */
  viewStyle?: StyleValue
  /**
   * @description 不响应容器尺寸变化；如果容器尺寸不会变化，最好设置该项以优化性能
   */
  noresize?: boolean
  /**
   * @description view 的元素标签
   * @default 'div'
   */
  tag?: keyof HTMLElementTagNameMap | (string & {})
  /**
   * @description 始终显示
   */
  always?: boolean
  /**
   * @description 在还有更多内容可滚动时，在所有边缘或指定边缘显示渐变遮罩
   * @default false
   */
  mask?: boolean | ScrollbarDirection
  /**
   * @description 滚动条最小尺寸
   * @default 20
   */
  minSize?: number
  /**
   * @description Wrap 的 tabindex
   * @default undefined
   */
  tabindex?: number | string
  /**
   * @description view 的 id
   */
  id?: string
  /**
   * @description view 的 role
   */
  role?: string
  /**
   * @description 原生 `aria-label` 属性
   */
  ariaLabel?: string
  /**
   * @description 原生 `aria-orientation` 属性
   */
  ariaOrientation?: 'horizontal' | 'vertical' | 'undefined'
}

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `ScrollbarProps`。
 */
export const scrollbarProps = buildProps({
  overflowWidth: { type: Number, default: 4 },
  overflowHeight: { type: Number, default: 4 },
  /**
   * @description 触发距离（px）
   */
  distance: {
    type: Number,
    default: 0,
  },
  /**
   * @description 滚动条高度
   */
  height: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 滚动条最大高度
   */
  maxHeight: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 是否使用原生滚动条
   */
  native: Boolean,
  /**
   * @description wrap 的样式
   */
  wrapStyle: {
    type: definePropType<StyleValue>([String, Object, Array, Boolean]),
    default: '',
  },
  /**
   * @description wrap 的类名
   */
  wrapClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: '',
  },
  /**
   * @description view 的类名
   */
  viewClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: '',
  },
  /**
   * @description view 的样式
   */
  viewStyle: {
    type: definePropType<StyleValue>([String, Object, Array, Boolean]),
    default: '',
  },
  /**
   * @description 不响应容器尺寸变化；如果容器尺寸不会变化，最好设置该项以优化性能
   */
  noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  /**
   * @description view 的元素标签
   */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * @description 始终显示
   */
  always: Boolean,
  /**
   * @description 在还有更多内容可滚动时，在所有边缘或指定边缘显示渐变遮罩
   */
  mask: {
    type: [Boolean, String],
    values: [true, false, 'top', 'bottom', 'left', 'right'],
    default: false,
  },
  /**
   * @description 滚动条最小尺寸
   */
  minSize: {
    type: Number,
    default: 20,
  },
  /**
   * @description Wrap 的 tabindex
   */
  tabindex: {
    type: [String, Number],
    default: undefined,
  },
  /**
   * @description view 的 id
   */
  id: String,
  /**
   * @description view 的 role
   */
  role: String,
  ...useAriaProps(['ariaLabel', 'ariaOrientation']),
} as const)

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `ScrollbarProps`。
 */
export type ScrollbarPropsPublic = ExtractPublicPropTypes<typeof scrollbarProps>

export const scrollbarEmits = {
  'end-reached': (direction: ScrollbarDirection) =>
    ['left', 'right', 'top', 'bottom'].includes(direction),
  scroll: ({
    scrollTop,
    scrollLeft,
  }: {
    scrollTop: number
    scrollLeft: number
  }) => [scrollTop, scrollLeft].every(isNumber),
}
export type ScrollbarEmits = typeof scrollbarEmits
export type ScrollbarDirection = 'top' | 'bottom' | 'left' | 'right'

export type ScrollbarInstance = InstanceType<typeof Scrollbar> & unknown
