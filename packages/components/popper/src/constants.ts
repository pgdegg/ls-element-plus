import type { CSSProperties, ComputedRef, InjectionKey, Ref } from 'vue'
import type { Instance } from '@popperjs/core'

export type Measurable = {
  getBoundingClientRect: () => DOMRect
}

/**
 * triggerRef 指向触发 popper 的元素
 * contentRef 指向 popper 内容的元素
 * referenceRef 指向 popper 内容相对定位所参照的元素
 */
export type ElPopperInjectionContext = {
  triggerRef: Ref<Measurable | undefined>
  contentRef: Ref<HTMLElement | undefined>
  popperInstanceRef: Ref<Instance | undefined>
  referenceRef: Ref<Measurable | undefined>
  role: ComputedRef<string>
}

export type ElPopperContentInjectionContext = {
  arrowRef: Ref<HTMLElement | undefined>
  arrowStyle: ComputedRef<CSSProperties>
}

export const POPPER_INJECTION_KEY: InjectionKey<ElPopperInjectionContext> =
  Symbol('popper')

export const POPPER_CONTENT_INJECTION_KEY: InjectionKey<ElPopperContentInjectionContext> =
  Symbol('popperContent')
