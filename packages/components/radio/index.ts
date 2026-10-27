import { withInstall, withNoopInstall } from '@element-plus/utils'
import Radio from './src/radio.vue'
import RadioButton from './src/radio-button.vue'
import RadioGroup from './src/radio-group.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElRadio: SFCWithInstall<typeof Radio> & {
  RadioButton: typeof RadioButton
  RadioGroup: typeof RadioGroup
} = withInstall(Radio, {
  RadioButton,
  RadioGroup,
})
export default ElRadio
export const ElRadioGroup: SFCWithInstall<typeof RadioGroup> =
  withNoopInstall(RadioGroup)
export const ElRadioButton: SFCWithInstall<typeof RadioButton> =
  withNoopInstall(RadioButton)

export { radioEmits, radioPropsDefaults } from './src/radio'
export type {
  RadioPropsBase,
  RadioProps,
  RadioEmits,
  RadioInstance,
} from './src/radio'
export {
  radioDefaultProps,
  radioGroupEmits,
  radioGroupPropsDefaults,
} from './src/radio-group'
export type {
  radioOptionProp,
  radioOption,
  RadioGroupProps,
  RadioGroupEmits,
  RadioGroupInstance,
} from './src/radio-group'
export { radioButtonPropsDefaults } from './src/radio-button'
export type { RadioButtonProps, RadioButtonInstance } from './src/radio-button'
export * from './src/constants'
