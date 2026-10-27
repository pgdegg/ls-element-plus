import { buttonTypes } from '@element-plus/components/button'
import { QuestionFilled } from '@element-plus/icons-vue'
import { buildProps, iconPropType } from '@element-plus/utils'
import { tooltipContentPropDefs } from '@element-plus/components/tooltip/src/content'
import { tooltipTriggerPropDefs } from '@element-plus/components/tooltip/src/trigger'

import type { ButtonType } from '@element-plus/components/button'
import type {
  ElTooltipContentProps,
  UseTooltipTriggerProps,
} from '@element-plus/components/tooltip'
import type { IconPropType } from '@element-plus/utils'
import type Popconfirm from './popconfirm.vue'

export interface PopconfirmProps {
  /**
   * @description 标题
   */
  title?: string
  /**
   * @description 确认按钮文字
   */
  confirmButtonText?: string
  /**
   * @description 取消按钮文字
   */
  cancelButtonText?: string
  /**
   * @description 确认按钮类型
   */
  confirmButtonType?: ButtonType
  /**
   * @description 取消按钮类型
   */
  cancelButtonType?: ButtonType
  /**
   * @description 图标组件
   */
  icon?: IconPropType
  /**
   * @description 图标颜色
   */
  iconColor?: string
  /**
   * @description 是否隐藏图标
   */
  hideIcon?: boolean
  /**
   * @description 消失延迟时间，单位为毫秒
   */
  hideAfter?: number
  /**
   * @description Tooltip 主题，内置主题：`dark` / `light`
   */
  effect?: ElTooltipContentProps['effect']
  /**
   * @description popconfirm 是否被 teleport 到 body
   */
  teleported?: ElTooltipContentProps['teleported']
  /**
   * @description 当 popconfirm 不处于激活状态且 `persistent` 为 `false` 时，popconfirm 将被销毁
   */
  persistent?: ElTooltipContentProps['persistent']
  /**
   * @description popconfirm 宽度，最小宽度 150px
   */
  width?: string | number
  /**
   * @description 是否启用虚拟触发
   */
  virtualTriggering?: UseTooltipTriggerProps['virtualTriggering']
  /**
   * @description popper 所附着的参考元素
   */
  virtualRef?: UseTooltipTriggerProps['virtualRef']
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const popconfirmPropDefs = buildProps({
  /**
   * @description 标题
   */
  title: String,
  /**
   * @description 确认按钮文字
   */
  confirmButtonText: String,
  /**
   * @description 取消按钮文字
   */
  cancelButtonText: String,
  /**
   * @description 确认按钮类型
   */
  confirmButtonType: {
    type: String,
    values: buttonTypes,
    default: 'primary',
  },
  /**
   * @description 取消按钮类型
   */
  cancelButtonType: {
    type: String,
    values: buttonTypes,
    default: undefined,
  },
  /**
   * @description 图标组件
   */
  icon: {
    type: iconPropType,
    default: () => QuestionFilled,
  },
  /**
   * @description 图标颜色
   */
  iconColor: {
    type: String,
    default: '#f90',
  },
  /**
   * @description 是否隐藏图标
   */
  hideIcon: Boolean,
  /**
   * @description 消失延迟时间，单位为毫秒
   */
  hideAfter: {
    type: Number,
    default: 200,
  },
  /**
   * @description Tooltip 主题，内置主题：`dark` / `light`
   */
  effect: {
    ...tooltipContentPropDefs.effect,
    default: 'light',
  },
  /**
   * @description popconfirm 是否被 teleport 到 body
   */
  teleported: tooltipContentPropDefs.teleported,
  /**
   * @description 当 popconfirm 不处于激活状态且 `persistent` 为 `false` 时，popconfirm 将被销毁
   */
  persistent: tooltipContentPropDefs.persistent,
  /**
   * @description popconfirm 宽度，最小宽度 150px
   */
  width: {
    type: [String, Number],
    default: 150,
  },
  virtualTriggering: tooltipTriggerPropDefs.virtualTriggering,
  virtualRef: tooltipTriggerPropDefs.virtualRef,
} as const)

export const popconfirmEmits = {
  /**
   * @description 点击确认按钮时触发
   */
  confirm: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * @description 点击取消按钮时触发
   */
  cancel: (e: MouseEvent) => e instanceof MouseEvent,
}

export type PopconfirmEmits = typeof popconfirmEmits

export type PopconfirmInstance = InstanceType<typeof Popconfirm> & unknown
