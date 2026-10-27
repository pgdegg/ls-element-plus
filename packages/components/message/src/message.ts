import {
  buildProps,
  definePropType,
  iconPropType,
  isClient,
  mutable,
} from '@element-plus/utils'

import type { AppContext, VNode } from 'vue'
import type { ClassValue, IconPropType, Mutable } from '@element-plus/utils'
import type MessageConstructor from './message.vue'

export interface MessageProps {
  /**
   * @description Message 的自定义类名
   */
  customClass?: ClassValue
  /**
   * @description `message` 是否作为 HTML 字符串处理
   */
  dangerouslyUseHTMLString?: boolean
  /**
   * @description 显示时长（毫秒）。设为 0 时不会自动关闭
   */
  duration?: number
  /**
   * @description 自定义图标组件，覆盖 `type`
   */
  icon?: IconPropType
  /**
   * @description 消息的 dom id
   */
  id?: string
  /**
   * @description 消息文本
   */
  message?: string | VNode | (() => VNode)
  /**
   * @description 关闭时的回调函数，以消息实例作为参数
   */
  onClose?: () => void
  /**
   * @description 是否显示关闭按钮
   */
  showClose?: boolean
  /**
   * @description 消息类型
   */
  type?: MessageType
  /**
   * @description 消息是否为朴素样式
   */
  plain?: boolean
  /**
   * @description 设置距视口顶部的距离
   */
  offset?: number
  /**
   * @description 消息放置位置
   */
  placement?: MessagePlacement
  /**
   * @description 消息元素的 zIndex 值
   */
  zIndex?: number
  /**
   * @description 合并内容相同的消息，不支持 VNode 类型消息
   */
  grouping?: boolean
  /**
   * @description 重复次数，类似 badge；配合 `grouping` 使用时作为初始数字
   */
  repeatNum?: number
}

export const messageTypes = [
  'primary',
  'success',
  'info',
  'warning',
  'error',
] as const

export const messagePlacement = [
  'top',
  'top-left',
  'top-right',
  'bottom',
  'bottom-left',
  'bottom-right',
] as const

export const MESSAGE_DEFAULT_PLACEMENT = 'top'

export type MessageType = (typeof messageTypes)[number]
export type MessagePlacement = (typeof messagePlacement)[number]

export interface MessageConfigContext {
  max?: number
  grouping?: boolean
  duration?: number
  offset?: number
  showClose?: boolean
  plain?: boolean
  placement?: string
}

export const messageDefaults = mutable({
  customClass: '',
  dangerouslyUseHTMLString: false,
  duration: 3000,
  icon: undefined,
  id: '',
  message: '',
  onClose: undefined,
  showClose: false,
  type: 'info',
  plain: false,
  offset: 16,
  placement: undefined,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? document.body : (undefined as never),
} as const)

/** @internal Runtime prop definitions; use the public props interface for types. */
export const messagePropDefs = buildProps({
  /**
   * @description Message 的自定义类名
   */
  customClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: messageDefaults.customClass,
  },
  /**
   * @description `message` 是否作为 HTML 字符串处理
   */
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString,
  },
  /**
   * @description 显示时长（毫秒）。设为 0 时不会自动关闭
   */
  duration: {
    type: Number,
    default: messageDefaults.duration,
  },
  /**
   * @description 自定义图标组件，覆盖 `type`
   */
  icon: {
    type: iconPropType,
    default: messageDefaults.icon,
  },
  /**
   * @description 消息的 dom id
   */
  id: {
    type: String,
    default: messageDefaults.id,
  },
  /**
   * @description 消息文本
   */
  message: {
    type: definePropType<string | VNode | (() => VNode)>([
      String,
      Object,
      Function,
    ]),
    default: messageDefaults.message,
  },
  /**
   * @description 关闭时的回调函数，以消息实例作为参数
   */
  onClose: {
    type: definePropType<() => void>(Function),
    default: messageDefaults.onClose,
  },
  /**
   * @description 是否显示关闭按钮
   */
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose,
  },
  /**
   * @description 消息类型
   */
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type,
  },
  /**
   * @description 消息是否为朴素样式
   */
  plain: {
    type: Boolean,
    default: messageDefaults.plain,
  },
  /**
   * @description 设置距视口顶部的距离
   */
  offset: {
    type: Number,
    default: messageDefaults.offset,
  },
  /**
   * @description 消息放置位置
   */
  placement: {
    type: String,
    values: messagePlacement,
    default: messageDefaults.placement,
  },
  /**
   * @description 消息元素的 zIndex 值
   */
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex,
  },
  /**
   * @description 合并内容相同的消息，不支持 VNode 类型消息
   */
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping,
  },
  /**
   * @description 重复次数，类似 badge；配合 `grouping` 使用时作为初始数字
   */
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum,
  },
} as const)

export const messageEmits = {
  destroy: () => true,
}
export type MessageEmits = typeof messageEmits

export type MessageInstance = InstanceType<typeof MessageConstructor> & unknown

export type MessageOptions = Partial<
  Mutable<
    Omit<MessageProps, 'id'> & {
      appendTo?: HTMLElement | string
    }
  >
>
export type MessageParams = MessageOptions | MessageOptions['message']
export type MessageParamsNormalized = Omit<MessageProps, 'id'> & {
  /**
   * @description 设置消息的根元素，默认为 `document.body`
   */
  appendTo: HTMLElement
}
export type MessageOptionsWithType = Omit<MessageOptions, 'type'>
export type MessageParamsWithType =
  MessageOptionsWithType | MessageOptions['message']

export interface MessageHandler {
  /**
   * @description 关闭 Message
   */
  close: () => void
}

export type MessageFn = {
  (options?: MessageParams, appContext?: null | AppContext): MessageHandler
  closeAll(type?: MessageType): void
  closeAllByPlacement(position: MessagePlacement): void
}
export type MessageTypedFn = (
  options?: MessageParamsWithType,
  appContext?: null | AppContext
) => MessageHandler

export type Message = MessageFn & {
  primary: MessageTypedFn
  success: MessageTypedFn
  warning: MessageTypedFn
  info: MessageTypedFn
  error: MessageTypedFn
}
