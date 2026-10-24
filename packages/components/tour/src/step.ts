import { buildProps, definePropType, iconPropType } from '@element-plus/utils'
import { tourContentProps } from './content'

import type { CSSProperties, ExtractPublicPropTypes } from 'vue'
import type { IconPropType } from '@element-plus/utils'
import type { TourBtnProps, TourMask } from './types'
import type { TourContentProps } from './content'

export interface TourStepProps {
  /**
   * @description 获取引导卡片指向的元素。为空时显示在屏幕中央
   */
  target?: string | HTMLElement | (() => HTMLElement | null) | null
  /**
   * @description tour 内容的标题
   */
  title?: string
  /**
   * @description 描述
   */
  description?: string
  /**
   * @description 是否显示关闭按钮
   */
  showClose?: boolean
  /**
   * @description 自定义关闭图标，默认为 Close
   */
  closeIcon?: IconPropType
  /**
   * @description 是否显示箭头
   */
  showArrow?: boolean
  /**
   * @description 引导卡片相对于目标元素的位置
   */
  placement?: TourContentProps['placement']
  /**
   * @description 是否启用遮罩，可通过传入自定义 props 修改遮罩样式和填充色
   */
  mask?: TourMask
  /**
   * @description 内容的自定义样式
   */
  contentStyle?: CSSProperties
  /**
   * @description 上一步按钮的属性
   */
  prevButtonProps?: TourBtnProps
  /**
   * @description 下一步按钮的属性
   */
  nextButtonProps?: TourBtnProps
  /**
   * @description 支持传入自定义 scrollIntoView 选项
   */
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions
  /**
   * @description 类型，影响背景色和文字颜色
   */
  type?: 'default' | 'primary'
}

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TourStepProps`。
 */
export const tourStepProps = buildProps({
  /**
   * @description 获取引导卡片指向的元素。为空时显示在屏幕中央
   */
  target: {
    type: definePropType<
      string | HTMLElement | (() => HTMLElement | null) | null
    >([String, Object, Function]),
  },
  /**
   * @description tour 内容的标题
   */
  title: String,
  /**
   * @description 描述
   */
  description: String,
  /**
   * @description 是否显示关闭按钮
   */
  showClose: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 自定义关闭图标，默认为 Close
   */
  closeIcon: {
    type: iconPropType,
  },
  /**
   * @description 是否显示箭头
   */
  showArrow: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 引导卡片相对于目标元素的位置
   */
  placement: tourContentProps.placement,
  /**
   * @description 是否启用遮罩，可通过传入自定义 props 修改遮罩样式和填充色
   */
  mask: {
    type: definePropType<TourMask>([Boolean, Object]),
    default: undefined,
  },
  /**
   * @description 内容的自定义样式
   */
  contentStyle: {
    type: definePropType<CSSProperties>([Object]),
  },
  /**
   * @description 上一步按钮的属性
   */
  prevButtonProps: {
    type: definePropType<TourBtnProps>(Object),
  },
  /**
   * @description 下一步按钮的属性
   */
  nextButtonProps: {
    type: definePropType<TourBtnProps>(Object),
  },
  /**
   * @description 支持传入自定义 scrollIntoView 选项
   */
  scrollIntoViewOptions: {
    type: definePropType<boolean | ScrollIntoViewOptions>([Boolean, Object]),
    default: undefined,
  },
  /**
   * @description 类型，影响背景色和文字颜色
   */
  type: {
    type: definePropType<'default' | 'primary'>(String),
  },
})

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TourStepProps`。
 */
export type TourStepPropsPublic = ExtractPublicPropTypes<typeof tourStepProps>

export const tourStepEmits = {
  close: () => true,
}
export type TourStepEmits = typeof tourStepEmits
