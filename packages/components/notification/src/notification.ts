import { Close } from '@element-plus/icons-vue'
import { buildProps, definePropType, iconPropType } from '@element-plus/utils'

import type { AppContext, Ref, VNode } from 'vue'
import type { ClassValue, IconPropType } from '@element-plus/utils'
import type { ProgressProps } from '@element-plus/components/progress'
import type Notification from './notification.vue'

export const notificationTypes = [
  'primary',
  'success',
  'info',
  'warning',
  'error',
] as const

export type NotificationType = (typeof notificationTypes)[number] | ''

export type NotificationPosition =
  'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

/**
 * 进度条配置。`percentage`、`type`、`duration`、`indeterminate`
 * 和 `width` 不适用：进度条始终是倒计时驱动的线条。
 */
export type NotificationProgress = Omit<
  Partial<ProgressProps>,
  'percentage' | 'type' | 'duration' | 'indeterminate' | 'width'
>

export interface NotificationProps {
  /**
   * @description Notification 的自定义类名
   */
  customClass?: ClassValue
  /**
   * @description `message` 是否作为 HTML 字符串处理
   */
  dangerouslyUseHTMLString?: boolean
  /**
   * @description 关闭前的时长。设为 0 时不会自动关闭
   */
  duration?: number
  /**
   * @description 自定义图标组件，会被 `type` 覆盖
   */
  icon?: IconPropType
  /**
   * @description 通知的 dom id
   */
  id?: string
  /**
   * @description 描述文本
   */
  message?: string | VNode | (() => VNode)
  /**
   * @description 距屏幕顶部边缘的偏移量。同一时刻的每个 Notification 实例应具有相同偏移量
   */
  offset?: number
  /**
   * @description 点击通知时的回调函数
   */
  onClick?: () => void
  /**
   * @description 关闭时的回调函数
   */
  onClose: () => void
  /**
   * @description 自定义位置
   */
  position?: NotificationPosition
  /**
   * @description 是否显示关闭按钮
   */
  showClose?: boolean
  /**
   * @description 标题
   */
  title?: string
  /**
   * @description 通知类型
   */
  type?: NotificationType
  /**
   * @description 初始 zIndex
   */
  zIndex?: number
  /**
   * @description 自定义关闭图标，默认为 Close
   */
  closeIcon?: IconPropType
  /**
   * @description 表示自动关闭倒计时的进度条。设为 `true` 显示默认进度条，或传入对象自定义（`ElProgress` 的选项）
   */
  progress?: boolean | NotificationProgress
  /**
   * @description 悬停在通知上时是否暂停定时器
   */
  pauseOnHover?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const notificationPropDefs = buildProps({
  /**
   * @description Notification 的自定义类名
   */
  customClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: '',
  },
  /**
   * @description `message` 是否作为 HTML 字符串处理
   */
  dangerouslyUseHTMLString: Boolean,
  /**
   * @description 关闭前的时长。设为 0 时不会自动关闭
   */
  duration: {
    type: Number,
    default: 4500,
  },
  /**
   * @description 自定义图标组件，会被 `type` 覆盖
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description 通知的 dom id
   */
  id: {
    type: String,
    default: '',
  },
  /**
   * @description 描述文本
   */
  message: {
    type: definePropType<string | VNode | (() => VNode)>([
      String,
      Object,
      Function,
    ]),
    default: '',
  },
  /**
   * @description 距屏幕顶部边缘的偏移量。同一时刻的每个 Notification 实例应具有相同偏移量
   */
  offset: {
    type: Number,
    default: 0,
  },
  /**
   * @description 点击通知时的回调函数
   */
  onClick: {
    type: definePropType<() => void>(Function),
    default: () => undefined,
  },
  /**
   * @description 关闭时的回调函数
   */
  onClose: {
    type: definePropType<() => void>(Function),
    required: true,
  },
  /**
   * @description 自定义位置
   */
  position: {
    type: String,
    values: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    default: 'top-right',
  },
  /**
   * @description 是否显示关闭按钮
   */
  showClose: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 通知类型
   */
  type: {
    type: String,
    values: [...notificationTypes, ''],
    default: '',
  },
  /**
   * @description 初始 zIndex
   */
  zIndex: Number,
  /**
   * @description 自定义关闭图标，默认为 Close
   */
  closeIcon: {
    type: iconPropType,
    default: Close,
  },
  /**
   * @description 表示自动关闭倒计时的进度条。设为 `true` 显示默认进度条，或传入对象自定义（`ElProgress` 的选项）
   */
  progress: {
    type: definePropType<boolean | NotificationProgress>([Boolean, Object]),
    default: false,
  },
  /**
   * @description 悬停在通知上时是否暂停定时器
   */
  pauseOnHover: {
    type: Boolean,
    default: true,
  },
} as const)

export const notificationEmits = {
  destroy: () => true,
}
export type NotificationEmits = typeof notificationEmits

export type NotificationInstance = InstanceType<typeof Notification> & unknown

export interface NotificationExposed {
  /** @description 关闭通知 */
  close: () => void
  visible: Ref<boolean>
}

export type NotificationOptions = Omit<NotificationProps, 'id' | 'onClose'> & {
  /**
   * @description 设置通知的根元素，默认为 `document.body`
   */
  appendTo?: HTMLElement | string
  /**
   * @description 关闭时的回调函数
   */
  onClose?(vm: VNode): void
}
export type NotificationOptionsTyped = Omit<NotificationOptions, 'type'>

export interface NotificationHandle {
  close: () => void
}

export type NotificationParams = Partial<NotificationOptions> | string | VNode
export type NotificationParamsTyped =
  Partial<NotificationOptionsTyped> | string | VNode

export interface NotifyFn {
  (
    options?: NotificationParams,
    appContext?: null | AppContext
  ): NotificationHandle
  closeAll(): void
  updateOffsets(position?: NotificationOptions['position']): void
  _context: AppContext | null
}

export type NotifyTypedFn = (
  options?: NotificationParamsTyped,
  appContext?: null | AppContext
) => NotificationHandle

export interface Notify extends NotifyFn {
  primary: NotifyTypedFn
  success: NotifyTypedFn
  warning: NotifyTypedFn
  error: NotifyTypedFn
  info: NotifyTypedFn
}

export interface NotificationQueueItem {
  vm: VNode
}

export type NotificationQueue = NotificationQueueItem[]
