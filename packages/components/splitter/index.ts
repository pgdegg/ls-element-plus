import { withInstall, withNoopInstall } from '@element-plus/utils'
import Splitter from './src/splitter.vue'
import SplitPanel from './src/split-panel.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElSplitter: SFCWithInstall<typeof Splitter> & {
  SplitPanel: typeof SplitPanel
} = withInstall(Splitter, {
  SplitPanel,
})
export default ElSplitter

export const ElSplitterPanel: SFCWithInstall<typeof SplitPanel> =
  withNoopInstall(SplitPanel)

export { splitterEmits } from './src/splitter'
export type {
  SplitterProps,
  SplitterInstance,
  SplitterEmits,
} from './src/splitter'
export { splitterPanelEmits } from './src/split-panel'
export type {
  SplitterPanelProps,
  SplitterPanelInstance,
  SplitterPanelEmits,
} from './src/split-panel'
