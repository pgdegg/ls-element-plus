import { buildProps } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'

export interface AnchorLinkProps {
  /**
   * @description 锚点链接的文本内容
   */
  title?: string
  /**
   * @description 锚点链接的地址
   */
  href?: string
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `AnchorLinkProps`
 */
export const anchorLinkProps = buildProps({
  /**
   * @description 锚点链接的文本内容
   */
  title: String,
  /**
   * @description 锚点链接的地址
   */
  href: String,
})

/**
 * @deprecated 自 3.0.0 后移除，请使用 `AnchorLinkProps`
 */
export type AnchorLinkPropsPublic = ExtractPublicPropTypes<
  typeof anchorLinkProps
>
