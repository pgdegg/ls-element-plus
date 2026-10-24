import { isNil } from 'lodash-unified'
import { buildProps, definePropType, isString } from '@element-plus/utils'
import {
  useAriaProps,
  useEmptyValuesProps,
  useSizeProp,
} from '@element-plus/hooks'
import { useTooltipContentProps } from '@element-plus/components/tooltip'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'

import type { ExtractPublicPropTypes } from 'vue'
import type { ColorFormats } from '@ctrl/tinycolor'
import type ColorPicker from './color-picker.vue'
import type { AriaProps, UseEmptyValuesProps } from '@element-plus/hooks'
import type { ComponentSize } from '@element-plus/constants'
import type { ElTooltipContentProps } from '@element-plus/components/tooltip'

export interface ColorPickerProps
  extends UseEmptyValuesProps, Pick<AriaProps, 'ariaLabel'> {
  /**
   * @description color-picker 未激活且 persistent 为 false 时，颜色面板将被销毁
   */
  persistent?: boolean
  /**
   * @description 绑定值
   */
  modelValue?: string | null
  /**
   * @description ColorPicker 的 id
   */
  id?: string
  /**
   * @description 是否显示透明度滑块
   */
  showAlpha?: boolean
  /**
   * @description v-model 的颜色格式
   */
  colorFormat?: ColorFormats
  /**
   * @description 是否禁用 ColorPicker
   */
  disabled?: boolean
  /**
   * @description 是否显示清除按钮
   */
  clearable?: boolean
  /**
   * @description ColorPicker 尺寸
   */
  size?: ComponentSize
  /**
   * @description ColorPicker 下拉框的自定义类名
   */
  popperClass?: ElTooltipContentProps['popperClass']
  /**
   * @description ColorPicker 下拉框的自定义样式
   */
  popperStyle?: ElTooltipContentProps['popperStyle']
  /**
   * @description ColorPicker 的 tabindex
   */
  tabindex?: string | number
  /**
   * @description color-picker 弹层是否传送到 body
   */
  teleported?: ElTooltipContentProps['teleported']
  /**
   * @description color-picker 面板追加到哪个元素
   */
  appendTo?: ElTooltipContentProps['appendTo']
  /**
   * @description 预定义颜色选项
   */
  predefine?: string[]
  /**
   * @description 是否触发表单校验
   */
  validateEvent?: boolean
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `ColorPickerProps`
 */
export const colorPickerProps = buildProps({
  /**
   * @description color-picker 未激活且 persistent 为 false 时，颜色面板将被销毁
   */
  persistent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 绑定值
   */
  modelValue: {
    type: definePropType<string | null>(String),
    default: undefined,
  },
  /**
   * @description ColorPicker 的 id
   */
  id: String,
  /**
   * @description 是否显示透明度滑块
   */
  showAlpha: Boolean,
  /**
   * @description v-model 的颜色格式
   */
  colorFormat: {
    type: definePropType<ColorFormats>(String),
  },
  /**
   * @description 是否禁用 ColorPicker
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 是否显示清除按钮
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description ColorPicker 尺寸
   */
  size: useSizeProp,
  /**
   * @description ColorPicker 下拉框的自定义类名
   */
  popperClass: useTooltipContentProps.popperClass,
  /**
   * @description ColorPicker 下拉框的自定义样式
   */
  popperStyle: useTooltipContentProps.popperStyle,
  /**
   * @description ColorPicker 的 tabindex
   */
  tabindex: {
    type: [String, Number],
    default: 0,
  },
  /**
   * @description color-picker 弹层是否传送到 body
   */
  teleported: useTooltipContentProps.teleported,
  /**
   * @description color-picker 面板追加到哪个元素
   */
  appendTo: useTooltipContentProps.appendTo,
  /**
   * @description 预定义颜色选项
   */
  predefine: {
    type: definePropType<string[]>(Array),
  },
  /**
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  ...useEmptyValuesProps,
  ...useAriaProps(['ariaLabel']),
} as const)
export const colorPickerEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | null) => isString(val) || isNil(val),
  [CHANGE_EVENT]: (val: string | null) => isString(val) || isNil(val),
  activeChange: (val: string | null) => isString(val) || isNil(val),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `ColorPickerProps`
 */
export type ColorPickerPropsPublic = ExtractPublicPropTypes<
  typeof colorPickerProps
>
export type ColorPickerEmits = typeof colorPickerEmits
export type ColorPickerInstance = InstanceType<typeof ColorPicker> & unknown

/**
 * @description ColorPickerProps 的默认值，用于扩展 ColorPickerProps 的组件
 */
export const colorPickerPropsDefaults = {
  persistent: true,
  modelValue: undefined,
  disabled: undefined,
  clearable: true,
  popperClass: undefined,
  popperStyle: undefined,
  tabindex: 0,
  teleported: true,
  validateEvent: true,
  valueOnClear: undefined,
} as const
