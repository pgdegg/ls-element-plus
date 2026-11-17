import type { InjectionKey } from 'vue'

export interface ScrollbarContext {
  scrollbarElement: HTMLDivElement | undefined
  wrapElement: HTMLDivElement | undefined
  /** 嵌套滚动区域当前拥有滚动条显示权。 */
  nestedActive?: boolean
  /** 其他嵌套区域拥有显示权时，隐藏当前滚动条。 */
  nestedSuppressed?: boolean
}

export const scrollbarContextKey: InjectionKey<ScrollbarContext> = Symbol(
  'scrollbarContextKey'
)
