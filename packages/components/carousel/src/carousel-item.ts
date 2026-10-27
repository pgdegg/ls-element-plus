import { buildProps } from '@element-plus/utils'

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

/** @internal Runtime prop definitions; use the public props interface for types. */
export const carouselItemPropDefs = buildProps({
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
