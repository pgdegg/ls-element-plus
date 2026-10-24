import { buildProps } from '@element-plus/utils'
import { createModelToggleComposable } from '@element-plus/hooks'
import { popperArrowProps, popperProps } from '@element-plus/components/popper'
import { useTooltipContentProps } from './content'
import { useTooltipTriggerProps } from './trigger'

import type {
  PopperArrowProps,
  PopperProps,
} from '@element-plus/components/popper'
import type { ElTooltipContentProps } from './content'
import type { UseTooltipTriggerProps } from './trigger'
import type Tooltip from './tooltip.vue'
import type { ExtractPublicPropTypes } from 'vue'

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

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `UseTooltipProps`。
 */
export const useTooltipProps = buildProps({
  ...popperProps,
  ...useTooltipModelToggleProps,
  ...useTooltipContentProps,
  ...useTooltipTriggerProps,
  ...popperArrowProps,
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

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `UseTooltipProps`。
 */
export type ElTooltipProps = UseTooltipProps

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `UseTooltipProps`。
 */
export type ElTooltipPropsPublic = ExtractPublicPropTypes<
  typeof useTooltipProps
>

export type TooltipInstance = InstanceType<typeof Tooltip> & unknown
