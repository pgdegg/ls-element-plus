import { buildProps } from '@element-plus/utils'
import { componentSizes } from '@element-plus/constants'

import type { ComponentSize } from '@element-plus/constants'
import type Tag from './tag.vue'

export interface TagProps {
  /**
   * @description Tag 的类型
   */
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  /**
   * @description Tag 是否可被移除
   */
  closable?: boolean
  /**
   * @description 是否禁用动画
   */
  disableTransitions?: boolean
  /**
   * @description Tag 是否有高亮边框
   */
  hit?: boolean
  /**
   * @description Tag 的背景色
   */
  color?: string
  /**
   * @description Tag 的尺寸
   */
  size?: ComponentSize
  /**
   * @description Tag 的主题
   */
  effect?: 'dark' | 'light' | 'plain'
  /**
   * @description Tag 是否圆角
   */
  round?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const tagPropDefs = buildProps({
  /**
   * @description Tag 的类型
   */
  type: {
    type: String,
    values: ['primary', 'success', 'info', 'warning', 'danger'],
    default: 'primary',
  },
  /**
   * @description Tag 是否可被移除
   */
  closable: Boolean,
  /**
   * @description 是否禁用动画
   */
  disableTransitions: Boolean,
  /**
   * @description Tag 是否有高亮边框
   */
  hit: Boolean,
  /**
   * @description Tag 的背景色
   */
  color: String,
  /**
   * @description Tag 的尺寸
   */
  size: {
    type: String,
    values: componentSizes,
  },
  /**
   * @description Tag 的主题
   */
  effect: {
    type: String,
    values: ['dark', 'light', 'plain'],
    default: 'light',
  },
  /**
   * @description Tag 是否圆角
   */
  round: Boolean,
} as const)

export const tagEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type TagEmits = typeof tagEmits

export type TagInstance = InstanceType<typeof Tag> & unknown
