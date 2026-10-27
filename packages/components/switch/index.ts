import { withInstall } from '@element-plus/utils'
import Switch from './src/switch.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElSwitch: SFCWithInstall<typeof Switch> = withInstall(Switch)
export default ElSwitch

export { switchEmits } from './src/switch'
export type { SwitchProps, SwitchEmits, SwitchInstance } from './src/switch'
