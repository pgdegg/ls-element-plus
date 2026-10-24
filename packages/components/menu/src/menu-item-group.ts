import type { ExtractPublicPropTypes } from 'vue'

export interface MenuItemGroupProps {
  /**
   * @description 分组标题
   */
  title?: string
}

/**
 * @deprecated 3.0.0 后移除，请改用 `MenuItemGroupProps`。
 */
export const menuItemGroupProps = {
  /**
   * @description 分组标题
   */
  title: String,
} as const

/**
 * @deprecated 3.0.0 后移除，请改用 `MenuItemGroupProps`。
 */
export type MenuItemGroupPropsPublic = ExtractPublicPropTypes<
  typeof menuItemGroupProps
>
