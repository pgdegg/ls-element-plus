import { withInstall } from '@element-plus/utils'
import Affix from './src/affix.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElAffix: SFCWithInstall<typeof Affix> = withInstall(Affix)
export default ElAffix

export { affixEmits } from './src/affix'
export type { AffixProps, AffixEmits, AffixInstance } from './src/affix'
