import { withInstall } from '@element-plus/utils'
import Select from './src/select.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElSelectV2: SFCWithInstall<typeof Select> = withInstall(Select)
export default ElSelectV2

export * from './src/token'

export {
  SelectV2DefaultValueProps,
  OptionV2DefaultValueProps,
} from './src/defaults'

export { SelectV2GroupItemDefaultValueProps } from './src/group-item-props'
