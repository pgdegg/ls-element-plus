export interface HeaderProps {
  /**
   * @description 头部高度
   */
  height?: string | null
}

export const HeaderDefaultValueProps = {
  height: { type: String, default: null },
} as const
