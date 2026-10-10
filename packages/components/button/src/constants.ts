import type { InjectionKey } from 'vue'
import type { ButtonProps } from './button'

export interface ButtonGroupContext {
  disabled?: boolean
  plain?: boolean
  text?: boolean
  link?: boolean
  size?: ButtonProps['size']
  type?: ButtonProps['type']
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol(
  'buttonGroupContextKey'
)
