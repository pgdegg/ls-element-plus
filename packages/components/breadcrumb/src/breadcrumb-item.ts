import { buildProps, definePropType } from '@element-plus/utils'

import type { RouteLocationRaw } from 'vue-router'

export interface BreadcrumbItemProps {
  /**
   * @description 链接的目标路由，与 `vue-router` 的 `to` 相同
   */
  to?: RouteLocationRaw
  /**
   * @description 若为 `true`，导航不会留下历史记录
   */
  replace?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const breadcrumbItemPropDefs = buildProps({
  /**
   * @description 链接的目标路由，与 `vue-router` 的 `to` 相同
   */
  to: {
    type: definePropType<RouteLocationRaw>([String, Object]),
    default: '',
  },
  /**
   * @description 若为 `true`，导航不会留下历史记录
   */
  replace: Boolean,
} as const)
