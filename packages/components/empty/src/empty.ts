import { buildProps } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'

export interface EmptyProps {
  /**
   * @description 空状态的图片 URL
   */
  image?: string
  /**
   * @description 空状态的图片尺寸（宽度）
   */
  imageSize?: number
  /**
   * @description 空状态的描述
   */
  description?: string
}

/**
 * @deprecated 3.0.0 后移除，请改用 `EmptyProps`。
 */
export const emptyProps = buildProps({
  /**
   * @description 空状态的图片 URL
   */
  image: {
    type: String,
    default: '',
  },
  /**
   * @description 空状态的图片尺寸（宽度）
   */
  imageSize: Number,
  /**
   * @description 空状态的描述
   */
  description: {
    type: String,
    default: '',
  },
} as const)

/**
 * @deprecated 3.0.0 后移除，请改用 `EmptyProps`。
 */
export type EmptyPropsPublic = ExtractPublicPropTypes<typeof emptyProps>
