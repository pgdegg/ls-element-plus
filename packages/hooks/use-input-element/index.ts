import {
  inject,
  onActivated,
  onDeactivated,
  onScopeDispose,
  onUpdated,
  provide,
  ref,
  shallowRef,
  watch,
  watchEffect,
} from 'vue'

import type { InjectionKey } from 'vue'

export type InputElement = HTMLInputElement | HTMLTextAreaElement
export type InputElementRegistrar = (
  element: InputElement
) => void | (() => void)

/** 注册原生控件，无需依赖组件根节点或 fragment 同级节点。 */
export const inputElementRegistrationKey: InjectionKey<
  InputElementRegistrar | undefined
> = Symbol('elInputElementRegistration')

export function useInputElement<T extends InputElement>(
  source: () => T | null | undefined
) {
  const inputElement = shallowRef<T>()
  const refresh = () => {
    inputElement.value = source() ?? undefined
  }
  watchEffect(refresh, { flush: 'post' })
  onUpdated(refresh)
  const register = inject(inputElementRegistrationKey, undefined)
  const active = ref(true)
  if (register) {
    // 由外层控件负责注册；其内部实现的 input 不得重复注册。
    provide(inputElementRegistrationKey, undefined)
    const stop = watch(
      () => (active.value ? inputElement.value : undefined),
      (element, _, onCleanup) => {
        if (!element) return
        const cleanup = register(element)
        if (cleanup) onCleanup(cleanup)
      },
      { immediate: true, flush: 'post' }
    )
    onActivated(() => {
      active.value = true
    })
    onDeactivated(() => {
      active.value = false
    })
    onScopeDispose(stop)
  }
  return inputElement
}
