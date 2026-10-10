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

/** Register native controls without relying on component roots or fragment siblings. */
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
    // An outer control owns registration; its implementation inputs must not register twice.
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
