import { buildProps } from '@element-plus/utils'

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

/** Runtime prop definitions; use the public props interface for types. */
export const AnchorLinkDefaultValueProps = buildProps({
  /**
   * @description 锚点链接的文本内容
   */
  title: String,
  /**
   * @description 锚点链接的地址
   */
  href: String,
})
