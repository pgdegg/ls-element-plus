export interface FooterProps {
  /**
   * @description 页脚高度
   */
  height?: string | null
}

export const FooterDefaultValueProps = {
  height: { type: String, default: null },
} as const
