import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPublicPropTypes, InjectionKey, StyleValue } from 'vue'
import type { ClassValue } from '@element-plus/utils'

export interface CardProps {
  /** 展示一个禁用遮罩层。 */
  disabled?: boolean
  /**
   * @description 卡片标题。同时接受由 `slot#header` 传入的 DOM
   */
  header?: string
  /**
   * @description 页脚内容。同时接受由 `slot#footer` 传入的 DOM
   */
  footer?: string
  /**
   * @description 卡片主体的 CSS 样式
   */
  bodyStyle?: StyleValue
  /**
   * @description 卡片头部的自定义类名
   */
  headerClass?: ClassValue
  /**
   * @description 卡片主体的自定义类名
   */
  bodyClass?: ClassValue
  /**
   * @description 卡片底部的自定义类名
   */
  footerClass?: ClassValue
  /**
   * @description 何时显示卡片阴影
   */
  shadow?: 'always' | 'hover' | 'never'
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `CardProps`
 */
export const cardProps = buildProps({
  disabled: Boolean,
  /**
   * @description 卡片标题。同时接受由 `slot#header` 传入的 DOM
   */
  header: {
    type: String,
    default: '',
  },
  /**
   * @description 页脚内容。同时接受由 `slot#footer` 传入的 DOM
   */
  footer: {
    type: String,
    default: '',
  },
  /**
   * @description 卡片主体的 CSS 样式
   */
  bodyStyle: {
    type: definePropType<StyleValue>([String, Object, Array, Boolean]),
    default: '',
  },
  /**
   * @description 卡片底部的自定义类名
   */
  headerClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  /**
   * @description 卡片主体的自定义类名
   */
  bodyClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  /**
   * @description 卡片底部的自定义类名
   */
  footerClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  /**
   * @description 何时显示卡片阴影
   */
  shadow: {
    type: String,
    values: ['always', 'hover', 'never'],
    default: undefined,
  },
} as const)

/**
 * @deprecated 自 3.0.0 后移除，请使用 `CardProps`
 */
export type CardPropsPublic = ExtractPublicPropTypes<typeof cardProps>
export interface CardConfigContext {
  shadow?: CardProps['shadow']
}

export const cardContextKey: InjectionKey<CardConfigContext> =
  Symbol('cardContextKey')
