import { defineComponent, provide, ref } from 'vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'
import {
  DEFAULT_FORMATS_TIME,
  PICKER_POPPER_OPTIONS_INJECTION_KEY,
} from './constants'
import Picker from './common/picker.vue'
import TimePickPanel from './time-picker-com/panel-time-pick.vue'
import TimeRangePanel from './time-picker-com/panel-time-range.vue'
import { timePickerDefaultProps } from './common/props'

dayjs.extend(customParseFormat)

export default defineComponent({
  name: 'ElTimePicker',
  install: null,
  props: {
    ...timePickerDefaultProps,
    /**
     * @description 是否选择时间范围
     */
    isRange: Boolean,
  },
  emits: [UPDATE_MODEL_EVENT],
  setup(props, ctx) {
    const commonPicker = ref<InstanceType<typeof Picker>>()
    const [type, Panel] = props.isRange
      ? ['timerange', TimeRangePanel]
      : ['time', TimePickPanel]

    const modelUpdater = (value: any) => ctx.emit(UPDATE_MODEL_EVENT, value)
    provide(PICKER_POPPER_OPTIONS_INJECTION_KEY, props.popperOptions)
    ctx.expose({
      get inputElement() {
        return commonPicker.value?.inputElement
      },
      /**
       * @description 聚焦 Input 组件
       */
      focus: () => {
        commonPicker.value?.focus()
      },
      /**
       * @description 使 Input 组件失焦
       */
      blur: () => {
        commonPicker.value?.blur()
      },
      /**
       * @description 打开 TimePicker 弹层
       */
      handleOpen: () => {
        commonPicker.value?.handleOpen()
      },
      /**
       * @description 关闭 TimePicker 弹层
       */
      handleClose: () => {
        commonPicker.value?.handleClose()
      },
    })

    return () => {
      const format = props.format ?? DEFAULT_FORMATS_TIME

      return (
        <Picker
          {...props}
          ref={commonPicker}
          type={type}
          format={format}
          onUpdate:modelValue={modelUpdater}
        >
          {{
            prepend: ctx.slots.prepend,
            append: ctx.slots.append,
            default: (props: any) => <Panel {...props} />,
          }}
        </Picker>
      )
    }
  },
})
