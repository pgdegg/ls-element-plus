import { definePropType } from '@element-plus/utils'
import { ButtonDefaultValueProps } from './button'

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

/** Runtime prop definitions; use the public props interface for types. */
export const ButtonGroupDefaultValueProps = {
  disabled: { type: Boolean, default: undefined },
  plain: { type: Boolean, default: undefined },
  text: { type: Boolean, default: undefined },
  link: { type: Boolean, default: undefined },
  /**
   * @description 控制该 button-group 中按钮的尺寸
   */
  size: ButtonDefaultValueProps.size,
  /**
   * @description 控制该 button-group 中按钮的类型
   */
  type: ButtonDefaultValueProps.type,
  /**
   * @description 展示方向
   */
  direction: {
    type: definePropType<'horizontal' | 'vertical'>(String),
    values: ['horizontal', 'vertical'],
    default: 'horizontal',
  },
} as const
