import { withInstall } from '@element-plus/utils'
import Popover from './src/popover.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElPopover: SFCWithInstall<typeof Popover> = withInstall(Popover)
export default ElPopover

export { popoverEmits, popoverPropsDefaults } from './src/popover'
export type { PopoverProps, PopoverEmits, PopoverInstance } from './src/popover'
