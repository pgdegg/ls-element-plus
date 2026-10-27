import { withInstall } from '@element-plus/utils'
import Alert from './src/alert.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElAlert: SFCWithInstall<typeof Alert> = withInstall(Alert)
export default ElAlert

export { alertEffects, alertEmits } from './src/alert'
export type { AlertProps, AlertEmits } from './src/alert'
export type { AlertInstance } from './src/instance'
