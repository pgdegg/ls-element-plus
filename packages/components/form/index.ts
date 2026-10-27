import { withInstall, withNoopInstall } from '@element-plus/utils'
import Form from './src/form.vue'
import FormItem from './src/form-item.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElForm: SFCWithInstall<typeof Form> & {
  FormItem: typeof FormItem
} = withInstall(Form, {
  FormItem,
})
export default ElForm
export const ElFormItem: SFCWithInstall<typeof FormItem> =
  withNoopInstall(FormItem)

export { formEmits } from './src/form'
export type { FormMetaProps, FormProps, FormEmits } from './src/form'
export { formItemValidateStates } from './src/form-item'
export type {
  FormItemValidateState,
  FormItemProp,
  FormItemProps,
} from './src/form-item'
export * from './src/types'
export * from './src/constants'
export * from './src/hooks'

export type FormInstance = InstanceType<typeof Form> & unknown
export type FormItemInstance = InstanceType<typeof FormItem> & unknown
