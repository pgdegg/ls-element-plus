import { buildProps } from '@element-plus/utils'
import { radioBasePropDefs } from './radio'

import type { RadioPropsBase } from './radio'
import type RadioButton from './radio-button.vue'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RadioButtonProps extends RadioPropsBase {}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const radioButtonPropDefs = buildProps({
  ...radioBasePropDefs,
} as const)
export type RadioButtonInstance = InstanceType<typeof RadioButton> & unknown

/**
 * @description RadioButtonProps 的默认值
 */
export const radioButtonPropsDefaults = {
  modelValue: undefined,
  disabled: undefined,
  label: undefined,
  value: undefined,
  name: undefined,
} as const
