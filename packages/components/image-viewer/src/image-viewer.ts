import {
  buildProps,
  definePropType,
  isNumber,
  mutable,
} from '@element-plus/utils'

import type { Component } from 'vue'
import type ImageViewer from './image-viewer.vue'

export type ImageViewerAction =
  'zoomIn' | 'zoomOut' | 'clockwise' | 'anticlockwise'

export type ImageViewerCrossorigin = 'anonymous' | 'use-credentials' | ''

export interface ImageViewerProps {
  /**
   * @description 预览链接列表。
   */
  urlList?: string[]
  /**
   * @description 预览背景遮罩的 z-index。
   */
  zIndex?: number
  /**
   * @description 初始预览图索引，小于或等于 `url-list` 的长度。
   */
  initialIndex?: number
  /**
   * @description 是否循环预览。
   */
  infinite?: boolean
  /**
   * @description 用户点击背景遮罩时是否可以触发 close 事件。
   */
  hideOnClickModal?: boolean
  /**
   * @description 是否将图片自身追加到 body。嵌套父元素带有 transform 属性时，应将此属性设为 `true`。
   */
  teleported?: boolean
  /**
   * @description 是否可通过按 ESC 关闭 image-viewer。
   */
  closeOnPressEscape?: boolean
  /**
   * @description image-viewer 缩放事件的缩放速率。
   */
  zoomRate?: number
  /**
   * @description 预览图缩放比例。
   */
  scale?: number
  /**
   * @description image-viewer 缩放事件的最小缩放比例。
   */
  minScale?: number
  /**
   * @description image-viewer 缩放事件的最大缩放比例。
   */
  maxScale?: number
  /**
   * @description 是否显示预览图加载进度内容。
   */
  showProgress?: boolean
  /**
   * @description 设置 HTML 属性：crossorigin。
   */
  crossorigin?: ImageViewerCrossorigin
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const imageViewerPropDefs = buildProps({
  /**
   * @description 预览链接列表。
   */
  urlList: {
    type: definePropType<string[]>(Array),
    default: () => mutable([] as const),
  },
  /**
   * @description 预览背景遮罩的 z-index。
   */
  zIndex: {
    type: Number,
  },
  /**
   * @description 初始预览图索引，小于或等于 `url-list` 的长度。
   */
  initialIndex: {
    type: Number,
    default: 0,
  },
  /**
   * @description 是否循环预览。
   */
  infinite: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 用户点击背景遮罩时是否可以触发 close 事件。
   */
  hideOnClickModal: Boolean,
  /**
   * @description 是否将图片自身追加到 body。嵌套父元素带有 transform 属性时，应将此属性设为 `true`。
   */
  teleported: Boolean,
  /**
   * @description 是否可通过按 ESC 关闭 image-viewer。
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  /**
   * @description image-viewer 缩放事件的缩放速率。
   */
  zoomRate: {
    type: Number,
    default: 1.2,
  },
  /**
   * @description 预览图缩放比例。
   */
  scale: {
    type: Number,
    default: 1,
  },
  /**
   * @description image-viewer 缩放事件的最小缩放比例。
   */
  minScale: {
    type: Number,
    default: 0.2,
  },
  /**
   * @description image-viewer 缩放事件的最大缩放比例。
   */
  maxScale: {
    type: Number,
    default: 7,
  },
  /**
   * @description 是否显示预览图加载进度内容。
   */
  showProgress: Boolean,
  /**
   * @description 设置 HTML 属性：crossorigin。
   */
  crossorigin: {
    type: definePropType<ImageViewerCrossorigin>(String),
  },
} as const)

export const imageViewerEmits = {
  close: () => true,
  error: (evt: Event) => evt instanceof Event,
  switch: (index: number) => isNumber(index),
  rotate: (deg: number) => isNumber(deg),
}
export type ImageViewerEmits = typeof imageViewerEmits

export interface ImageViewerMode {
  name: string
  icon: Component
}

export type ImageViewerInstance = InstanceType<typeof ImageViewer> & unknown
