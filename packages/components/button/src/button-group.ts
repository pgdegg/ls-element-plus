import { definePropType } from '@element-plus/utils'
import { buttonProps } from './button'

import type { ExtractPublicPropTypes } from 'vue'
import type { ButtonProps } from './button'

export interface ButtonGroupProps {
  /** @description 继承的 disabled 状态 */
  disabled?: boolean
  /** @description 继承的按钮外观 */
  plain?: boolean
  text?: boolean
  link?: boolean
  /**
   * @description 控制该 button-group 中按钮的尺寸
   */
  size?: ButtonProps['size']
  /**
   * @description 控制该 button-group 中按钮的类型
   */
  type?: ButtonProps['type']
  /**
   * @description 展示方向
   */
  direction?: 'horizontal' | 'vertical'
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `ButtonGroupProps`
 */
export const buttonGroupProps = {
  disabled: { type: Boolean, default: undefined },
  plain: { type: Boolean, default: undefined },
  text: { type: Boolean, default: undefined },
  link: { type: Boolean, default: undefined },
  /**
   * @description 控制该 button-group 中按钮的尺寸
   */
  size: buttonProps.size,
  /**
   * @description 控制该 button-group 中按钮的类型
   */
  type: buttonProps.type,
  /**
   * @description 展示方向
   */
  direction: {
    type: definePropType<'horizontal' | 'vertical'>(String),
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
} as const

/**
 * @deprecated 自 3.0.0 后移除，请使用 `ButtonGroupProps`
 */
export type ButtonGroupPropsPublic = ExtractPublicPropTypes<
  typeof buttonGroupProps
>
