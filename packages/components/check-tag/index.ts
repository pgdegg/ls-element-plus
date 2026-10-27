import { withInstall } from '@element-plus/utils'
import CheckTag from './src/check-tag.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElCheckTag: SFCWithInstall<typeof CheckTag> = withInstall(CheckTag)
export default ElCheckTag

export { checkTagEmits } from './src/check-tag'
export type {
  CheckTagProps,
  CheckTagEmits,
  CheckTagInstance,
} from './src/check-tag'
