import { withInstall } from '@element-plus/utils'
import Progress from './src/progress.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElProgress: SFCWithInstall<typeof Progress> = withInstall(Progress)
export default ElProgress

export type {
  ProgressColor,
  ProgressFn,
  ProgressProps,
  ProgressInstance,
} from './src/progress'
