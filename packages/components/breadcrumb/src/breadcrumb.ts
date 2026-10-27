import { buildProps, iconPropType } from '@element-plus/utils'

import type { IconPropType } from '@element-plus/utils'

export interface BreadcrumbProps {
  /**
   * @description 分隔符
   */
  separator?: string
  /**
   * @description 图标分隔符的图标组件
   */
  separatorIcon?: IconPropType
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const breadcrumbPropDefs = buildProps({
  /**
   * @description 分隔符
   */
  separator: {
    type: String,
    default: '/',
  },
  /**
   * @description 图标分隔符的图标组件
   */
  separatorIcon: {
    type: iconPropType,
  },
} as const)
