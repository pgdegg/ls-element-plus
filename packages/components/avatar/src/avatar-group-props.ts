import { placements } from '@popperjs/core'
import { useTooltipContentProps } from '@element-plus/components/tooltip'
import { definePropType, isNumber } from '@element-plus/utils'
import { componentSizes } from '@element-plus/constants'

import type { AvatarProps } from './avatar'
import type { ExtractPropTypes, ExtractPublicPropTypes, StyleValue } from 'vue'
import type { Placement, PopperEffect } from '@element-plus/components/popper'
import type { ClassValue } from '@element-plus/utils'

export const avatarGroupProps = {
  /**
   * @description 控制该 avatar-group 中头像的尺寸
   */
  size: {
    type: definePropType<AvatarProps['size']>([Number, String]),
    values: componentSizes,
    validator: (val: unknown): val is number => isNumber(val),
  },
  /**
   * @description 控制该 avatar-group 中头像的形状
   */
  shape: {
    type: definePropType<AvatarProps['shape']>(String),
    values: ['circle', 'square'] as const,
  },
  /**
   * @description 是否折叠头像
   */
  collapseAvatars: Boolean,
  /**
   * @description 鼠标悬停在折叠头像文本上时是否显示全部已折叠头像。使用此项需将 `collapse-avatars` 设为 true
   */
  collapseAvatarsTooltip: Boolean,
  /**
   * @description 最多显示的头像数量。使用此项需将 `collapse-avatars` 设为 true
   */
  maxCollapseAvatars: {
    type: Number,
    default: 1,
  },
  /**
   * @description tooltip 主题，内置主题：`dark` / `light`
   */
  effect: {
    type: definePropType<PopperEffect>(String),
    default: 'light',
  },
  /**
   * @description tooltip 的位置
   */
  placement: {
    type: definePropType<Placement>(String),
    values: placements,
    default: 'top',
  },
  /**
   * @description tooltip 的自定义类名
   */
  popperClass: useTooltipContentProps.popperClass,
  /**
   * @description tooltip 的自定义样式
   */
  popperStyle: useTooltipContentProps.popperStyle,
  /**
   * @description 折叠头像的自定义类名
   */
  collapseClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  /**
   * @description 折叠头像的自定义样式
   */
  collapseStyle: {
    type: definePropType<StyleValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
} as const
export type AvatarGroupProps = ExtractPropTypes<typeof avatarGroupProps>
export type AvatarGroupPropsPublic = ExtractPublicPropTypes<
  typeof avatarGroupProps
>
