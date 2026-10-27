export interface MenuItemGroupProps {
  /**
   * @description 分组标题
   */
  title?: string
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const menuItemGroupPropDefs = {
  /**
   * @description 分组标题
   */
  title: String,
} as const
