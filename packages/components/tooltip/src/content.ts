import { buildProps, definePropType } from '@element-plus/utils'
import { popperContentPropsDefaults } from '@element-plus/components/popper'
import { popperContentPropDefs } from '@element-plus/components/popper/src/content'
import {
  useAriaProps,
  useDelayedTogglePropsDefaults,
} from '@element-plus/hooks'
import { delayedTogglePropDefs } from '@element-plus/hooks/use-delayed-toggle/index'

import type { AriaProps, UseDelayedToggleProps } from '@element-plus/hooks'
import type { PopperContentProps } from '@element-plus/components/popper'
import type TooltipContent from './content.vue'

export interface ElTooltipContentProps
  extends UseDelayedToggleProps, Omit<PopperContentProps, 'visible'> {
  /**
   * @description tooltip 内容挂载到哪个元素
   */
  appendTo?: string | HTMLElement
  /**
   * @description 显示内容，可被 `slot#content` 覆盖
   */
  content?: string
  /**
   * @description `content` 是否作为 HTML 字符串处理
   */
  rawContent?: boolean
  /**
   * @description tooltip 未激活且 `persistent` 为 `false` 时，popconfirm 将被销毁
   */
  persistent?: boolean
  // 因为 model toggle prop 是动态生成的
  // 因此 typescript 无法将其类型推导为：
  // [name]: { type: Boolean, default: null }
  // 因此我们需要再次声明以进行类型检查。
  /**
   * @description Tooltip 的可见性
   */
  visible?: boolean | null
  /**
   * @description 动画名称
   */
  transition?: string
  /**
   * @description tooltip 内容是否被 teleport，为 `true` 时将传送到 `append-to` 指定的位置
   */
  teleported?: boolean
  /**
   * @description Tooltip 是否禁用
   */
  disabled?: boolean
  ariaLabel?: AriaProps['ariaLabel']
}

export const useTooltipContentPropsDefaults = {
  ...useDelayedTogglePropsDefaults,
  ...popperContentPropsDefaults,
  content: '',
  visible: null,
  teleported: true,
} as const

/** @internal Runtime prop definitions; use the public props interface for types. */
export const tooltipContentPropDefs = buildProps({
  ...delayedTogglePropDefs,
  ...popperContentPropDefs,
  /**
   * @description tooltip 内容挂载到哪个元素
   */
  appendTo: {
    type: definePropType<string | HTMLElement>([String, Object]),
  },
  /**
   * @description 显示内容，可被 `slot#content` 覆盖
   */
  content: {
    type: String,
    default: '',
  },
  /**
   * @description `content` 是否作为 HTML 字符串处理
   */
  rawContent: Boolean,
  /**
   * @description tooltip 未激活且 `persistent` 为 `false` 时，popconfirm 将被销毁
   */
  persistent: Boolean,
  // 因为 model toggle prop 是动态生成的
  // 因此 typescript 无法将其类型推导为：
  // [name]: { type: Boolean, default: null }
  // 因此我们需要再次声明以进行类型检查。
  /**
   * @description Tooltip 的可见性
   */
  visible: {
    type: definePropType<boolean | null>(Boolean),
    default: null,
  },
  /**
   * @description 动画名称
   */
  transition: String,
  /**
   * @description tooltip 内容是否被 teleport，为 `true` 时将传送到 `append-to` 指定的位置
   */
  teleported: {
    type: Boolean,
    default: true,
  },
  /**
   * @description Tooltip 是否禁用
   */
  disabled: Boolean,
  ...useAriaProps(['ariaLabel']),
} as const)

export type TooltipContentInstance = InstanceType<typeof TooltipContent> &
  unknown
