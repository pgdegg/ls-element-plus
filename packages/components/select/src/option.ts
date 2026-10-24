import { buildProps } from '@element-plus/utils'

export const COMPONENT_NAME = 'ElOption'
export const optionProps = buildProps({
  /**
   * @description 选项的值
   */
  value: {
    type: [String, Number, Boolean, Object],
    required: true as const,
  },
  /**
   * @description 选项的标签，省略时与 `value` 相同
   */
  label: {
    type: [String, Number],
  },
  created: Boolean,
  /**
   * @description 选项是否禁用
   */
  disabled: Boolean,
})
