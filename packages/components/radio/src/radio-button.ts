import { buildProps } from '@element-plus/utils'
import { RadioBaseDefaultValueProps } from './radio'

import type { RadioPropsBase } from './radio'
import type RadioButton from './radio-button.vue'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RadioButtonProps extends RadioPropsBase {}

/** Runtime prop definitions; use the public props interface for types. */
export const RadioButtonDefaultValueProps = buildProps({
  ...RadioBaseDefaultValueProps,
} as const)
export type RadioButtonInstance = InstanceType<typeof RadioButton> & unknown
