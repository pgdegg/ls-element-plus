import { placements } from '@popperjs/core'
import { buildProps, definePropType } from '@element-plus/utils'
import {
  useAriaProps,
  useEmptyValuesProps,
  useSizeProp,
} from '@element-plus/hooks'
import { useTooltipContentProps } from '@element-plus/components/tooltip'
import { CircleClose } from '@element-plus/icons-vue'
import { disabledTimeListsProps } from '../props/shared'

import type { Component, ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type { Options } from '@popperjs/core'
import type { Dayjs } from 'dayjs'
import type { Placement } from '@element-plus/components/popper'

export type SingleOrRange<T> = T | [T, T]
export type DateModelType = number | string | Date
export type ModelValueType = DateModelType | number[] | string[] | Date[]
export type DayOrDays = SingleOrRange<Dayjs>
export type DateOrDates = SingleOrRange<Date>
export type UserInput = SingleOrRange<string | null>
export type GetDisabledHours = (role: string, comparingDate?: Dayjs) => number[]
export type GetDisabledMinutes = (
  hour: number,
  role: string,
  comparingDate?: Dayjs
) => number[]
export type GetDisabledSeconds = (
  hour: number,
  minute: number,
  role: string,
  comparingDate?: Dayjs
) => number[]

export const timePickerDefaultProps = buildProps({
  hidePlaceholder: { type: Boolean, default: undefined },
  /** @description 接受紧凑和部分的日期/时间输入 */
  quickInput: Boolean,
  /**
   * @description 该属性决定输入框获得焦点时是否弹出日期选择面板
   */
  automaticDropdown: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 与原生 input 的 `id` 相同
   */
  id: {
    type: definePropType<SingleOrRange<string>>([Array, String]),
  },
  /**
   * @description 与原生 input 的 `name` 相同
   */
  name: {
    type: definePropType<SingleOrRange<string>>([Array, String]),
  },
  /**
   * @description TimePicker 下拉框的自定义类名
   */
  popperClass: useTooltipContentProps.popperClass,
  /**
   * @description TimePicker 下拉框的自定义样式
   */
  popperStyle: useTooltipContentProps.popperStyle,
  /**
   * @description 输入框中显示值的格式
   */
  format: String,
  /**
   * @description 可选，绑定值的格式。未指定时，绑定值为 Date 对象
   */
  valueFormat: String,
  /**
   * @description 可选，输入框内部面板中显示日期的格式
   */
  dateFormat: String,
  /**
   * @description 可选，输入框内部面板中显示时间的格式
   */
  timeFormat: String,
  /**
   * @description 选择器的类型
   */
  type: {
    type: String,
    default: '',
  },
  /**
   * @description 是否显示清除按钮
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 自定义清除图标组件
   */
  clearIcon: {
    type: definePropType<string | Component>([String, Object]),
    default: CircleClose,
  },
  /**
   * @description 输入框是否可编辑
   */
  editable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 未选中值时，获得焦点是否用当前时间自动填充输入框。
   */
  saveOnBlur: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 自定义前缀图标组件
   */
  prefixIcon: {
    type: definePropType<string | Component>([String, Object]),
    default: '',
  },
  /**
   * @description Input 的尺寸
   */
  size: useSizeProp,
  /**
   * @description TimePicker 是否只读
   */
  readonly: Boolean,
  /**
   * @description TimePicker 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 非范围模式下的占位符
   */
  placeholder: {
    type: String,
    default: '',
  },
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) 参数
   */
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({}),
  },
  /**
   * @description 绑定值，若为数组，长度应为 2
   */
  modelValue: {
    type: definePropType<ModelValueType | null>([Date, Array, String, Number]),
    default: '',
  },
  /**
   * @description 范围分隔符
   */
  rangeSeparator: {
    type: String,
    default: '-',
  },
  /**
   * @description 范围模式下开始日期的占位符
   */
  startPlaceholder: String,
  /**
   * @description 范围模式下结束日期的占位符
   */
  endPlaceholder: String,
  /**
   * @description 可选，日历的默认日期
   */
  defaultValue: {
    type: definePropType<SingleOrRange<Date>>([Date, Array]),
  },
  /**
   * @description 可选，选择日期范围时使用的时间值
   */
  defaultTime: {
    type: definePropType<SingleOrRange<Date>>([Date, Array]),
  },
  /**
   * @description 是否选择时间范围
   */
  isRange: Boolean,
  ...disabledTimeListsProps,
  /**
   * @description 以某日期为参数、判断该日期是否禁用的函数。应返回 Boolean
   */
  disabledDate: {
    type: Function,
  },
  /**
   * @description 设置自定义 className
   */
  cellClassName: {
    type: Function,
  },
  /**
   * @description 用于设置快捷选项的对象数组
   */
  shortcuts: {
    type: Array,
    default: () => [],
  },
  /**
   * @description 是否使用箭头按钮选择时间
   */
  arrowControl: Boolean,
  /**
   * @description 输入框的 tabindex
   */
  tabindex: {
    type: definePropType<string | number>([String, Number]),
    default: 0,
  },
  /**
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 在范围选择器中取消两个日期面板的联动
   */
  unlinkPanels: Boolean,
  /**
   * @description 范围选择器中只显示一个面板
   */
  singlePanel: Boolean,
  /**
   * @description 下拉框的位置
   */
  placement: {
    type: definePropType<Placement>(String),
    values: placements,
    default: 'bottom',
  },
  /**
   * @description 下拉框可选位置列表
   */
  fallbackPlacements: {
    type: definePropType<Placement[]>(Array),
    default: ['bottom', 'top', 'right', 'left'],
  },
  ...useEmptyValuesProps,
  ...useAriaProps(['ariaLabel']),
  /**
   * @description 是否显示“此刻”按钮
   */
  showNow: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示底部
   */
  showConfirm: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示底部
   */
  showFooter: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示日历周数
   */
  showWeekNumber: Boolean,
} as const)

export type TimePickerDefaultProps = ExtractPropTypes<
  typeof timePickerDefaultProps
>
export type TimePickerDefaultPropsPublic = ExtractPublicPropTypes<
  typeof timePickerDefaultProps
>

export interface PickerOptions {
  isValidValue: (date: DayOrDays) => boolean
  handleKeydownInput: (event: KeyboardEvent) => void
  parseUserInput: (value: UserInput) => DayOrDays
  getRangeAvailableTime: (date: DayOrDays) => DayOrDays
  getDefaultValue: () => DayOrDays
  panelReady: boolean
  handleClear: () => void
  handleFocusPicker?: () => void
  handleCancel?: () => void
}

export const timePickerRangeTriggerProps = buildProps({
  id: {
    type: definePropType<string[]>(Array),
  },
  name: {
    type: definePropType<string[]>(Array),
  },
  modelValue: {
    type: definePropType<UserInput>([Array, String]),
  },
  startPlaceholder: String,
  endPlaceholder: String,
  disabled: Boolean,
} as const)

/**
 * @deprecated 请改用 `timePickerRangeTriggerProps`，未来版本将移除。
 */
export const timePickerRngeTriggerProps = timePickerRangeTriggerProps
