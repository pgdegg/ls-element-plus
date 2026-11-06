export interface MenuItemGroupProps {
  /**
   * @description 分组标题
   */
  title?: string
}

/** Runtime prop definitions; use the public props interface for types. */
export const MenuItemGroupDefaultValueProps = {
  /**
   * @description 分组标题
   */
  title: String,
} as const
