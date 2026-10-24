import { buildProps, iconPropType } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
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

/**
 * @deprecated 自 3.0.0 后移除，请使用 `BreadcrumbProps`
 */
export const breadcrumbProps = buildProps({
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

/**
 * @deprecated 自 3.0.0 后移除，请使用 `BreadcrumbProps`
 */
export type BreadcrumbPropsPublic = ExtractPublicPropTypes<
  typeof breadcrumbProps
>
