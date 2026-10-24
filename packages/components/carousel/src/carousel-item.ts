import { buildProps } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'

export interface CarouselItemProps {
  /**
   * @description 项的名称，可用于 `setActiveItem`
   */
  name?: string
  /**
   * @description 对应指示器的文本内容
   */
  label?: string | number
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `CarouselItemProps`
 */
export const carouselItemProps = buildProps({
  /**
   * @description 项的名称，可用于 `setActiveItem`
   */
  name: { type: String, default: '' },
  /**
   * @description 对应指示器的文本内容
   */
  label: {
    type: [String, Number],
    default: '',
  },
} as const)

/**
 * @deprecated 自 3.0.0 后移除，请使用 `CarouselItemProps`
 */
export type CarouselItemPropsPublic = ExtractPublicPropTypes<
  typeof carouselItemProps
>
