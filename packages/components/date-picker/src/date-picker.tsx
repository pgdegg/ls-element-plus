import { defineComponent, provide, reactive, ref, toRef } from 'vue'
import {
  CommonPicker,
  DEFAULT_FORMATS_DATE,
  DEFAULT_FORMATS_DATEPICKER,
  PICKER_POPPER_OPTIONS_INJECTION_KEY,
} from '@element-plus/components/time-picker'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { ElDatePickerPanel } from '@element-plus/components/date-picker-panel'
import { datePickerProps } from './props'

import type {
  DateModelType,
  SingleOrRange,
} from '@element-plus/components/time-picker'
import type { DatePickerExpose } from './instance'

export default defineComponent({
  name: 'ElDatePicker',
  install: null,
  props: datePickerProps,
  emits: [UPDATE_MODEL_EVENT],
  setup(props, { expose, emit, slots }) {
    provide(
      PICKER_POPPER_OPTIONS_INJECTION_KEY,
      reactive(toRef(props, 'popperOptions'))
    )
    const commonPicker = ref<InstanceType<typeof CommonPicker>>()
    const refProps: DatePickerExpose = {
      get inputElement() {
        return commonPicker.value?.inputElement
      },
      focus: () => {
        commonPicker.value?.focus()
      },
      blur: () => {
        commonPicker.value?.blur()
      },
      handleOpen: () => {
        commonPicker.value?.handleOpen()
      },
      handleClose: () => {
        commonPicker.value?.handleClose()
      },
    }

    expose(refProps)

    const onModelValueUpdated = (val: SingleOrRange<DateModelType> | null) => {
      emit(UPDATE_MODEL_EVENT, val)
    }

    return () => {
      // 由于 props 始终包含所有已定义的键，{format, ...props} 总会覆盖 format
      // 在展开前取 props.format 或在此处提供默认值
      const format =
        props.format ??
        (DEFAULT_FORMATS_DATEPICKER[props.type] || DEFAULT_FORMATS_DATE)

      return (
        <CommonPicker
          {...props}
          format={format}
          type={props.type}
          ref={commonPicker}
          onUpdate:modelValue={onModelValueUpdated}
        >
          {{
            prepend: slots.prepend,
            append: slots.append,
            default: (scopedProps: /**FIXME: 移除 any 类型 */ any) => (
              <ElDatePickerPanel
                disabled={props.disabled}
                editable={props.editable}
                border={false}
                {...scopedProps}
              >
                {slots}
              </ElDatePickerPanel>
            ),
            'range-separator': slots['range-separator'],
          }}
        </CommonPicker>
      )
    }
  },
})
