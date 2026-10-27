import {
  buildProps,
  definePropType,
  isArray,
  isString,
} from '@element-plus/utils'

import type { RouteLocationRaw } from 'vue-router'
import type { MenuItemRegistered } from './types'

export interface MenuItemProps {
  /**
   * @description 唯一标识
   */
  index: string
  /**
   * @description Vue Router 对象
   */
  route?: RouteLocationRaw
  /**
   * @description 是否禁用
   */
  disabled?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const menuItemPropDefs = buildProps({
  /**
   * @description 唯一标识
   */
  index: {
    type: String,
    required: true,
  },
  /**
   * @description Vue Router 对象
   */
  route: {
    type: definePropType<RouteLocationRaw>([String, Object]),
  },
  /**
   * @description 是否禁用
   */
  disabled: Boolean,
} as const)

export const menuItemEmits = {
  click: (item: MenuItemRegistered) =>
    isString(item.index) && isArray(item.indexPath),
}
export type MenuItemEmits = typeof menuItemEmits
