import { isNil } from 'lodash-unified'
import { buildProps, definePropType, isString } from '@element-plus/utils'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'

import type { ComputedRef, InjectionKey, StyleValue } from 'vue'
import type { ColorFormats } from '@ctrl/tinycolor'
import type { ClassValue } from '@element-plus/utils'
import type ColorPickerPanel from './color-picker-panel.vue'
import type Color from './utils/color'

export interface ColorPickerPanelProps {
  /**
   * @description 绑定值
   */
  modelValue?: string | null
  /**
   * @description 颜色选择器是否有边框
   */
  border?: boolean
  /**
   * @description 是否显示透明度滑块
   */
  showAlpha?: boolean
  /**
   * @description v-model 的颜色格式
   */
  colorFormat?: ColorFormats
  /**
   * @description 是否禁用颜色选择器
   */
  disabled?: boolean
  /**
   * @description 预定义颜色选项
   */
  predefine?: string[]
  /**
   * @description 是否触发表单校验
   */
  validateEvent?: boolean
  /**
   * @description 类名将传给 hue-slider
   */
  hueSliderClass?: ClassValue
  /**
   * @description 样式将传给 hue-slider
   */
  hueSliderStyle?: StyleValue
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const colorPickerPanelPropDefs = buildProps({
  /**
   * @description 绑定值
   */
  modelValue: {
    type: definePropType<string | null>(String),
    default: undefined,
  },
  /**
   * @description 颜色选择器是否有边框
   */
  border: {
    type: Boolean,
    default: true,
  },
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
   * @description 是否禁用颜色选择器
   */
  disabled: Boolean,
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
  /**
   * @description 类名将传给 `<hue-slider />`
   */
  hueSliderClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  /**
   * @description 样式将传给 `<hue-slider />`
   */
  hueSliderStyle: {
    type: definePropType<StyleValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
} as const)
export const colorPickerPanelEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | null) => isString(val) || isNil(val),
}
export type ColorPickerPanelEmits = typeof colorPickerPanelEmits
export type ColorPickerPanelInstance = InstanceType<typeof ColorPickerPanel> &
  unknown

export interface ColorPickerPanelContext {
  currentColor: ComputedRef<string>
}

export interface CommonColorContext {
  color: Color
}

export const ROOT_COMMON_COLOR_INJECTION_KEY: InjectionKey<CommonColorContext> =
  Symbol('colorCommonPickerKey')
export const colorPickerPanelContextKey: InjectionKey<ColorPickerPanelContext> =
  Symbol('colorPickerPanelContextKey')
