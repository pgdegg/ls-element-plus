import { buildProps } from '@element-plus/utils'

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

/** @internal Runtime prop definitions; use the public props interface for types. */
export const emptyPropDefs = buildProps({
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
