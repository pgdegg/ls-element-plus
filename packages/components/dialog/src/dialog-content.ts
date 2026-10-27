import { buildProps, definePropType, iconPropType } from '@element-plus/utils'

import type { ClassValue, IconPropType } from '@element-plus/utils'

/**
 * @description dialog-content 组件的 props
 */
export interface DialogContentProps {
  /**
   * @description 是否将头部和底部居中对齐
   */
  center?: boolean
  /**
   * @description 是否让对话框水平和垂直都居中
   */
  alignCenter?: boolean
  /**
   * @description 自定义关闭图标，默认为 Close
   */
  closeIcon?: IconPropType
  /**
   * @description 为 Dialog 启用拖拽功能
   */
  draggable?: boolean
  /**
   * @description 可拖拽的 Dialog 可能溢出视口
   */
  overflow?: boolean
  /**
   * @description Dialog 是否占满全屏
   */
  fullscreen?: boolean
  /**
   * @description 头部容器的自定义类名
   */
  headerClass?: ClassValue
  /**
   * @description 主体容器的自定义类名
   */
  bodyClass?: ClassValue
  /**
   * @description 底部容器的自定义类名
   */
  footerClass?: ClassValue
  /**
   * @description 是否显示关闭按钮
   */
  showClose?: boolean
  /**
   * @description Dialog 的标题。也可以通过具名插槽传入（见下表）
   */
  title?: string
  /**
   * @description 头部的 aria-level 属性
   */
  ariaLevel?: string
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const dialogContentPropDefs = buildProps({
  /**
   * @description 是否将头部和底部居中对齐
   */
  center: Boolean,
  /**
   * @description 是否让对话框水平和垂直都居中
   */
  alignCenter: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 自定义关闭图标，默认为 Close
   */
  closeIcon: {
    type: iconPropType,
  },
  /**
   * @description 为 Dialog 启用拖拽功能
   */
  draggable: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 可拖拽的 Dialog 可能溢出视口
   */
  overflow: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description Dialog 是否占满全屏
   */
  fullscreen: Boolean,
  /**
   * @description 头部容器的自定义类名
   */
  headerClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  /**
   * @description 主体容器的自定义类名
   */
  bodyClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  /**
   * @description 底部容器的自定义类名
   */
  footerClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  /**
   * @description 是否显示关闭按钮
   */
  showClose: {
    type: Boolean,
    default: true,
  },
  /**
   * @description Dialog 的标题。也可以通过具名插槽传入（见下表）
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 头部的 aria-level 属性
   */
  ariaLevel: {
    type: String,
    default: '2',
  },
} as const)

export const dialogContentEmits = {
  close: () => true,
}

export const dialogContentPropsDefaults = {
  alignCenter: undefined,
  draggable: undefined,
  overflow: undefined,
  showClose: true,
  title: '',
  ariaLevel: '2',
  headerClass: undefined,
  bodyClass: undefined,
  footerClass: undefined,
} as const
