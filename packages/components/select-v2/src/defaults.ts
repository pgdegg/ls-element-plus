import { placements } from '@popperjs/core'
import { useAriaProps, useSizeProp } from '@element-plus/hooks'
import { emptyValuesPropDefs } from '@element-plus/hooks/use-empty-values/index'
import {
  buildProps,
  definePropType,
  iconPropType,
  isBoolean,
  isNumber,
} from '@element-plus/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { scrollbarEmits } from '@element-plus/components/scrollbar'
import { tooltipContentPropDefs } from '@element-plus/components/tooltip/src/content'
import { ArrowDown, CircleClose } from '@element-plus/icons-vue'
import { tagPropDefs } from '@element-plus/components/tag/src/tag'
import { defaultProps } from './useProps'

import type SelectV2 from './select.vue'
import type { Option, OptionType } from './select.types'
import type { Props } from './useProps'
import type { EmitFn } from '@element-plus/utils/vue/typescript'
import type {
  CSSProperties,
  ExtractPropTypes,
  ExtractPublicPropTypes,
} from 'vue'
import type {
  Options,
  Placement,
  PopperEffect,
} from '@element-plus/components/popper'

/**
 * @description Tag 提示框（tooltip）配置接口
 */
export interface TagTooltipProps {
  appendTo?: string | HTMLElement
  placement?: Placement
  fallbackPlacements?: Placement[]
  effect?: PopperEffect
  popperClass?: string
  popperStyle?: string | CSSProperties
  transition?: string
  teleported?: boolean
  popperOptions?: Partial<Options>
  showAfter?: number
  hideAfter?: number
  autoClose?: number
  offset?: number
}

export const selectV2Props = buildProps({
  /** @description 是否隐藏占位文本；默认在禁用或只读时隐藏，false 强制显示。 */
  hidePlaceholder: { type: Boolean, default: undefined },
  /** @description 字符串形式多选值的分隔符 */
  separator: String,
  filterKeys: { type: definePropType<string[]>(Array), default: () => [] },
  /** @description 选中项的展示标签 */
  label: { type: definePropType<string | string[]>([String, Array]) },
  /**
   * @description 是否允许创建新条目。使用此项时 `filterable` 必须为 true
   */
  allowCreate: Boolean,
  /**
   * @description select 输入框的自动补全
   */
  autocomplete: {
    type: definePropType<'none' | 'both' | 'list' | 'inline'>(String),
    default: 'none',
  },
  /**
   * @description 对于不可筛选的 Select，该 prop 决定输入框聚焦时是否弹出选项菜单
   */
  automaticDropdown: Boolean,
  /**
   * @description Select 是否可清空
   */
  clearable: Boolean,
  /**
   * @description 自定义清除图标
   */
  clearIcon: {
    type: iconPropType,
    default: CircleClose,
  },
  /**
   * @description Tooltip 主题，内置主题：`dark` / `light`
   */
  effect: {
    type: definePropType<PopperEffect>(String),
    default: 'light',
  },
  /**
   * @description 多选时是否将标签折叠为一段文本
   */
  collapseTags: Boolean,
  /**
   * @description 鼠标悬停在折叠标签文本上时是否显示全部已选标签。使用此项时 `collapse-tags` 必须为 true
   */
  collapseTagsTooltip: Boolean,
  /**
   * @description 折叠标签 tooltip 的配置对象。使用此项时 `collapse-tags` 和 `collapse-tags-tooltip` 必须为 true
   */
  tagTooltip: {
    type: definePropType<TagTooltipProps>(Object),
    default: () => ({}),
  },
  /**
   * @description 最多显示的标签数量。使用此项时 `collapse-tags` 必须为 true
   */
  maxCollapseTags: {
    type: Number,
    default: 1,
  },
  /**
   * @description
   */
  defaultFirstOption: Boolean,
  /**
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 可变选项尺寸下的预估条目高度。省略时默认使用固定的 `itemHeight`。
   */
  estimatedOptionHeight: {
    type: Number,
    default: undefined,
  },
  /**
   * @description Select 是否可筛选
   */
  filterable: Boolean,
  /**
   * @description 自定义筛选方法，第一个参数为当前输入值。使用此项时 `filterable` 必须为 true
   */
  filterMethod: {
    type: definePropType<(query: string) => void>(Function),
  },
  /**
   * @description 下拉面板高度，每项 34px
   */
  height: {
    type: Number,
    default: 274, // 与 select 下拉菜单相同
  },
  /**
   * @description 下拉条目的高度
   */
  itemHeight: {
    type: Number,
    default: 34,
  },
  /**
   * @description 原生 input id
   */
  id: String,
  /**
   * @description Select 是否正在从服务器加载数据
   */
  loading: Boolean,
  /**
   * @description 从服务器加载数据时显示的文字，默认 'Loading'
   */
  loadingText: String,
  /**
   * @description 绑定值
   */
  modelValue: {
    type: definePropType<
      any[] | string | number | boolean | Record<string, any> | any
    >([Array, String, Number, Boolean, Object]),
    default: undefined,
  },
  /**
   * @description 是否多选
   */
  multiple: Boolean,
  /**
   * @description multiple 为 true 时用户可选择的最大选项数，设为 0 表示不限
   */
  multipleLimit: {
    type: Number,
    default: 0,
  },
  /**
   * @description select 输入框的 name 属性
   */
  name: String,
  /**
   * @description 无选项时显示的文字，也可使用 empty 插槽，默认 'No Data'
   */
  noDataText: String,
  /**
   * @description 没有数据匹配筛选条件时显示的文字，也可使用 `empty` 插槽，默认 'No matching data'
   */
  noMatchText: String,
  /**
   * @description 输入值变化时调用的函数，其参数为当前输入值。使用此项时 `filterable` 必须为 true
   */
  remoteMethod: {
    type: definePropType<(query: string) => void>(Function),
  },
  /**
   * @description 选中筛选出的选项后是否保留关键字。
   */
  reserveKeyword: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 选项数据，`value` 和 `label` 的键名可通过 `props` 自定义
   */
  options: {
    type: definePropType<OptionType[]>(Array),
    required: true,
  },
  /**
   * @description 占位文本，默认 'Please select'
   */
  placeholder: {
    type: String,
  },
  /**
   * @description 下拉框是否被 teleport；为 `true` 时将挂载到 `append-to` 指定的位置
   */
  teleported: tooltipContentPropDefs.teleported,
  /**
   * @description 当下拉框不处于激活状态且 `persistent` 为 `false` 时，下拉框将被销毁
   */
  persistent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description Select 下拉框的自定义类名
   */
  popperClass: tooltipContentPropDefs.popperClass,
  /**
   * @description Select 下拉框的自定义样式
   */
  popperStyle: tooltipContentPropDefs.popperStyle,
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) 参数
   */
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({}) as Partial<Options>,
  },
  /**
   * @description 是否从服务器搜索数据
   */
  remote: Boolean,
  /**
   * @description 远程搜索时的防抖延迟，单位毫秒
   */
  debounce: {
    type: Number,
    default: 300,
  },
  /**
   * @description 组件尺寸
   */
  size: useSizeProp,
  /**
   * @description 配置项，见下表
   */
  props: {
    type: definePropType<Props>(Object),
    default: () => defaultProps,
  },
  /**
   * @description 值的唯一标识键名，当值为对象时必填
   */
  valueKey: {
    type: String,
    default: 'value',
  },
  /**
   * @description 控制滚动条是否始终显示
   */
  scrollbarAlwaysOn: Boolean,
  /**
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 下拉框偏移量
   */
  offset: {
    type: Number,
    default: 12,
  },
  /**
   * @description 远程搜索时是否显示后缀图标
   */
  remoteShowSuffix: Boolean,
  /**
   * @description 是否显示箭头
   */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 下拉框位置
   */
  placement: {
    type: definePropType<Placement>(String),
    values: placements,
    default: 'bottom-start',
  },
  /**
   * @description 下拉框可选位置列表
   */
  fallbackPlacements: {
    type: definePropType<Placement[]>(Array),
    default: ['bottom-start', 'top-start', 'right', 'left'],
  },
  /**
   * @description 标签类型
   */
  tagType: { ...tagPropDefs.type, default: 'info' },
  /**
   * @description 标签效果
   */
  tagEffect: { ...tagPropDefs.effect, default: 'light' },
  /**
   * @description input 的 tabindex
   */
  tabindex: {
    type: [String, Number],
    default: 0,
  },
  /**
   * @description 下拉框挂载到哪个元素
   */
  appendTo: tooltipContentPropDefs.appendTo,
  /**
   * @description 为 `true` 时，下拉面板宽度与输入框相同；
   * 为 `false` 时，宽度根据 `label` 的值自动计算；
   * 也可设为数字以使用固定宽度
   */
  fitInputWidth: {
    type: [Boolean, Number],
    default: true,
    validator(val) {
      return isBoolean(val) || isNumber(val)
    },
  },
  suffixIcon: {
    type: iconPropType,
    default: ArrowDown,
  },
  ...emptyValuesPropDefs,
  ...useAriaProps(['ariaLabel']),
} as const)

export const optionV2Props = buildProps({
  data: Array,
  disabled: Boolean,
  hovering: Boolean,
  item: {
    type: definePropType<Option>(Object),
    required: true,
  },
  index: Number,
  style: Object,
  selected: Boolean,
  created: Boolean,
} as const)

/* eslint-disable @typescript-eslint/no-unused-vars */
export const selectV2Emits = {
  'update:label': (value: string | string[] | undefined) =>
    value == null || typeof value === 'string' || Array.isArray(value),
  [UPDATE_MODEL_EVENT]: (val: SelectV2Props['modelValue']) => true,
  [CHANGE_EVENT]: (val: SelectV2Props['modelValue']) => true,
  'end-reached': scrollbarEmits['end-reached'],
  'remove-tag': (val: unknown) => true,
  'visible-change': (visible: boolean) => true,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
}
export const optionV2Emits = {
  hover: (index?: number) => isNumber(index),
  select: (val: Option, index?: number) => true,
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export type SelectV2Props = ExtractPropTypes<typeof selectV2Props>
export type SelectV2PropsPublic = ExtractPublicPropTypes<typeof selectV2Props>
export type OptionV2Props = ExtractPropTypes<typeof optionV2Props>
export type OptionV2PropsPublic = ExtractPublicPropTypes<typeof optionV2Props>
export type SelectV2EmitFn = EmitFn<typeof selectV2Emits>
export type OptionV2EmitFn = EmitFn<typeof optionV2Emits>

export type SelectV2Instance = InstanceType<typeof SelectV2> & unknown
