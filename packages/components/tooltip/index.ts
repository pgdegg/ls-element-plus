import { withInstall } from '@element-plus/utils'
import Tooltip from './src/tooltip.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElTooltip: SFCWithInstall<typeof Tooltip> = withInstall(Tooltip)
export {
  tooltipEmits,
  useTooltipModelToggle,
  useTooltipModelToggleEmits,
  useTooltipModelToggleProps,
  TooltipDefaultValueProps,
} from './src/tooltip'
export type { UseTooltipProps, TooltipInstance } from './src/tooltip'

export type { TooltipTriggerType, UseTooltipTriggerProps } from './src/trigger'

export type {
  ElTooltipContentProps,
  TooltipContentInstance,
} from './src/content'
export * from './src/constants'

export default ElTooltip

export { TooltipContentDefaultValueProps } from './src/content'

export { TooltipTriggerDefaultValueProps } from './src/trigger'
