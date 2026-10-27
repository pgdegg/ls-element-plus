import {
  buildProps,
  definePropType,
  iconPropType,
  isNumber,
} from '@element-plus/utils'
import { componentSizes } from '@element-plus/constants'

import type { ComponentSize } from '@element-plus/constants'
import type { IconPropType, ObjectFit } from '@element-plus/utils'

export interface AvatarProps {
  /**
   * @description 头像尺寸。
   */
  size?: number | ComponentSize
  /**
   * @description 头像形状。
   */
  shape?: 'circle' | 'square'
  /**
   * @description 图标的展示类型，详见 icon 组件。
   */
  icon?: IconPropType
  /**
   * @description 图片头像的图片地址。
   */
  src?: string
  /**
   * @description 图片头像的原生属性 `alt`。
   */
  alt?: string
  /**
   * @description 图片头像的原生属性 srcset。
   */
  srcSet?: string
  /**
   * @description 设置图片头像中图片如何适应其容器。
   */
  fit?: ObjectFit
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const avatarPropDefs = buildProps({
  /**
   * @description 头像尺寸。
   */
  size: {
    type: [Number, String],
    values: componentSizes,
    validator: (val: unknown): val is number => isNumber(val),
  },
  /**
   * @description 头像形状。
   */
  shape: {
    type: String,
    values: ['circle', 'square'],
  },
  /**
   * @description 图标的展示类型，详见 icon 组件。
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description 图片头像的图片地址。
   */
  src: {
    type: String,
    default: '',
  },
  /**
   * @description 图片头像的原生属性 `alt`。
   */
  alt: String,
  /**
   * @description 图片头像的原生属性 srcset。
   */
  srcSet: String,
  /**
   * @description 设置图片头像中图片如何适应其容器。
   */
  fit: {
    type: definePropType<ObjectFit>(String),
    default: 'cover',
  },
} as const)

export const avatarEmits = {
  error: (evt: Event) => evt instanceof Event,
}
export type AvatarEmits = typeof avatarEmits
