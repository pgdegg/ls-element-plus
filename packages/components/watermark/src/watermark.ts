import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type Watermark from './watermark.vue'

export interface WatermarkFontType {
  color?: string
  fontSize?: number | string
  fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder' | number
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique'
  fontFamily?: string
  fontGap?: number
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center'
  textBaseline?:
    'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'
}

export interface WatermarkProps {
  /**
   * @description 追加的水印元素的 z-index
   */
  zIndex?: number
  /**
   * @description 水印的旋转角度
   */
  rotate?: number
  /**
   * @description 水印宽度
   */
  width?: number
  /**
   * @description 水印高度
   */
  height?: number
  /**
   * @description 图片源，建议导出 2x 或 3x 图片，优先级高（支持 base64 格式）
   */
  image?: string
  /**
   * @description 水印文本内容
   */
  content?: string | string[]
  /**
   * @description 文本样式
   */
  font?: WatermarkFontType
  /**
   * @description 水印之间的间距
   */
  gap?: [number, number]
  /**
   * @description 水印相对于容器左上角的偏移，默认为 gap/2
   */
  offset?: [number, number]
}

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `WatermarkProps`。
 */
export const watermarkProps = buildProps({
  /**
   * @description 追加的水印元素的 z-index
   */
  zIndex: {
    type: Number,
    default: 9,
  },
  /**
   * @description 水印的旋转角度
   */
  rotate: {
    type: Number,
    default: -22,
  },
  /**
   * @description 水印宽度
   */
  width: Number,
  /**
   * @description 水印高度
   */
  height: Number,
  /**
   * @description 图片源，建议导出 2x 或 3x 图片，优先级高（支持 base64 格式）
   */
  image: String,
  /**
   * @description 水印文本内容
   */
  content: {
    type: definePropType<string | string[]>([String, Array]),
    default: 'Element Plus',
  },
  /**
   * @description 文本样式
   */
  font: {
    type: definePropType<WatermarkFontType>(Object),
  },
  /**
   * @description 水印之间的间距
   */
  gap: {
    type: definePropType<[number, number]>(Array),
    default: () => [100, 100],
  },
  /**
   * @description 水印相对于容器左上角的偏移，默认为 gap/2
   */
  offset: {
    type: definePropType<[number, number]>(Array),
  },
} as const)

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `WatermarkProps`。
 */
export type WatermarkPropsPublic = ExtractPublicPropTypes<typeof watermarkProps>
export type WatermarkInstance = InstanceType<typeof Watermark> & unknown
