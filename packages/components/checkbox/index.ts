import { withInstall, withNoopInstall } from '@element-plus/utils'
import Checkbox from './src/checkbox.vue'
import CheckboxButton from './src/checkbox-button.vue'
import CheckboxGroup from './src/checkbox-group.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElCheckbox: SFCWithInstall<typeof Checkbox> & {
  CheckboxButton: typeof CheckboxButton
  CheckboxGroup: typeof CheckboxGroup
} = withInstall(Checkbox, {
  CheckboxButton,
  CheckboxGroup,
})
export default ElCheckbox

export const ElCheckboxButton: SFCWithInstall<typeof CheckboxButton> =
  withNoopInstall(CheckboxButton)
export const ElCheckboxGroup: SFCWithInstall<typeof CheckboxGroup> =
  withNoopInstall(CheckboxGroup)

export { checkboxGroupEmits, checkboxDefaultProps } from './src/checkbox-group'
export type {
  CheckboxGroupValueType,
  CheckboxGroupProps,
  CheckboxGroupEmits,
  CheckboxGroupInstance,
  CheckboxOption,
} from './src/checkbox-group'
export { checkboxEmits, checkboxPropsDefaults } from './src/checkbox'
export type {
  CheckboxValueType,
  CheckboxProps,
  CheckboxEmits,
  CheckboxInstance,
} from './src/checkbox'
export * from './src/constants'
