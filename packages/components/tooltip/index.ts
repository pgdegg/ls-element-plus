import { withInstall } from '@element-plus/utils'
import Tooltip from './src/tooltip.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElTooltip: SFCWithInstall<typeof Tooltip> = withInstall(Tooltip)
export { tooltipEmits } from './src/tooltip'
export type { UseTooltipProps, TooltipInstance } from './src/tooltip'
export { useTooltipTriggerPropsDefaults } from './src/trigger'
export type { TooltipTriggerType, UseTooltipTriggerProps } from './src/trigger'
export { useTooltipContentPropsDefaults } from './src/content'
export type {
  ElTooltipContentProps,
  TooltipContentInstance,
} from './src/content'
export * from './src/constants'
export {
  useTooltipModelToggle,
  useTooltipModelToggleEmits,
  useTooltipModelToggleProps,
} from './src/tooltip'
export default ElTooltip
