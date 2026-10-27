import { buildProps, isBoolean } from '@element-plus/utils'
import { CHANGE_EVENT } from '@element-plus/constants'

import type CheckTag from './check-tag.vue'

export interface CheckTagProps {
  /**
   * @description 是否选中
   */
  checked?: boolean
  /**
   * @description check-tag 是否禁用
   */
  disabled?: boolean
  /**
   * @description Tag 类型
   */
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const checkTagPropDefs = buildProps({
  /**
   * @description 是否选中
   */
  checked: Boolean,
  /**
   * @description check-tag 是否禁用
   */
  disabled: Boolean,
  /**
   * @description Tag 类型
   */
  type: {
    type: String,
    values: ['primary', 'success', 'info', 'warning', 'danger'],
    default: 'primary',
  },
} as const)

export const checkTagEmits = {
  'update:checked': (value: boolean) => isBoolean(value),
  [CHANGE_EVENT]: (value: boolean) => isBoolean(value),
}
export type CheckTagEmits = typeof checkTagEmits

export type CheckTagInstance = InstanceType<typeof CheckTag> & unknown
