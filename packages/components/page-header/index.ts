import { withInstall } from '@element-plus/utils'
import PageHeader from './src/page-header.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElPageHeader: SFCWithInstall<typeof PageHeader> =
  withInstall(PageHeader)
export default ElPageHeader

export { pageHeaderEmits } from './src/page-header'
export type {
  PageHeaderProps,
  PageHeaderEmits,
  PageHeaderInstance,
} from './src/page-header'
