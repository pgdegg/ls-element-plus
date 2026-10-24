import {
  buildProps,
  definePropType,
  isArray,
  isString,
} from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
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

/**
 * @deprecated 3.0.0 后移除，请改用 `MenuItemProps`。
 */
export const menuItemProps = buildProps({
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

/**
 * @deprecated 3.0.0 后移除，请改用 `MenuItemProps`。
 */
export type MenuItemPropsPublic = ExtractPublicPropTypes<typeof menuItemProps>

export const menuItemEmits = {
  click: (item: MenuItemRegistered) =>
    isString(item.index) && isArray(item.indexPath),
}
export type MenuItemEmits = typeof menuItemEmits
