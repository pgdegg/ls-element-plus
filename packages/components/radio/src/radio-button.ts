import { buildProps } from '@element-plus/utils'
import { radioPropsBase } from './radio'

import type { ExtractPublicPropTypes } from 'vue'
import type { RadioPropsBase } from './radio'
import type RadioButton from './radio-button.vue'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RadioButtonProps extends RadioPropsBase {}

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `RadioButtonProps`。
 */
export const radioButtonProps = buildProps({
  ...radioPropsBase,
} as const)

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `RadioButtonProps`。
 */
export type RadioButtonPropsPublic = ExtractPublicPropTypes<
  typeof radioButtonProps
>
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
