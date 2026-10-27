import { withInstall } from '@element-plus/utils'
import InputNumber from './src/input-number.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElInputNumber: SFCWithInstall<typeof InputNumber> =
  withInstall(InputNumber)

export default ElInputNumber
export { inputNumberEmits } from './src/input-number'
export type {
  InputNumberProps,
  InputNumberEmits,
  InputNumberInstance,
} from './src/input-number'
