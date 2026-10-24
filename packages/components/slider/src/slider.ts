import { placements } from '@popperjs/core'
import {
  buildProps,
  definePropType,
  isArray,
  isNumber,
} from '@element-plus/utils'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '@element-plus/constants'
import { useAriaProps, useSizeProp } from '@element-plus/hooks'

import type { Arrayable, ClassValue } from '@element-plus/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type { SliderMarkerProps } from './marker'
import type Slider from './slider.vue'

type SliderMarks = Record<number, string | SliderMarkerProps['mark']>

export interface SliderInitData {
  firstValue: number
  secondValue: number
  oldValue?: Arrayable<number>
  dragging: boolean
  sliderSize: number
}

export const sliderProps = buildProps({
  /**
   * @description 绑定值
   */
  modelValue: {
    type: definePropType<Arrayable<number>>([Number, Array]),
    default: 0,
  },
  id: {
    type: String,
    default: undefined,
  },
  /**
   * @description 最小值
   */
  min: {
    type: Number,
    default: 0,
  },
  /**
   * @description 最大值
   */
  max: {
    type: Number,
    default: 100,
  },
  /**
   * @description 步长，可以是数字或 `'mark'`，将值限制为刻度。设为 `'mark'` 时必须设置 `marks` 属性
   */
  step: {
    type: definePropType<number | 'mark'>([Number, String]),
    default: 1,
  },
  /**
   * @description 是否显示输入框，在 `range` 为 false 且 `step` 不为 `'mark'` 时生效
   */
  showInput: Boolean,
  /**
   * @description `show-input` 为 true 时是否显示控制按钮
   */
  showInputControls: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 滑块容器尺寸，在垂直模式下无效
   */
  size: useSizeProp,
  /**
   * @description 输入框尺寸，设置 `size` 时默认取 `size` 的值
   */
  inputSize: useSizeProp,
  /**
   * @description 是否显示断点
   */
  showStops: Boolean,
  /**
   * @description 是否显示 tooltip 值
   */
  showTooltip: {
    type: Boolean,
    default: true,
  },
  /**
   * @description tooltip 值的显示格式
   */
  formatTooltip: {
    type: definePropType<(val: number) => number | string>(Function),
    default: undefined,
  },
  /**
   * @description Slider 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 是否选择范围
   */
  range: Boolean,
  /**
   * @description 垂直模式
   */
  vertical: Boolean,
  /**
   * @description 滑块高度，垂直模式下必填
   */
  height: String,
  /**
   * @description `range` 为 true 时，范围起点的屏幕阅读器标签
   */
  rangeStartLabel: {
    type: String,
    default: undefined,
  },
  /**
   * @description `range` 为 true 时，范围终点的屏幕阅读器标签
   */
  rangeEndLabel: {
    type: String,
    default: undefined,
  },
  /**
   * @description 供屏幕阅读器使用的 `aria-valuenow` 属性显示格式
   */
  formatValueText: {
    type: definePropType<(val: number) => string>(Function),
    default: undefined,
  },
  /**
   * @description tooltip 的自定义类名
   */
  tooltipClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  /**
   * @description Tooltip 的位置
   */
  placement: {
    type: String,
    values: placements,
    default: 'top',
  },
  /**
   * @description 刻度，键类型必须为 `number` 且位于闭区间 `[min, max]` 内，每个刻度可自定义样式
   */
  marks: {
    type: definePropType<SliderMarks>(Object),
  },
  /**
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 当 slider tooltip 不处于激活状态且 `persistent` 为 `false` 时，popconfirm 将被销毁。`show-tooltip` 为 `false` 时 `persistent` 始终为 `false`
   */
  persistent: {
    type: Boolean,
    default: true,
  },
  ...useAriaProps(['ariaLabel']),
} as const)
export type SliderProps = ExtractPropTypes<typeof sliderProps>
export type SliderPropsPublic = ExtractPublicPropTypes<typeof sliderProps>

const isValidValue = (value: Arrayable<number>) =>
  isNumber(value) || (isArray(value) && value.every(isNumber))
export const sliderEmits = {
  [UPDATE_MODEL_EVENT]: isValidValue,
  [INPUT_EVENT]: isValidValue,
  [CHANGE_EVENT]: isValidValue,
}
export type SliderEmits = typeof sliderEmits

export type SliderInstance = InstanceType<typeof Slider> & unknown
