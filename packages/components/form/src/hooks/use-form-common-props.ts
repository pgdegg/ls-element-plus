import { computed, inject, ref, unref } from 'vue'
import { useGlobalSize } from '@element-plus/hooks/use-size'
import { useProp } from '@element-plus/hooks/use-prop'
import {
  componentDisabledContextKey,
  formContextKey,
  formItemContextKey,
} from '../constants'

import type { ComponentSize } from '@element-plus/constants'
import type { MaybeRef } from 'vue'

export const useFormSize = (
  fallback?: MaybeRef<ComponentSize | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {}
) => {
  const emptyRef = ref(undefined)

  const size = ignore.prop ? emptyRef : useProp<ComponentSize>('size')
  const globalConfig = ignore.global ? emptyRef : useGlobalSize()
  const form = ignore.form
    ? { size: undefined }
    : inject(formContextKey, undefined)
  const formItem = ignore.formItem
    ? { size: undefined }
    : inject(formItemContextKey, undefined)

  return computed(
    (): ComponentSize =>
      size.value ||
      unref(fallback) ||
      formItem?.size ||
      form?.size ||
      globalConfig.value ||
      ''
  )
}

export const useFormDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
  const disabled = useProp<boolean>('disabled')
  const form = inject(formContextKey, undefined)
  const inheritedDisabled = inject(componentDisabledContextKey, false)

  return computed(() => {
    return (
      unref(inheritedDisabled) ||
      (disabled.value ?? unref(fallback) ?? form?.disabled ?? false)
    )
  })
}

// These exports are used for preventing breaking changes
export const useSize = useFormSize
export const useDisabled = useFormDisabled

export const useFormReadonly = (fallback?: MaybeRef<boolean | undefined>) => {
  const readonly = useProp<boolean>('readonly')
  const ignoreParent = useProp<boolean>('ignoreParentReadonly')
  const form = inject(formContextKey, undefined)
  return computed(
    () =>
      readonly.value ||
      unref(fallback) ||
      (!ignoreParent.value && (form?.readonly || form?.readonlyRaw)) ||
      false
  )
}

export const useFormPlaceholder = (
  fallback?: MaybeRef<string | undefined>,
  field = 'placeholder'
) => {
  const placeholder = useProp<string>(field)
  const hide = useProp<boolean | undefined>('hidePlaceholder')
  const ignoreParent = useProp<string | string[]>('ignoreParentHidePlaceholder')
  const form = inject(formContextKey, undefined)
  return computed(() =>
    (hide.value ??
    (form?.hidePlaceholder &&
      !(
        Array.isArray(ignoreParent.value)
          ? ignoreParent.value
          : [ignoreParent.value]
      ).includes('form')))
      ? ''
      : (placeholder.value ?? unref(fallback))
  )
}
