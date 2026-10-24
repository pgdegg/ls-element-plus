import { buildProps, definePropType } from '@element-plus/utils'
import { disabledTimeListsProps } from '@element-plus/components/time-picker/src/props/shared'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type {
  ModelValueType,
  SingleOrRange,
} from '@element-plus/components/time-picker'
import type { DatePickerType } from '../types'

export const datePickerPanelProps = buildProps({
  /**
   * @description 可选，绑定值的格式。若未指定，绑定值将为 Date 对象
   */
  valueFormat: String,
  /**
   * @description 可选，输入框内面板中显示的日期格式
   */
  dateFormat: String,
  /**
   * @description 可选，输入框内面板中显示的时间格式
   */
  timeFormat: String,
  /**
   * @description 选择器是否被禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 绑定值；若为数组，长度应为 2
   */
  modelValue: {
    type: definePropType<ModelValueType>([Date, Array, String, Number]),
    default: '',
  },
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
   * @description 一个函数，以日期作为参数判断该日期是否被禁用，应返回 Boolean
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
   * @description 取消 range-picker 中两个日期面板的联动
   */
  unlinkPanels: Boolean,
  /**
   * @description 是否显示现在按钮
   */
  showNow: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示确认按钮
   */
  showConfirm: Boolean,
  /**
   * @description 是否显示底部栏
   */
  showFooter: Boolean,
  /**
   * @description 是否显示日历周序号
   */
  showWeekNumber: Boolean,
  /**
   * @description 选择器的类型
   */
  type: {
    type: definePropType<DatePickerType>(String),
    default: 'date',
  },
  /**
   * @description 范围模式下是否显示清除按钮
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 日期选择器是否带边框
   */
  border: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 输入框是否可编辑
   */
  editable: {
    type: Boolean,
    default: true,
  },
} as const)

export type DatePickerPanelProps = ExtractPropTypes<typeof datePickerPanelProps>
export type DatePickerPanelPropsPublic = ExtractPublicPropTypes<
  typeof datePickerPanelProps
>
