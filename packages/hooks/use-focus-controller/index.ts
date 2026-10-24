import {
  getCurrentInstance,
  onMounted,
  ref,
  shallowRef,
  unref,
  watch,
} from 'vue'
import { useEventListener } from '@vueuse/core'
import { isElement, isFocusable, isFunction } from '@element-plus/utils'

import type { MaybeRef, ShallowRef } from 'vue'

interface UseFocusControllerOptions {
  disabled?: MaybeRef<boolean>
  /**
   * 返回 true 以取消 focus
   * @param event FocusEvent
   */
  beforeFocus?: (event: FocusEvent) => boolean | undefined
  afterFocus?: () => void
  /**
   * 返回 true 以取消 blur
   * @param event FocusEvent
   */
  beforeBlur?: (event: FocusEvent) => boolean | undefined
  afterBlur?: () => void
}

export function useFocusController<T extends { focus: () => void }>(
  target: ShallowRef<T | undefined>,
  {
    disabled,
    beforeFocus,
    afterFocus,
    beforeBlur,
    afterBlur,
  }: UseFocusControllerOptions = {}
) {
  const instance = getCurrentInstance()!
  const { emit } = instance
  const wrapperRef = shallowRef<HTMLElement>()
  const isFocused = ref(false)

  const handleFocus = (event: FocusEvent) => {
    const cancelFocus = isFunction(beforeFocus) ? beforeFocus(event) : false
    if (unref(disabled) || isFocused.value || cancelFocus) return

    isFocused.value = true
    emit('focus', event)
    afterFocus?.()
  }

  const handleBlur = (event: FocusEvent) => {
    const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false
    if (
      unref(disabled) ||
      (event.relatedTarget &&
        wrapperRef.value?.contains(event.relatedTarget as Node)) ||
      cancelBlur
    )
      return

    isFocused.value = false
    emit('blur', event)
    afterBlur?.()
  }

  const handleClick = (event: Event) => {
    if (
      unref(disabled) ||
      isFocusable(event.target as HTMLElement) ||
      (wrapperRef.value?.contains(document.activeElement) &&
        wrapperRef.value !== document.activeElement)
    )
      return

    target.value?.focus()
  }

  watch([wrapperRef, () => unref(disabled)], ([el, disabled]) => {
    if (!el) return
    if (disabled) {
      el.removeAttribute('tabindex')
    } else {
      el.setAttribute('tabindex', '-1')
    }
  })

  useEventListener(wrapperRef, 'focus', handleFocus, true)
  useEventListener(wrapperRef, 'blur', handleBlur, true)
  useEventListener(wrapperRef, 'click', handleClick, true)

  // 仅供测试
  if (process.env.NODE_ENV === 'test') {
    onMounted(() => {
      const targetEl = isElement(target.value)
        ? target.value
        : document.querySelector('input,textarea')

      if (targetEl) {
        useEventListener(targetEl, 'focus', handleFocus, true)
        useEventListener(targetEl, 'blur', handleBlur, true)
      }
    })
  }

  return {
    isFocused,
    /** 不要同时使用 wrapperRef 与 handleFocus/handleBlur */
    wrapperRef,
    handleFocus,
    handleBlur,
  }
}
