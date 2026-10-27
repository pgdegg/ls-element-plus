import { withInstall } from '@element-plus/utils'
import TimeSelect from './src/time-select.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElTimeSelect: SFCWithInstall<typeof TimeSelect> =
  withInstall(TimeSelect)
export default ElTimeSelect

export { DEFAULT_START, DEFAULT_END, DEFAULT_STEP } from './src/time-select'
export type { TimeSelectProps, TimeSelectInstance } from './src/time-select'
