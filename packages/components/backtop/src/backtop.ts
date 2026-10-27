export interface BacktopProps {
  /**
   * @description 滚动高度达到该值之前按钮不显示。
   */
  visibilityHeight?: number
  /**
   * @description 触发滚动的目标元素。
   */
  target?: string
  /**
   * @description 右侧距离。
   */
  right?: number
  /**
   * @description 底部距离。
   */
  bottom?: number
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const backtopPropDefs = {
  /**
   * @description 滚动高度达到该值之前按钮不显示。
   */
  visibilityHeight: {
    type: Number,
    default: 200,
  },
  /**
   * @description 触发滚动的目标元素。
   */
  target: {
    type: String,
    default: '',
  },
  /**
   * @description 右侧距离。
   */
  right: {
    type: Number,
    default: 40,
  },
  /**
   * @description 底部距离。
   */
  bottom: {
    type: Number,
    default: 40,
  },
} as const

export const backtopEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type BacktopEmits = typeof backtopEmits
