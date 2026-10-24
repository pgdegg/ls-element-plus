import { useSizeProp } from '@element-plus/hooks'
import { buildProps, definePropType, iconPropType } from '@element-plus/utils'
import { Loading } from '@element-plus/icons-vue'

import type { Component, ExtractPublicPropTypes } from 'vue'
import type { ComponentSize } from '@element-plus/constants'
import type { IconPropType } from '@element-plus/utils'

export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  /**
   * @deprecated
   * Text 类型将在下一个大版本 (3.0.0) 中被废弃
   */
  'text',
  '',
] as const
export const buttonNativeTypes = ['button', 'submit', 'reset'] as const

export type ButtonType = (typeof buttonTypes)[number]
export type ButtonNativeType = (typeof buttonNativeTypes)[number]

export interface ButtonProps {
  /** 忽略从按钮组继承的 disabled 状态。 */
  ignoreGroupDisabled?: boolean
  /**
   * @description 按钮尺寸
   */
  size?: ComponentSize
  /**
   * @description 禁用按钮
   */
  disabled?: boolean
  /**
   * @description 按钮类型
   */
  type?: ButtonType
  /**
   * @description 图标组件
   */
  icon?: IconPropType
  /**
   * @description 原生按钮类型
   */
  nativeType?: ButtonNativeType
  /**
   * @description 是否正在加载
   */
  loading?: boolean
  /**
   * @description 自定义加载图标组件
   */
  loadingIcon?: IconPropType
  /**
   * @description 是否为朴素按钮
   */
  plain?: boolean
  /**
   * @description 是否为文本按钮
   */
  text?: boolean
  /**
   * @description 是否为链接按钮
   */
  link?: boolean
  /**
   * @description 文本按钮背景色是否始终显示
   */
  bg?: boolean
  /**
   * @description 原生按钮自动聚焦
   */
  autofocus?: boolean
  /**
   * @description 是否为圆角按钮
   */
  round?: boolean
  /**
   * @description 是否为圆形按钮
   */
  circle?: boolean
  /**
   * @description 是否为虚线按钮
   */
  dashed?: boolean
  /**
   * @description 自定义按钮颜色，自动计算 `hover` 和 `active` 颜色
   */
  color?: string
  /**
   * @description 深色模式，自动将 `color` 转换为深色模式颜色
   */
  dark?: boolean
  /**
   * @description 在两个中文字符之间自动插入空格
   */
  autoInsertSpace?: boolean
  /**
   * @description 自定义元素标签
   */
  tag?: string | Component
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `ButtonProps`
 */
export const buttonProps = buildProps({
  ignoreGroupDisabled: Boolean,
  /**
   * @description 按钮尺寸
   */
  size: useSizeProp,
  /**
   * @description 禁用按钮
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 按钮类型
   */
  type: {
    type: String,
    values: buttonTypes,
    default: '',
  },
  /**
   * @description 图标组件
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description 原生按钮类型
   */
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: 'button',
  },
  /**
   * @description 是否正在加载
   */
  loading: Boolean,
  /**
   * @description 自定义加载图标组件
   */
  loadingIcon: {
    type: iconPropType,
    default: () => Loading,
  },
  /**
   * @description 是否为朴素按钮
   */
  plain: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 是否为文本按钮
   */
  text: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 是否为链接按钮
   */
  link: Boolean,
  /**
   * @description 文本按钮背景色是否始终显示
   */
  bg: Boolean,
  /**
   * @description 原生按钮自动聚焦
   */
  autofocus: Boolean,
  /**
   * @description 是否为圆角按钮
   */
  round: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 是否为圆形按钮
   */
  circle: Boolean,
  /**
   * @description 是否为虚线按钮
   */
  dashed: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 自定义按钮颜色，自动计算 `hover` 和 `active` 颜色
   */
  color: String,
  /**
   * @description 深色模式，自动将 `color` 转换为深色模式颜色
   */
  dark: Boolean,
  /**
   * @description 在两个中文字符之间自动插入空格
   */
  autoInsertSpace: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 自定义元素标签
   */
  tag: {
    type: definePropType<string | Component>([String, Object]),
    default: 'button',
  },
} as const)
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `ButtonProps`
 */
export type ButtonPropsPublic = ExtractPublicPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits

export interface ButtonConfigContext {
  type?: ButtonProps['type']
  plain?: ButtonProps['plain']
  text?: ButtonProps['text']
  round?: ButtonProps['round']
  dashed?: ButtonProps['dashed']
  autoInsertSpace?: ButtonProps['autoInsertSpace']
}
