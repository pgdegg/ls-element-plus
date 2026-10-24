import { buttonTypes } from '@element-plus/components/button'

import type { AppContext, Component, VNode } from 'vue'
import type { ComponentSize } from '@element-plus/constants'
import type { InputType } from '@element-plus/components/input/src/input'
import type { CSSProperties } from '@element-plus/utils'

type MessageType = '' | 'primary' | 'success' | 'warning' | 'info' | 'error'
type MessageBoxButtonType = (typeof buttonTypes)[number]

export type Action = 'confirm' | 'close' | 'cancel'
export type MessageBoxType = '' | 'prompt' | 'alert' | 'confirm'
export type MessageBoxData = MessageBoxInputData & Action
export interface MessageBoxInputData {
  value: string
  action: Action
}

export type MessageBoxInputValidator =
  ((value: string) => boolean | string) | undefined
export type CloseFn = () => void
export interface MessageBoxActionHandlers {
  confirm: CloseFn
  cancel: CloseFn
  close: CloseFn
}

export declare interface MessageBoxState {
  autofocus: boolean
  title: string | undefined
  message: string
  type: MessageType
  icon: string | Component
  closeIcon: string | Component
  customClass: string // todo：使用 ClassValue，TS 错误：ts-plugin(2589)
  customStyle: CSSProperties
  showInput: boolean
  inputValue: string
  inputPlaceholder: string
  inputType: InputType
  inputPattern: RegExp | null
  inputValidator: MessageBoxInputValidator
  inputErrorMessage: string
  showConfirmButton: boolean
  showCancelButton: boolean
  action: Action
  dangerouslyUseHTMLString: boolean
  confirmButtonText: string
  cancelButtonText: string
  confirmButtonType: MessageBoxButtonType
  cancelButtonType: MessageBoxButtonType
  confirmButtonLoading: boolean
  cancelButtonLoading: boolean
  confirmButtonLoadingIcon: string | Component
  cancelButtonLoadingIcon: string | Component
  confirmButtonClass: string
  confirmButtonDisabled: boolean
  cancelButtonClass: string
  editorErrorMessage: string

  beforeClose:
    | null
    | ((action: Action, instance: MessageBoxState, done: () => void) => void)
  callback: null | Callback
  distinguishCancelAndClose: boolean
  modalFade: boolean
  modalClass: string
  // 参见：https://github.com/ElemeFE/element/commit/2999279ae34ef10c373ca795c87b020ed6753eed
  // 目前没有此状态似乎也可以。
  // isOnComposition: false, // temporary remove
  validateError: boolean
  zIndex: number
}

export type Callback =
  ((value: string, action: Action) => any) | ((action: Action) => any)

/** MessageBox 使用的选项 */
export interface ElMessageBoxOptions {
  /** 解析已知的取消操作，而不是拒绝 promise。 */
  resolveOnCancel?: boolean
  /**
   * 打开 message-box 时自动聚焦
   */
  autofocus?: boolean

  /** MessageBox 关闭前的回调，会阻止 MessageBox 关闭 */
  beforeClose?: (
    action: Action,
    instance: MessageBoxState,
    done: () => void
  ) => void

  /** MessageBox 的自定义类名 */
  customClass?: string

  /** MessageBox 的自定义内联样式 */
  customStyle?: CSSProperties

  /** 是否显示遮罩 */
  modal?: boolean

  /** MessageBox 的 modal 类名 */
  modalClass?: string

  /** 不使用 Promise 时的 MessageBox 关闭回调 */
  callback?: Callback

  /** 取消按钮的文本内容 */
  cancelButtonText?: string

  /** 确认按钮的文本内容 */
  confirmButtonText?: string

  /** 取消按钮的类型 */
  cancelButtonType?: MessageBoxButtonType

  /** 确认按钮的类型 */
  confirmButtonType?: MessageBoxButtonType

  /** 取消按钮的加载图标内容 */
  cancelButtonLoadingIcon?: string | Component

  /** 确认按钮的加载图标内容 */
  confirmButtonLoadingIcon?: string | Component

  /** 取消按钮的自定义类名 */
  cancelButtonClass?: string

  /** 确认按钮的自定义类名 */
  confirmButtonClass?: string

  /** 内容是否居中对齐 */
  center?: boolean

  /** MessageBox 是否可拖拽 */
  draggable?: boolean

  /** 可拖拽的 MessageBox 可能溢出视口 */
  overflow?: boolean

  /** MessageBox 的内容 */
  message?: string | VNode | ((params: MessageBoxActionHandlers) => VNode)

  /** MessageBox 的标题 */
  title?: string | ElMessageBoxOptions

  /** 消息类型，用于图标显示 */
  type?: MessageType

  /** 消息框类型 */
  boxType?: MessageBoxType

  /** 自定义图标组件 */
  icon?: string | Component

  /** 自定义关闭图标组件 */
  closeIcon?: string | Component

  /** 消息是否作为 HTML 字符串处理 */
  dangerouslyUseHTMLString?: boolean

  /** 是否区分取消与关闭 */
  distinguishCancelAndClose?: boolean

  /** MessageBox 弹出时是否锁定 body 滚动 */
  lockScroll?: boolean

  /** 是否显示取消按钮 */
  showCancelButton?: boolean

  /** 是否显示确认按钮 */
  showConfirmButton?: boolean

  /** 是否显示关闭按钮 */
  showClose?: boolean

  /** 是否使用圆形按钮 */
  roundButton?: boolean

  /** 是否可通过点击遮罩关闭 MessageBox */
  closeOnClickModal?: boolean

  /** 是否可通过按 ESC 关闭 MessageBox */
  closeOnPressEscape?: boolean

  /** hash 变化时是否关闭 MessageBox */
  closeOnHashChange?: boolean

  /** 是否显示输入框 */
  showInput?: boolean

  /** 输入框的 placeholder */
  inputPlaceholder?: string

  /** 输入框的初始值 */
  inputValue?: string

  /** 输入框的正则表达式 */
  inputPattern?: RegExp

  /** 输入框类型，详见 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) */
  inputType?: InputType

  /** 输入框的校验函数。应返回布尔值或字符串；返回字符串时将赋值给 inputErrorMessage */
  inputValidator?: MessageBoxInputValidator

  /** 校验失败时的错误信息 */
  inputErrorMessage?: string

  /** 确认按钮和取消按钮的自定义尺寸 */
  buttonSize?: ComponentSize

  /** 消息框追加到的自定义元素 */
  appendTo?: HTMLElement | string
}

export type ElMessageBoxShortcutMethod = ((
  message: ElMessageBoxOptions['message'],
  options?: ElMessageBoxOptions,
  appContext?: AppContext | null
) => Promise<MessageBoxData>) &
  ((
    message: ElMessageBoxOptions['message'],
    title: ElMessageBoxOptions['title'],
    options?: ElMessageBoxOptions,
    appContext?: AppContext | null
  ) => Promise<MessageBoxData>)

export interface IElMessageBox {
  _context: AppContext | null

  /** 显示消息框 */
  // (message: string, title?: string, type?: string): Promise<MessageBoxData>

  /** 显示消息框 */
  (
    options: ElMessageBoxOptions,
    appContext?: AppContext | null
  ): Promise<MessageBoxData>

  /** 显示 alert 消息框 */
  alert: ElMessageBoxShortcutMethod

  /** 显示 confirm 消息框 */
  confirm: ElMessageBoxShortcutMethod

  /** 设置 confirm 调用使用的默认值。每次调用的选项优先。 */
  setConfirmDefaults: (options: Partial<ElMessageBoxOptions>) => void

  /** 显示 prompt 消息框 */
  prompt: ElMessageBoxShortcutMethod

  /** 关闭当前消息框 */
  close: CloseFn
}
