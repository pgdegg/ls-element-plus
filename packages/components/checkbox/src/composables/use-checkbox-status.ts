import { computed, inject, ref, toRaw } from 'vue'
import { isEqual } from 'lodash-unified'
import { useFormSize } from '@element-plus/components/form'
import { isArray, isBoolean, isObject, isPropAbsent } from '@element-plus/utils'
import { checkboxGroupContextKey } from '../constants'

import type { ComponentInternalInstance } from 'vue'
import type { CheckboxProps } from '../checkbox'
import type { CheckboxModel } from '../composables'

export const useCheckboxStatus = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots'],
  { model }: Pick<CheckboxModel, 'model'>
) => {
  const checkboxGroup = inject(checkboxGroupContextKey, undefined)
  const isFocused = ref(false)
  const actualValue = computed(() => {
    // 在 2.x 版本中，若没有 props.value，props.label 将充当 props.value
    // 在 3.x 版本中，移除此计算值，改用 props.value。
    if (!isPropAbsent(props.value)) {
      return props.value
    }
    return props.label
  })
  const isChecked = computed<boolean>(() => {
    const value = model.value
    if (isBoolean(value)) {
      return value
    } else if (isArray(value)) {
      if (isObject(actualValue.value)) {
        return value.map(toRaw).some((o) => isEqual(o, actualValue.value))
      } else {
        return value.map(toRaw).includes(actualValue.value)
      }
    } else if (value !== null && value !== undefined) {
      return value === props.trueValue || value === props.trueLabel
    } else {
      return !!value
    }
  })

  const checkboxButtonSize = useFormSize(
    computed(() => checkboxGroup?.size?.value),
    {
      prop: true,
    }
  )
  const checkboxSize = useFormSize(computed(() => checkboxGroup?.size?.value))

  const hasOwnLabel = computed<boolean>(() => {
    return !!slots.default || !isPropAbsent(actualValue.value)
  })

  return {
    checkboxButtonSize,
    isChecked,
    isFocused,
    checkboxSize,
    hasOwnLabel,
    actualValue,
  }
}

export type CheckboxStatus = ReturnType<typeof useCheckboxStatus>
