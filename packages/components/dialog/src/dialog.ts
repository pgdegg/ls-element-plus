import { buildProps, definePropType, isBoolean } from '@element-plus/utils'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'
import {
  dialogContentPropDefs,
  dialogContentPropsDefaults,
} from './dialog-content'

import type { InjectionKey, TransitionProps } from 'vue'
import type { ClassValue } from '@element-plus/utils'
import type { DialogContentProps } from './dialog-content'
import type Dialog from './dialog.vue'

type DoneFn = (cancel?: boolean) => void

export type DialogBeforeCloseFn = (done: DoneFn) => void

export type DialogTransition = string | TransitionProps

/**
 * @description dialog 组件的 props
 */
export interface DialogProps extends DialogContentProps {
  /** 对话框主体的高度。 */
  height?: string | number
  /** 窗口尺寸变化后重置拖拽位置。 */
  resetOnResize?: boolean
  /**
   * @description 是否将 Dialog 自身追加到 body。嵌套 Dialog 应将此属性设为 `true`
   */
  appendToBody?: boolean
  /**
   * @description Dialog 追加到哪个元素
   */
  appendTo?: string | HTMLElement
  /**
   * @description Dialog 关闭前的回调，会阻止 Dialog 关闭，使用 done 关闭对话框
   */
  beforeClose?: DialogBeforeCloseFn
  /**
   * @description 关闭时销毁 Dialog 中的元素
   */
  destroyOnClose?: boolean
  /**
   * @description 是否可通过点击遮罩关闭 Dialog
   */
  closeOnClickModal?: boolean
  /**
   * @description 是否可通过按 ESC 关闭 Dialog
   */
  closeOnPressEscape?: boolean
  /**
   * @description Dialog 显示时是否禁用 body 滚动
   */
  lockScroll?: boolean
  /**
   * @description 是否显示遮罩
   */
  modal?: boolean
  /**
   * @description 遮罩是否可穿透
   */
  modalPenetrable?: boolean
  /**
   * @description 打开前的时长（毫秒）
   */
  openDelay?: number
  /**
   * @description 关闭前的时长（毫秒）
   */
  closeDelay?: number
  /**
   * @description Dialog CSS 的 `margin-top` 值，默认为 15vh
   */
  top?: string
  /**
   * @description Dialog 的可见性
   */
  modelValue?: boolean
  /**
   * @description 遮罩的自定义类名
   */
  modalClass?: ClassValue
  /**
   * @description Dialog 宽度，默认为 50%
   */
  width?: string | number
  /**
   * @description 与原生 CSS 中的 z-index 相同，对话框的层叠顺序
   */
  zIndex?: number
  /**
   * @description 将焦点限制在对话框内
   */
  trapFocus?: boolean
  /**
   * @description 头部的 aria-level 属性
   */
  headerAriaLevel?: string
  /**
   * @description 对话框动画的自定义 transition 配置，可以是字符串（transition 名称）或包含 Vue transition props 的对象
   */
  transition?: DialogTransition
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const dialogPropDefs = buildProps({
  height: { type: [String, Number] },
  resetOnResize: Boolean,
  ...dialogContentPropDefs,
  /**
   * @description 是否将 Dialog 自身追加到 body。嵌套 Dialog 应将此属性设为 `true`
   */
  appendToBody: Boolean,
  /**
   * @description Dialog 追加到哪个元素
   */
  appendTo: {
    type: definePropType<string | HTMLElement>([String, Object]),
    default: 'body',
  },
  /**
   * @description Dialog 关闭前的回调，会阻止 Dialog 关闭，使用 done 关闭对话框
   */
  beforeClose: {
    type: definePropType<DialogBeforeCloseFn>(Function),
  },
  /**
   * @description 关闭时销毁 Dialog 中的元素
   */
  destroyOnClose: Boolean,
  /**
   * @description 是否可通过点击遮罩关闭 Dialog
   */
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否可通过按 ESC 关闭 Dialog
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  /**
   * @description Dialog 显示时是否禁用 body 滚动
   */
  lockScroll: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示遮罩
   */
  modal: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 遮罩是否可穿透
   */
  modalPenetrable: Boolean,
  /**
   * @description 打开前的时长（毫秒）
   */
  openDelay: {
    type: Number,
    default: 0,
  },
  /**
   * @description 关闭前的时长（毫秒）
   */
  closeDelay: {
    type: Number,
    default: 0,
  },
  /**
   * @description Dialog CSS 的 `margin-top` 值，默认为 15vh
   */
  top: {
    type: String,
  },
  /**
   * @description Dialog 的可见性
   */
  modelValue: Boolean,
  /**
   * @description 遮罩的自定义类名
   */
  modalClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  /**
   * @description Dialog 宽度，默认为 50%
   */
  width: {
    type: [String, Number],
  },
  /**
   * @description 与原生 CSS 中的 z-index 相同，对话框的层叠顺序
   */
  zIndex: {
    type: Number,
  },
  trapFocus: Boolean,
  /**
   * @description 头部的 aria-level 属性
   */
  headerAriaLevel: {
    type: String,
    default: '2',
  },
  /**
   * @description 对话框动画的自定义 transition 配置，可以是字符串（transition 名称）或包含 Vue transition props 的对象
   */
  transition: {
    type: definePropType<DialogTransition>([String, Object]),
    default: undefined,
  },
} as const)

export const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value: boolean) => isBoolean(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true,
}
export type DialogEmits = typeof dialogEmits
export type DialogInstance = InstanceType<typeof Dialog> & unknown
export interface DialogConfigContext {
  alignCenter?: boolean
  draggable?: boolean
  overflow?: boolean
  transition?: DialogTransition
}

export const dialogContextKey: InjectionKey<DialogConfigContext> =
  Symbol('dialogContextKey')

export const dialogPropsDefaults = {
  ...dialogContentPropsDefaults,
  appendTo: 'body',
  closeOnClickModal: true,
  closeOnPressEscape: true,
  lockScroll: true,
  modal: true,
  openDelay: 0,
  closeDelay: 0,
  headerAriaLevel: '2',
  transition: undefined,
  modalClass: undefined,
} as const
