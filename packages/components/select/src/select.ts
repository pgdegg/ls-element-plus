import { placements } from '@popperjs/core'
import { scrollbarEmits } from '@element-plus/components/scrollbar'
import { useAriaProps, useSizeProp } from '@element-plus/hooks'
import { emptyValuesPropDefs } from '@element-plus/hooks/use-empty-values/index'
import { buildProps, definePropType, iconPropType } from '@element-plus/utils'
import { tooltipContentPropDefs } from '@element-plus/components/tooltip/src/content'
import { ArrowDown, CircleClose } from '@element-plus/icons-vue'
import { tagPropDefs } from '@element-plus/components/tag/src/tag'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { defaultProps } from '@element-plus/components/select-v2/src/useProps'

import type { ClassValue, EmitFn } from '@element-plus/utils'
import type { ExtractPropTypes, ExtractPublicPropTypes, StyleValue } from 'vue'
import type Select from './select.vue'
import type {
  Options,
  Placement,
  PopperEffect,
} from '@element-plus/components/popper'
import type { OptionPublicInstance, OptionValue } from './type'
import type { Props } from '@element-plus/components/select-v2/src/useProps'

/**
 * @description Tag 提示框（tooltip）配置接口
 */
export interface TagTooltipProps {
  appendTo?: string | HTMLElement
  placement?: Placement
  fallbackPlacements?: Placement[]
  effect?: PopperEffect
  popperClass?: ClassValue
  popperStyle?: StyleValue
  transition?: string
  teleported?: boolean
  popperOptions?: Partial<Options>
  showAfter?: number
  hideAfter?: number
  autoClose?: number
  offset?: number
}

export const selectProps = buildProps({
  /** @description 是否隐藏占位文本；默认在禁用或只读时隐藏，false 强制显示。 */
  hidePlaceholder: { type: Boolean, default: undefined },
  /** @description 字符串形式多选值的分隔符 */
  separator: String,
  /** @description 选中项的展示标签 */
  label: { type: definePropType<string | string[]>([String, Array]) },
  /** @description 本地筛选时纳入的额外选项值字段 */
  filterKeys: { type: definePropType<string[]>(Array), default: () => [] },
  /**
   * @description select 输入框的 name 属性
   */
  name: String,
  /**
   * @description 原生 input id
   */
  id: String,
  /**
   * @description 绑定值
   */
  modelValue: {
    type: definePropType<OptionValue | OptionValue[] | null>([
      Array,
      String,
      Number,
      Boolean,
      Object,
    ]),
    default: undefined,
  },
  /**
   * @description select 输入框的 autocomplete 属性
   */
  autocomplete: {
    type: String,
    default: 'off',
  },
  /**
   * @description 对于不可筛选的 Select，该 prop 决定输入框聚焦时是否弹出选项菜单
   */
  automaticDropdown: Boolean,
  /**
   * @description Input 的尺寸
   */
  size: useSizeProp,
  /**
   * @description Tooltip 主题，内置主题：`dark` / `light`
   */
  effect: {
    type: definePropType<PopperEffect>(String),
    default: 'light',
  },
  /**
   * @description Select 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description Select 是否可清空
   */
  clearable: Boolean,
  /**
   * @description Select 是否可筛选
   */
  filterable: Boolean,
  /**
   * @description 筛选输入框的绑定值
   */
  filterValue: {
    type: String,
    default: undefined,
  },
  /**
   * @description 是否允许创建新条目。使用此项时 `filterable` 必须为 true
   */
  allowCreate: Boolean,
  /**
   * @description Select 是否正在从服务器加载数据
   */
  loading: Boolean,
  /**
   * @description 选项是否从服务器加载
   */
  remote: Boolean,
  /**
   * @description 远程模式下，下拉框是否仅在有输入内容时出现，而不是点击或聚焦时始终显示
   */
  remoteShowOnInput: Boolean,
  /**
   * @description 输入值变化时调用的函数，其参数为当前输入值。使用此项时 `filterable` 必须为 true
   */
  remoteMethod: {
    type: definePropType<(query: string) => void>(Function),
  },
  /**
   * @description Select 下拉框的自定义类名
   */
  popperClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: '',
  },
  /**
   * @description Select 下拉框的自定义样式
   */
  popperStyle: {
    type: definePropType<StyleValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) 参数
   */
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({}) as Partial<Options>,
  },
  /**
   * @description 从服务器加载数据时显示的文字，默认 'Loading'
   */
  loadingText: String,
  /**
   * @description 没有数据匹配筛选条件时显示的文字，也可使用 `empty` 插槽，默认 'No matching data'
   */
  noMatchText: String,
  /**
   * @description 无选项时显示的文字，也可使用 empty 插槽，默认 'No Data'
   */
  noDataText: String,
  /**
   * @description 自定义筛选方法，第一个参数为当前输入值。使用此项时 `filterable` 必须为 true
   */
  filterMethod: {
    type: definePropType<
      (query: string, option: OptionPublicInstance) => boolean
    >(Function),
  },
  /**
   * @description 是否启用多选
   */
  multiple: Boolean,
  /**
   * @description `multiple` 为 `true` 时用户可选择的最大选项数，设为 0 表示不限
   */
  multipleLimit: {
    type: Number,
    default: 0,
  },
  /**
   * @description 占位文本，默认 'Select'
   */
  placeholder: {
    type: String,
  },
  /**
   * @description 按下回车时选中第一个匹配项。需配合 `filterable` 使用
   */
  defaultFirstOption: Boolean,
  /**
   * @description 当 `multiple` 且 `filter` 为 true 时，选中选项后是否保留当前关键字
   */
  reserveKeyword: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 值的唯一标识键名，当值为对象时必填
   */
  valueKey: {
    type: String,
    default: 'value',
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
   * @description 自定义清除图标组件
   */
  clearIcon: {
    type: iconPropType,
    default: CircleClose,
  },
  /**
   * @description 下拉框宽度是否与输入框相同
   */
  fitInputWidth: Boolean,
  /**
   * @description 自定义后缀图标组件
   */
  suffixIcon: {
    type: iconPropType,
    default: ArrowDown,
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
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },

  /**
   * @description 是否显示箭头
   */
  showArrow: {
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
  options: {
    type: definePropType<Record<string, any>[]>(Array),
  },
  props: {
    type: definePropType<SelectOptionProps>(Object),
    default: () => defaultProps,
  },
  ...emptyValuesPropDefs,
  ...useAriaProps(['ariaLabel']),
})
/* eslint-disable @typescript-eslint/no-unused-vars */
export const selectEmits = {
  'update:label': (value: string | string[] | undefined) =>
    value == null || typeof value === 'string' || Array.isArray(value),
  // todo: 使用泛型消除 any
  [UPDATE_MODEL_EVENT]: (val: SelectProps['modelValue'] | any) => true,
  [CHANGE_EVENT]: (val: SelectProps['modelValue'] | any) => true,
  'update:filterValue': (val: string) => typeof val === 'string',
  'query-change': (val: string) => typeof val === 'string',
  'popup-scroll': scrollbarEmits.scroll,
  'end-reached': scrollbarEmits['end-reached'],
  'remove-tag': (val: unknown) => true,
  'visible-change': (visible: boolean) => true,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export type SelectProps = ExtractPropTypes<typeof selectProps>
export type SelectPropsPublic = ExtractPublicPropTypes<typeof selectProps>
export type SelectEmits = EmitFn<typeof selectEmits>
export type SelectInstance = InstanceType<typeof Select> & unknown
export type SelectOptionProps = Props
