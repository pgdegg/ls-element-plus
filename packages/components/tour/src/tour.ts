import {
  buildProps,
  definePropType,
  iconPropType,
  isBoolean,
  isNumber,
} from '@element-plus/utils'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { tourContentPropDefs } from './content'

import type { TourContentProps } from './content'
import type { CSSProperties } from 'vue'
import type { IconPropType } from '@element-plus/utils'
import type Tour from './tour.vue'
import type { TourGap, TourMask } from './types'

export interface TourProps {
  /**
   * @description 开启 tour
   */
  modelValue?: boolean
  /**
   * @description 当前是第几步
   */
  current?: number
  /**
   * @description 是否显示箭头
   */
  showArrow?: boolean
  /**
   * @description 是否显示关闭按钮
   */
  showClose?: boolean
  /**
   * @description 自定义关闭图标
   */
  closeIcon?: IconPropType
  /**
   * @description 引导卡片相对于目标元素的位置
   */
  placement?: TourContentProps['placement']
  /**
   * @description 内容的自定义样式
   */
  contentStyle?: CSSProperties
  /**
   * @description 是否启用遮罩，可通过传入自定义 props 修改遮罩样式和填充色
   */
  mask?: TourMask
  /**
   * @description 遮罩与目标之间的透明间距
   */
  gap?: TourGap
  /**
   * @description tour 的 zIndex
   */
  zIndex?: number
  /**
   * @description 支持传入自定义 scrollIntoView 选项
   */
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions
  /**
   * @description 类型，影响背景色和文字颜色
   */
  type?: 'default' | 'primary'
  /**
   * @description TourContent 挂载到哪个元素
   */
  appendTo?: string | HTMLElement
  /**
   * @description 是否可通过按 ESC 关闭 Tour
   */
  closeOnPressEscape?: boolean
  /**
   * @description 使用遮罩时目标元素是否可点击
   */
  targetAreaClickable?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const tourPropDefs = buildProps({
  /**
   * @description 开启 tour
   */
  modelValue: Boolean,
  /**
   * @description 当前是第几步
   */
  current: {
    type: Number,
  },
  /**
   * @description 是否显示箭头
   */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示关闭按钮
   */
  showClose: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 自定义关闭图标
   */
  closeIcon: {
    type: iconPropType,
  },
  /**
   * @description 引导卡片相对于目标元素的位置
   */
  placement: tourContentPropDefs.placement,
  /**
   * @description 内容的自定义样式
   */
  contentStyle: {
    type: definePropType<CSSProperties>([Object]),
  },
  /**
   * @description 是否启用遮罩，可通过传入自定义 props 修改遮罩样式和填充色
   */
  mask: {
    type: definePropType<TourMask>([Boolean, Object]),
    default: true,
  },
  /**
   * @description 遮罩与目标之间的透明间距
   */
  gap: {
    type: definePropType<TourGap>(Object),
    default: () => ({
      offset: 6,
      radius: 2,
    }),
  },
  /**
   * @description tour 的 zIndex
   */
  zIndex: {
    type: Number,
  },
  /**
   * @description 支持传入自定义 scrollIntoView 选项
   */
  scrollIntoViewOptions: {
    type: definePropType<boolean | ScrollIntoViewOptions>([Boolean, Object]),
    default: () => ({
      block: 'center',
    }),
  },
  /**
   * @description 类型，影响背景色和文字颜色
   */
  type: {
    type: definePropType<'default' | 'primary'>(String),
  },
  /**
   * @description TourContent 挂载到哪个元素
   */
  appendTo: {
    type: definePropType<string | HTMLElement>([String, Object]),
    default: 'body',
  },
  /**
   * @description 是否可通过按 ESC 关闭 Tour
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 使用遮罩时目标元素是否可点击
   */
  targetAreaClickable: {
    type: Boolean,
    default: true,
  },
})
export type TourInstance = InstanceType<typeof Tour> & unknown

export const tourEmits = {
  [UPDATE_MODEL_EVENT]: (value: boolean) => isBoolean(value),
  ['update:current']: (current: number) => isNumber(current),
  close: (current: number) => isNumber(current),
  finish: () => true,
  change: (current: number) => isNumber(current),
}
export type TourEmits = typeof tourEmits
