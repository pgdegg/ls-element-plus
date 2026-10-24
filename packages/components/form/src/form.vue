<template>
  <form ref="formRef" :class="formClasses" :style="contentStyle">
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, ref, toRefs, watch } from 'vue'
import { cloneDeep } from 'lodash-unified'
import {
  NOOP,
  debugWarn,
  ensureArray,
  getProp,
  isArray,
  isFunction,
} from '@element-plus/utils'
import { useNamespace } from '@element-plus/hooks'
import { useFormSize } from './hooks'
import { formContextKey } from './constants'
import { formEmits } from './form'
import { filterFields, useFormLabelWidth } from './utils'

import type { ValidateFieldsError } from 'async-validator'
import type { Arrayable } from '@element-plus/utils'
import type { FormProps } from './form'
import type {
  FormContext,
  FormItemContext,
  FormValidateCallback,
  FormValidationResult,
} from './types'
import type { FormItemProp } from './form-item'

const COMPONENT_NAME = 'ElForm'
defineOptions({
  name: COMPONENT_NAME,
})
const props = withDefaults(defineProps<FormProps>(), {
  labelPosition: 'right',
  requireAsteriskPosition: 'left',
  labelWidth: '',
  labelSuffix: '',
  showMessage: true,
  validateOnRuleChange: true,
  scrollIntoViewOptions: true,
})
const emit = defineEmits(formEmits)

const contentStyle = computed(() =>
  props.contentWidth == null
    ? undefined
    : {
        '--el-form-item-content-width': `${props.contentWidth}px`,
        '--el-form-item-label-width':
          typeof props.labelWidth === 'number'
            ? `${props.labelWidth}px`
            : props.labelWidth,
      }
)

const formRef = ref<HTMLElement>()
const fields = reactive<FormItemContext[]>([])
const initialValues = new Map<string, any>()

const formSize = useFormSize()
const ns = useNamespace('form')
const formClasses = computed(() => {
  const { labelPosition, inline } = props
  return [
    ns.b(),
    ns.m(formSize.value || 'default'),
    {
      [ns.m(`label-${labelPosition}`)]: labelPosition,
      [ns.m('inline')]: inline,
    },
  ]
})

const getField: FormContext['getField'] = (prop) => {
  return filterFields(fields, [prop])[0]
}

const addField: FormContext['addField'] = (field) => {
  if (!fields.includes(field)) {
    fields.push(field)
  }
  if (field.propString) {
    if (initialValues.has(field.propString)) {
      field.setInitialValue(initialValues.get(field.propString))
    } else {
      initialValues.set(field.propString, cloneDeep(field.fieldValue))
    }
  }
}

const removeField: FormContext['removeField'] = (field, oldPropString?) => {
  if (oldPropString) {
    // 活动字段上的 prop 发生变化：删除过期键，字段保留在 fields[] 中
    initialValues.delete(oldPropString)
    return
  }
  // 卸载：从数组中移除，缓存 initialValue 以便可能的重新挂载
  const idx = fields.indexOf(field)
  if (idx > -1) {
    fields.splice(idx, 1)
    if (field.propString) {
      initialValues.set(field.propString, cloneDeep(field.getInitialValue()))
    }
  }
}

const setInitialValues: FormContext['setInitialValues'] = (initModel) => {
  if (!props.model) {
    debugWarn(COMPONENT_NAME, 'model is required for setInitialValues to work.')
    return
  }
  if (!initModel) {
    debugWarn(
      COMPONENT_NAME,
      'initModel is required for setInitialValues to work.'
    )
    return
  }

  for (const key of initialValues.keys()) {
    initialValues.set(key, cloneDeep(getProp(initModel, key).value))
  }
  fields.forEach((field) => {
    if (field.prop) {
      field.setInitialValue(getProp(initModel, field.prop).value)
    }
  })
}

const resetFields: FormContext['resetFields'] = (properties = []) => {
  if (!props.model) {
    debugWarn(COMPONENT_NAME, 'model is required for resetFields to work.')
    return
  }

  filterFields(fields, properties).forEach((field) => field.resetField())

  const activePropStrings = new Set(
    fields.map((f) => f.propString).filter(Boolean)
  )
  const propsToCheck =
    properties.length > 0
      ? ensureArray(properties).map((p) => (isArray(p) ? p.join('.') : p))
      : [...initialValues.keys()]

  for (const propString of propsToCheck) {
    if (!activePropStrings.has(propString) && initialValues.has(propString)) {
      getProp(props.model, propString).value = cloneDeep(
        initialValues.get(propString)
      )
    }
  }
}

const clearValidate: FormContext['clearValidate'] = (props = []) => {
  filterFields(fields, props).forEach((field) => field.clearValidate())
}

const isValidatable = computed(() => {
  const hasModel = !!props.model
  if (!hasModel) {
    debugWarn(COMPONENT_NAME, 'model is required for validate to work.')
  }
  return hasModel
})

const obtainValidateFields = (props: Arrayable<FormItemProp>) => {
  if (fields.length === 0) return []

  const filteredFields = filterFields(fields, props)
  if (!filteredFields.length) {
    debugWarn(COMPONENT_NAME, 'please pass correct props!')
    return []
  }
  return filteredFields
}

const validate = async (
  callback?: FormValidateCallback
): FormValidationResult => validateField(undefined, callback)

const doValidateField = async (
  props: Arrayable<FormItemProp> = []
): Promise<boolean> => {
  if (!isValidatable.value) return false

  const fields = obtainValidateFields(props)
  if (fields.length === 0) return true

  let validationErrors: ValidateFieldsError = {}
  for (const field of fields) {
    try {
      await field.validate('')
      if (field.validateState === 'error' && !field.error) field.resetField()
    } catch (fields) {
      validationErrors = {
        ...validationErrors,
        ...(fields as ValidateFieldsError),
      }
    }
  }

  if (Object.keys(validationErrors).length === 0) return true
  return Promise.reject(validationErrors)
}

const validateField: FormContext['validateField'] = async (
  modelProps = [],
  callback
) => {
  let result = false
  const shouldThrow = !isFunction(callback)
  try {
    result = await doValidateField(modelProps)
    // 当结果为 false 时，表示这些字段不可校验
    if (result === true) {
      await callback?.(result)
    }
    return result
  } catch (e) {
    if (e instanceof Error) throw e

    const invalidFields = e as ValidateFieldsError

    if (props.scrollToError) {
      // form-item 可能根据判断条件动态渲染，invalidFields 中的顺序不确定。
      // 因此，直接查找已渲染的元素来确定第一个出错的表单项。
      if (formRef.value) {
        const formItem = formRef.value.querySelector(`.${ns.b()}-item.is-error`)
        formItem?.scrollIntoView(props.scrollIntoViewOptions)
      }
    }
    !result && (await callback?.(false, invalidFields))
    return shouldThrow && Promise.reject(invalidFields)
  }
}

const scrollToField = (prop: FormItemProp) => {
  const field = getField(prop)
  if (field) {
    field.$el?.scrollIntoView(props.scrollIntoViewOptions)
  }
}

watch(
  () => props.rules,
  () => {
    if (props.validateOnRuleChange) {
      validate().catch(NOOP)
    }
  },
  { deep: true, flush: 'post' }
)

provide(
  formContextKey,
  reactive({
    ...toRefs(props),
    emit,

    resetFields,
    clearValidate,
    validateField,
    getField,
    addField,
    removeField,
    setInitialValues,

    ...useFormLabelWidth(),
  })
)

defineExpose({
  /**
   * @description 校验整个表单。接收回调或返回 `Promise`。
   */
  validate,
  /**
   * @description 校验指定字段。
   */
  validateField,
  /**
   * @description 重置指定字段并清除校验结果。
   */
  resetFields,
  /**
   * @description 清除指定字段的校验信息。
   */
  clearValidate,
  /**
   * @description 滚动到指定字段。
   */
  scrollToField,
  /**
   * @description 获取字段上下文。
   */
  getField,
  /**
   * @description 所有字段的上下文。
   */
  fields,
  /**
   * @description 为表单字段设置初始值。调用 `resetFields` 时，字段将重置为这些值。
   */
  setInitialValues,
})
</script>
