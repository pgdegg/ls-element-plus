export interface AsideProps {
  /**
   * @description 侧边区域宽度
   */
  width?: string | null
}

export const AsideDefaultValueProps = {
  width: { type: String, default: null },
} as const
