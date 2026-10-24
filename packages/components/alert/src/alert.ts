import { TypeComponentsMap, buildProps, keysOf } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'

export const alertEffects = ['light', 'dark'] as const

export interface AlertProps {
  /**
   * @description 警告标题
   */
  title?: string
  /**
   * @description 描述性文本
   */
  description?: string
  /**
   * @description 警告类型
   */
  type?: keyof typeof TypeComponentsMap
  /**
   * @description 警告是否可关闭
   */
  closable?: boolean
  /**
   * @description 用于替换关闭按钮（x）的文本
   */
  closeText?: string
  /**
   * @description 是否显示图标
   */
  showIcon?: boolean
  /**
   * @description 内容是否居中
   */
  center?: boolean
  /**
   * @description 主题样式
   */
  effect?: 'light' | 'dark'
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `AlertProps`
 */
export const alertProps = buildProps({
  /**
   * @description 警告标题
   */
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  /**
   * @description 警告类型
   */
  type: {
    type: String,
    values: keysOf(TypeComponentsMap),
    default: 'info',
  },
  /**
   * @description 警告是否可关闭
   */
  closable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 用于替换关闭按钮（x）的文本
   */
  closeText: {
    type: String,
    default: '',
  },
  /**
   * @description 是否显示图标
   */
  showIcon: Boolean,
  /**
   * @description 内容是否居中
   */
  center: Boolean,
  effect: {
    type: String,
    values: alertEffects,
    default: 'light',
  },
} as const)

/**
 * @deprecated 自 3.0.0 后移除，请使用 `AlertProps`
 */
export type AlertPropsPublic = ExtractPublicPropTypes<typeof alertProps>

export const alertEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type AlertEmits = typeof alertEmits
