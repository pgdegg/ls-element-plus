import { Star, StarFilled } from '@element-plus/icons-vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import {
  buildProps,
  definePropType,
  iconPropType,
  isNumber,
  mutable,
} from '@element-plus/utils'
import { useAriaProps, useSizeProp } from '@element-plus/hooks'

import type { Component, ExtractPublicPropTypes } from 'vue'
import type { ComponentSize } from '@element-plus/constants'
import type { IconPropType } from '@element-plus/utils'
import type Rate from './rate.vue'

export interface RateProps {
  /**
   * @description 绑定值
   */
  modelValue?: number
  /**
   * @description 原生 `id` 属性
   */
  id?: string
  /**
   * @description 低等级与中等级之间的阈值，该值本身归入低等级
   */
  lowThreshold?: number
  /**
   * @description 中等级与高等级之间的阈值，该值本身归入高等级
   */
  highThreshold?: number
  /**
   * @description 最大评分
   */
  max?: number
  /**
   * @description 图标颜色。若为数组，应包含 3 个元素，分别对应一个评分等级；若为对象，键为两个等级之间的阈值，值为对应的颜色
   */
  colors?: string[] | Record<number, string>
  /**
   * @description 未选中图标的颜色
   */
  voidColor?: string
  /**
   * @description 只读状态下未选中图标的颜色
   */
  disabledVoidColor?: string
  /**
   * @description 图标组件。若为数组，应包含 3 个元素，分别对应一个评分等级；若为对象，键为两个等级之间的阈值，值为对应的图标组件
   */
  icons?: Array<IconPropType> | Record<number, IconPropType>
  /**
   * @description 未选中图标的组件
   */
  voidIcon?: IconPropType
  /**
   * @description 只读状态下未选中图标的组件
   */
  disabledVoidIcon?: IconPropType
  /**
   * @description Rate 是否为只读
   */
  disabled?: boolean
  /**
   * @description 是否允许选择半星
   */
  allowHalf?: boolean
  /**
   * @description 是否显示文本
   */
  showText?: boolean
  /**
   * @description 是否显示当前分数。show-score 与 show-text 不能同时为 true
   */
  showScore?: boolean
  /**
   * @description 文本颜色
   */
  textColor?: string
  /**
   * @description 文本数组
   */
  texts?: string[]
  /**
   * @description 分数模板
   */
  scoreTemplate?: string
  /**
   * @description Rate 的尺寸
   */
  size?: ComponentSize
  /**
   * @description 值是否可重置为 `0`
   */
  clearable?: boolean
  /**
   * @description 原生 `aria-label` 属性
   */
  ariaLabel?: string
}

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `RateProps`。
 */
export const rateProps = buildProps({
  /**
   * @description 绑定值
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * @description 原生 `id` 属性
   */
  id: {
    type: String,
    default: undefined,
  },
  /**
   * @description 低等级与中等级之间的阈值，该值本身归入低等级
   */
  lowThreshold: {
    type: Number,
    default: 2,
  },
  /**
   * @description 中等级与高等级之间的阈值，该值本身归入高等级
   */
  highThreshold: {
    type: Number,
    default: 4,
  },
  /**
   * @description 最大评分
   */
  max: {
    type: Number,
    default: 5,
  },
  /**
   * @description 图标颜色。若为数组，应包含 3 个元素，分别对应一个评分等级；若为对象，键为两个等级之间的阈值，值为对应的颜色
   */
  colors: {
    type: definePropType<string[] | Record<number, string>>([Array, Object]),
    default: () => mutable(['', '', ''] as const),
  },
  /**
   * @description 未选中图标的颜色
   */
  voidColor: {
    type: String,
    default: '',
  },
  /**
   * @description 只读状态下未选中图标的颜色
   */
  disabledVoidColor: {
    type: String,
    default: '',
  },
  /**
   * @description 图标组件。若为数组，应包含 3 个元素，分别对应一个评分等级；若为对象，键为两个等级之间的阈值，值为对应的图标组件
   */
  icons: {
    type: definePropType<
      Array<string | Component> | Record<number, string | Component>
    >([Array, Object]),
    default: () =>
      [StarFilled, StarFilled, StarFilled] as [Component, Component, Component],
  },
  /**
   * @description 未选中图标的组件
   */
  voidIcon: {
    type: iconPropType,
    default: () => Star as Component,
  },
  /**
   * @description 只读状态下未选中图标的组件
   */
  disabledVoidIcon: {
    type: iconPropType,
    default: () => StarFilled as Component,
  },
  /**
   * @description Rate 是否为只读
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 是否允许选择半星
   */
  allowHalf: Boolean,
  /**
   * @description 是否显示文本
   */
  showText: Boolean,
  /**
   * @description 是否显示当前分数。show-score 与 show-text 不能同时为 true
   */
  showScore: Boolean,
  /**
   * @description 文本颜色
   */
  textColor: {
    type: String,
    default: '',
  },
  /**
   * @description 文本数组
   */
  texts: {
    type: definePropType<string[]>(Array),
    default: () =>
      mutable([
        'Extremely bad',
        'Disappointed',
        'Fair',
        'Satisfied',
        'Surprise',
      ] as const),
  },
  /**
   * @description 分数模板
   */
  scoreTemplate: {
    type: String,
    default: '{value}',
  },
  /**
   * @description Rate 的尺寸
   */
  size: useSizeProp,
  /**
   * @description 值是否可重置为 `0`
   */
  clearable: Boolean,
  ...useAriaProps(['ariaLabel']),
} as const)

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `RateProps`。
 */
export type RatePropsPublic = ExtractPublicPropTypes<typeof rateProps>

export const rateEmits = {
  [CHANGE_EVENT]: (value: number) => isNumber(value),
  [UPDATE_MODEL_EVENT]: (value: number) => isNumber(value),
}
export type RateEmits = typeof rateEmits

export type RateInstance = InstanceType<typeof Rate> & unknown
