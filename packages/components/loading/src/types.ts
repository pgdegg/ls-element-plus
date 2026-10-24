import type { MaybeRef, VNode } from 'vue'

export type LoadingOptionsResolved = {
  parent: LoadingParentElement
  /**
   * @description 遮罩背景色
   */
  background: MaybeRef<string>
  svg: MaybeRef<string>
  svgViewBox: MaybeRef<string>
  /**
   * @description 自定义 spinner 的类名
   */
  spinner: MaybeRef<boolean | string>
  /**
   * @description 显示在 spinner 下方的加载文本
   */
  text: MaybeRef<string | VNode | VNode[]>
  /**
   * @description 与 `v-loading` 的 `fullscreen` 修饰符相同
   */
  fullscreen: boolean
  /**
   * @description 与 `v-loading` 的 `lock` 修饰符相同
   */
  lock: boolean
  /**
   * @description Loading 的自定义类名
   */
  customClass: MaybeRef<string>
  visible: boolean
  target: HTMLElement
  beforeClose?: () => boolean
  closed?: () => void
}
export type LoadingOptions = Partial<
  Omit<LoadingOptionsResolved, 'parent' | 'target'> & {
    /**
     * @description Loading 需要覆盖的 DOM 节点。接受 DOM 对象或字符串；若为字符串，将传给 `document.querySelector` 获取对应的 DOM 节点
     */
    target: HTMLElement | string
    /**
     * @description 与 `v-loading` 的 `body` 修饰符相同
     */
    body: boolean
  }
>

export interface LoadingParentElement extends HTMLElement {
  vLoadingAddClassList?: () => void
}
