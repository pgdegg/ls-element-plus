import { buildProps } from '@element-plus/utils'
import { createModelToggleComposable } from '@element-plus/hooks'
import { popperArrowPropDefs } from '@element-plus/components/popper/src/arrow'
import { popperPropDefs } from '@element-plus/components/popper/src/popper'
import { tooltipContentPropDefs } from './content'
import { tooltipTriggerPropDefs } from './trigger'

import type {
  PopperArrowProps,
  PopperProps,
} from '@element-plus/components/popper'
import type { ElTooltipContentProps } from './content'
import type { UseTooltipTriggerProps } from './trigger'
import type Tooltip from './tooltip.vue'

export const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle,
} = createModelToggleComposable('visible' as const)

export interface UseTooltipProps
  extends
    PopperProps,
    ElTooltipContentProps,
    UseTooltipTriggerProps,
    PopperArrowProps {
  /**
   * @description tooltip 内容是否带有箭头
   */
  showArrow?: boolean
  'onUpdate:visible'?: (value: boolean) => void
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const tooltipPropDefs = buildProps({
  ...popperPropDefs,
  ...useTooltipModelToggleProps,
  ...tooltipContentPropDefs,
  ...tooltipTriggerPropDefs,
  ...popperArrowPropDefs,
  /**
   * @description tooltip 内容是否带有箭头
   */
  showArrow: {
    type: Boolean,
    default: true,
  },
})

export const tooltipEmits = [
  ...useTooltipModelToggleEmits,
  'before-show',
  'before-hide',
  'show',
  'hide',
  'open',
  'close',
] as const

export type TooltipInstance = InstanceType<typeof Tooltip> & unknown
