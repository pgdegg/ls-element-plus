import { withInstall } from '@element-plus/utils'
import CascaderPanel from './src/index.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElCascaderPanel: SFCWithInstall<typeof CascaderPanel> =
  withInstall(CascaderPanel)

export default ElCascaderPanel
export * from './src/types'
export {
  CASCADER_PANEL_ITEM_SIZE,
  CASCADER_PANEL_HEIGHT,
  CommonProps,
  DefaultProps,
  cascaderPanelEmits,
  useCascaderConfig,
} from './src/config'
export type { CascaderCommonProps, CascaderPanelProps } from './src/config'
export * from './src/instance'
