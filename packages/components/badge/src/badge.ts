import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPublicPropTypes, StyleValue } from 'vue'
import type { ClassValue } from '@element-plus/utils'

export interface BadgeProps {
  /**
   * @description 显示值。
   */
  value?: string | number
  /**
   * @description 最大值，超出时显示 `{max}+`。仅当 value 为数字时生效。
   */
  max?: number
  /**
   * @description 是否显示小圆点。
   */
  isDot?: boolean
  /**
   * @description 隐藏徽章。
   */
  hidden?: boolean
  /**
   * @description 徽章类型。
   */
  type?: 'primary' | 'success' | 'warning' | 'info' | 'danger'
  /**
   * @description value 为零时是否显示徽章。
   */
  showZero?: boolean
  /**
   * @description 自定义圆点背景色
   */
  color?: string
  /**
   * @description 徽章的 CSS 样式
   */
  badgeStyle?: StyleValue
  /**
   * @description 设置徽章的偏移量
   */
  offset?: [number, number]
  /**
   * @description 徽章的自定义类名
   */
  badgeClass?: ClassValue
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `BadgeProps`
 */
export const badgeProps = buildProps({
  /**
   * @description 显示值。
   */
  value: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 最大值，超出时显示 `{max}+`。仅当 value 为数字时生效。
   */
  max: {
    type: Number,
    default: 99,
  },
  /**
   * @description 是否显示小圆点。
   */
  isDot: Boolean,
  /**
   * @description 隐藏徽章。
   */
  hidden: Boolean,
  /**
   * @description 徽章类型。
   */
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger'],
    default: 'danger',
  },
  /**
   * @description value 为零时是否显示徽章。
   */
  showZero: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 自定义圆点背景色
   */
  color: String,
  /**
   * @description 徽章的 CSS 样式
   */
  badgeStyle: {
    type: definePropType<StyleValue>([String, Object, Array, Boolean]),
    default: undefined,
  },
  /**
   * @description 设置徽章的偏移量
   */
  offset: {
    type: definePropType<[number, number]>(Array),
    default: () => [0, 0],
  },
  /**
   * @description 徽章的自定义类名
   */
  badgeClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
} as const)

/**
 * @deprecated 自 3.0.0 后移除，请使用 `BadgeProps`
 */
export type BadgePropsPublic = ExtractPublicPropTypes<typeof badgeProps>
