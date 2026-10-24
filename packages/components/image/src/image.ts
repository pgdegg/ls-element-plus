import {
  buildProps,
  definePropType,
  isNumber,
  mutable,
} from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type Image from './image.vue'

export type ImageFitType =
  '' | 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
export type ImageCrossorigin = 'anonymous' | 'use-credentials' | ''

export interface ImageProps {
  /**
   * @description 启用预览时，用此标志控制点击背景遮罩是否可退出预览模式。
   */
  hideOnClickModal?: boolean
  /**
   * @description 图片源，与原生相同。
   */
  src?: string
  /**
   * @description 指定图片如何缩放以适应容器，与 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) 相同。
   */
  fit?: ImageFitType
  /**
   * @description 指示浏览器如何加载图片，与 [原生](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#loading) 相同
   */
  loading?: 'eager' | 'lazy'
  /**
   * @description 是否使用懒加载。
   */
  lazy?: boolean
  /**
   * @description 使用懒加载时添加滚动监听的容器。
   */
  scrollContainer?: string | HTMLElement
  /**
   * @description 允许大图预览。
   */
  previewSrcList?: string[]
  /**
   * @description 是否将 image-viewer 追加到 body。嵌套父元素带有 transform 属性时，应将此属性设为 `true`。
   */
  previewTeleported?: boolean
  /**
   * @description 设置图片预览的 z-index。
   */
  zIndex?: number
  /**
   * @description 初始预览图索引，小于 `url-list` 的长度。
   */
  initialIndex?: number
  /**
   * @description 预览是否循环。
   */
  infinite?: boolean
  /**
   * @description 是否可通过按 ESC 关闭 image-viewer。
   */
  closeOnPressEscape?: boolean
  /**
   * @description image-viewer 缩放事件的缩放速率
   */
  zoomRate?: number
  /**
   * @description 预览图缩放比例。
   */
  scale?: number
  /**
   * @description image-viewer 缩放事件的最小缩放比例
   */
  minScale?: number
  /**
   * @description image-viewer 缩放事件的最大缩放比例
   */
  maxScale?: number
  /**
   * @description 是否显示预览图加载进度内容。
   */
  showProgress?: boolean
  /**
   * @description 设置 HTML 属性：crossorigin。
   */
  crossorigin?: ImageCrossorigin
}

/**
 * @deprecated 3.0.0 后移除，请改用 `ImageProps`。
 */
export const imageProps = buildProps({
  /**
   * @description 启用预览时，用此标志控制点击背景遮罩是否可退出预览模式。
   */
  hideOnClickModal: Boolean,
  /**
   * @description 图片源，与原生相同。
   */
  src: {
    type: String,
    default: '',
  },
  /**
   * @description 指定图片如何缩放以适应容器，与 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) 相同。
   */
  fit: {
    type: String,
    values: ['', 'contain', 'cover', 'fill', 'none', 'scale-down'],
    default: '',
  },
  /**
   * @description 指示浏览器如何加载图片，与 [原生](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/img#loading) 相同
   */
  loading: {
    type: String,
    values: ['eager', 'lazy'],
  },
  /**
   * @description 是否使用懒加载。
   */
  lazy: Boolean,
  /**
   * @description 使用懒加载时添加滚动监听的容器。
   */
  scrollContainer: {
    type: definePropType<string | HTMLElement | undefined>([String, Object]),
  },
  /**
   * @description 允许大图预览。
   */
  previewSrcList: {
    type: definePropType<string[]>(Array),
    default: () => mutable([] as const),
  },
  /**
   * @description 是否将 image-viewer 追加到 body。嵌套父元素带有 transform 属性时，应将此属性设为 `true`。
   */
  previewTeleported: Boolean,
  /**
   * @description 设置图片预览的 z-index。
   */
  zIndex: {
    type: Number,
  },
  /**
   * @description 初始预览图索引，小于 `url-list` 的长度。
   */
  initialIndex: {
    type: Number,
    default: 0,
  },
  /**
   * @description 预览是否循环。
   */
  infinite: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否可通过按 ESC 关闭 image-viewer。
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  /**
   * @description image-viewer 缩放事件的缩放速率
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
   * @description image-viewer 缩放事件的最小缩放比例
   */
  minScale: {
    type: Number,
    default: 0.2,
  },
  /**
   * @description image-viewer 缩放事件的最大缩放比例
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
    type: definePropType<ImageCrossorigin>(String),
  },
} as const)

/**
 * @deprecated 3.0.0 后移除，请改用 `ImageProps`。
 */
export type ImagePropsPublic = ExtractPublicPropTypes<typeof imageProps>

export const imageEmits = {
  load: (evt: Event) => evt instanceof Event,
  error: (evt: Event) => evt instanceof Event,
  switch: (val: number) => isNumber(val),
  close: () => true,
  show: () => true,
}
export type ImageEmits = typeof imageEmits
export type ImageInstance = InstanceType<typeof Image> & unknown
