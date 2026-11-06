import { withInstall } from '@element-plus/utils'
import ColorPickerPanel from './src/color-picker-panel.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElColorPickerPanel: SFCWithInstall<typeof ColorPickerPanel> =
  withInstall(ColorPickerPanel)
export default ElColorPickerPanel

export {
  colorPickerPanelEmits,
  ROOT_COMMON_COLOR_INJECTION_KEY,
  colorPickerPanelContextKey,
  ColorPickerPanelDefaultValueProps,
} from './src/color-picker-panel'
export type {
  ColorPickerPanelProps,
  ColorPickerPanelEmits,
  ColorPickerPanelInstance,
  ColorPickerPanelContext,
  CommonColorContext,
} from './src/color-picker-panel'

export { PredefineDefaultValueProps } from './src/props/predefine'

export {
  AlphaSliderDefaultValueProps,
  HueSliderDefaultValueProps,
} from './src/props/slider'

export { SvPanelDefaultValueProps } from './src/props/sv-panel'
