import { buildProps, isNumber } from '@element-plus/utils'

export interface CarouselProps {
  /**
   * @description 初始激活幻灯片的索引（从 0 开始）
   */
  initialIndex?: number
  /**
   * @description 轮播高度
   */
  height?: string
  /**
   * @description 指示器的触发方式
   */
  trigger?: 'hover' | 'click'
  /**
   * @description 是否自动循环播放幻灯片
   */
  autoplay?: boolean
  /**
   * @description 自动循环的间隔，单位为毫秒
   */
  interval?: number
  /**
   * @description 指示器的位置
   */
  indicatorPosition?: '' | 'none' | 'outside'
  /**
   * @description 箭头的显示时机
   */
  arrow?: 'always' | 'hover' | 'never'
  /**
   * @description Carousel 的类型
   */
  type?: '' | 'card'
  /**
   * @description 类型为 card 时，次要卡片的缩放尺寸
   */
  cardScale?: number
  /**
   * @description 循环展示各项
   */
  loop?: boolean
  /**
   * @description 展示方向
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * @description 悬停时暂停自动播放
   */
  pauseOnHover?: boolean
  /**
   * @description 为轮播注入动感与流畅度
   */
  motionBlur?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const carouselPropDefs = buildProps({
  /**
   * @description 初始激活幻灯片的索引（从 0 开始）
   */
  initialIndex: {
    type: Number,
    default: 0,
  },
  /**
   * @description 轮播高度
   */
  height: {
    type: String,
    default: '',
  },
  /**
   * @description 指示器的触发方式
   */
  trigger: {
    type: String,
    values: ['hover', 'click'],
    default: 'hover',
  },
  /**
   * @description 是否自动循环播放幻灯片
   */
  autoplay: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 自动循环的间隔，单位为毫秒
   */
  interval: {
    type: Number,
    default: 3000,
  },
  /**
   * @description 指示器的位置
   */
  indicatorPosition: {
    type: String,
    values: ['', 'none', 'outside'],
    default: '',
  },
  /**
   * @description 箭头的显示时机
   */
  arrow: {
    type: String,
    values: ['always', 'hover', 'never'],
    default: 'hover',
  },
  /**
   * @description Carousel 的类型
   */
  type: {
    type: String,
    values: ['', 'card'],
    default: '',
  },
  /**
   * @description 类型为 card 时，次要卡片的缩放尺寸
   */
  cardScale: {
    type: Number,
    default: 0.83,
  },
  /**
   * @description 循环展示各项
   */
  loop: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 展示方向
   */
  direction: {
    type: String,
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
  /**
   * @description 悬停时暂停自动播放
   */
  pauseOnHover: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 为轮播注入动感与流畅度
   */
  motionBlur: Boolean,
} as const)

export const carouselEmits = {
  /**
   * @description 激活幻灯片切换时触发
   * @param current 新激活幻灯片的索引
   * @param prev 旧激活幻灯片的索引
   */
  change: (current: number, prev: number) => [current, prev].every(isNumber),
}
export type CarouselEmits = typeof carouselEmits
