import { buildProps, iconPropType } from '@element-plus/utils'

import type { PropType } from 'vue'
import type { IconPropType } from '@element-plus/utils'
import type Link from './link.vue'

export interface LinkProps {
  /**
   * @description 类型
   */
  type?: 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'default'
  /**
   * @description 下划线出现的时机
   */
  underline?: 'always' | 'never' | 'hover'

  /**
   * @description 组件是否禁用
   */
  disabled?: boolean
  /**
   * @description 与原生超链接的 `href` 相同
   */
  href?: string
  /**
   * @description 与原生超链接的 `target` 相同
   */
  target?:
    '_blank' | '_parent' | '_self' | '_top' | (string & NonNullable<unknown>)

  /**
   * @description 图标组件
   */
  icon?: IconPropType
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const linkPropDefs = buildProps({
  /**
   * @description 类型
   */
  type: {
    type: String,
    values: ['primary', 'success', 'warning', 'info', 'danger', 'default'],
    default: undefined,
  },
  /**
   * @description 下划线出现的时机
   */
  underline: {
    type: String,
    values: ['always', 'never', 'hover'],
    default: undefined,
  },
  /**
   * @description 组件是否禁用
   */
  disabled: Boolean,
  /**
   * @description 与原生超链接的 `href` 相同
   */
  href: { type: String, default: '' },
  /**
   * @description 与原生超链接的 `target` 相同
   */
  target: {
    type: String as PropType<'_blank' | '_parent' | '_self' | '_top' | string>,
    default: '_self',
  },
  /**
   * @description 图标组件
   */
  icon: {
    type: iconPropType,
  },
} as const)

export const linkEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type LinkEmits = typeof linkEmits

export type LinkInstance = InstanceType<typeof Link> & unknown
export interface LinkConfigContext {
  type?: LinkProps['type']
  underline?: LinkProps['underline']
}
