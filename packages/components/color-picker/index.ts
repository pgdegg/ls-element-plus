import { withInstall } from '@element-plus/utils'
import ColorPicker from './src/color-picker.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElColorPicker: SFCWithInstall<typeof ColorPicker> =
  withInstall(ColorPicker)
export default ElColorPicker

export { colorPickerEmits, colorPickerPropsDefaults } from './src/color-picker'
export type {
  ColorPickerProps,
  ColorPickerEmits,
  ColorPickerInstance,
} from './src/color-picker'
