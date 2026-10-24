import {
  NOOP,
  buildProps,
  definePropType,
  isNumber,
  isObject,
  isString,
} from '@element-plus/utils'
import { useTooltipContentProps } from '@element-plus/components/tooltip'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '@element-plus/constants'
import { inputProps } from '@element-plus/components/input'

import type { ComponentInstance, ExtractPublicPropTypes } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import type Autocomplete from './autocomplete.vue'
import type { Options, Placement } from '@element-plus/components/popper'
import type { Awaitable } from '@element-plus/utils'
import type { InputProps } from '@element-plus/components/input'
import type { ElTooltipContentProps } from '@element-plus/components/tooltip'

export type AutocompleteDataItem = Record<string, any>
export type AutocompleteData<
  T extends AutocompleteDataItem = AutocompleteDataItem,
> = T[]
export type AutocompleteFetchSuggestionsCallback<
  T extends AutocompleteDataItem = AutocompleteDataItem,
> = (data: AutocompleteData<T>) => void
export type AutocompleteFetchSuggestions<
  T extends AutocompleteDataItem = AutocompleteDataItem,
> =
  | ((
      queryString: string,
      cb: AutocompleteFetchSuggestionsCallback<T>
    ) => Awaitable<AutocompleteData<T> | void>)
  | AutocompleteData<T>

export type AutocompletePlacement =
  'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'

export interface AutocompleteProps<
  T extends AutocompleteDataItem = AutocompleteDataItem,
> extends InputProps {
  /**
   * @description 用于展示的输入建议对象的键名
   */
  valueKey?: string
  /**
   * @description 绑定值
   */
  modelValue?: string | number
  /**
   * @description 输入时的防抖延迟，单位为毫秒
   */
  debounce?: number
  /**
   * @description 弹出菜单的位置
   */
  placement?: AutocompletePlacement
  /**
   * @description 获取输入建议的方法。建议准备就绪后，调用 `callback(data:[])` 将其返回给 Autocomplete
   */
  fetchSuggestions?: AutocompleteFetchSuggestions<T>
  /**
   * @description autocomplete 下拉框的自定义类名
   */
  popperClass?: ElTooltipContentProps['popperClass']
  /**
   * @description autocomplete 下拉框的自定义样式
   */
  popperStyle?: ElTooltipContentProps['popperStyle']
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) 参数
   */
  popperOptions?: Partial<Options>
  /**
   * @description 是否显示箭头
   */
  showArrow?: boolean
  /** @description 弹出框与输入框的距离 */
  offset?: number
  /**
   * @description 输入框聚焦时是否显示建议
   */
  triggerOnFocus?: boolean
  /**
   * @description 无自动匹配时，按回车是否触发 `select` 事件
   */
  selectWhenUnmatched?: boolean
  /**
   * @description 远程搜索时是否隐藏加载图标
   */
  hideLoading?: boolean
  /**
   * @description 下拉框是否传送到 body
   */
  teleported?: ElTooltipContentProps['teleported']
  /**
   * @description 下拉框追加到哪个元素
   */
  appendTo?: ElTooltipContentProps['appendTo']
  /**
   * @description 远程搜索建议默认是否高亮第一项
   */
  highlightFirstItem?: boolean
  /**
   * @description 下拉框宽度是否与输入框一致
   */
  fitInputWidth?: boolean
  /**
   * @description 键盘导航是否首尾循环
   */
  loopNavigation?: boolean
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `AutocompleteProps`
 */
export const autocompleteProps = buildProps({
  ...inputProps,
  /**
   * @description 用于展示的输入建议对象的键名
   */
  valueKey: {
    type: String,
    default: 'value',
  },
  /**
   * @description 绑定值
   */
  modelValue: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 输入时的防抖延迟，单位为毫秒
   */
  debounce: {
    type: Number,
    default: 300,
  },
  /**
   * @description 弹出菜单的位置
   */
  placement: {
    type: definePropType<Placement>(String),
    values: [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
    ],
    default: 'bottom-start',
  },
  /**
   * @description 获取输入建议的方法。建议准备就绪后，调用 `callback(data:[])` 将其返回给 Autocomplete
   */
  fetchSuggestions: {
    type: definePropType<AutocompleteFetchSuggestions>([Function, Array]),
    default: NOOP,
  },
  /**
   * @description autocomplete 下拉框的自定义类名
   */
  popperClass: useTooltipContentProps.popperClass,
  /**
   * @description autocomplete 下拉框的自定义样式
   */
  popperStyle: useTooltipContentProps.popperStyle,
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) 参数
   */
  popperOptions: useTooltipContentProps.popperOptions,
  /**
   * @description 是否显示箭头
   */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 输入框聚焦时是否显示建议
   */
  triggerOnFocus: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 无自动匹配时，按回车是否触发 `select` 事件
   */
  selectWhenUnmatched: Boolean,
  /**
   * @description 远程搜索时是否隐藏加载图标
   */
  hideLoading: Boolean,
  /**
   * @description 下拉框是否传送到 body
   */
  teleported: useTooltipContentProps.teleported,
  /**
   * @description 下拉框追加到哪个元素
   */
  appendTo: useTooltipContentProps.appendTo,
  /**
   * @description 远程搜索建议默认是否高亮第一项
   */
  highlightFirstItem: Boolean,
  /**
   * @description 下拉框宽度是否与输入框一致
   */
  fitInputWidth: Boolean,
  /**
   * @description 键盘导航是否首尾循环
   */
  loopNavigation: {
    type: Boolean,
    default: true,
  },
} as const)

/**
 * @deprecated 自 3.0.0 后移除，请使用 `AutocompleteProps`
 */
export type AutocompletePropsPublic = ExtractPublicPropTypes<
  typeof autocompleteProps
>

export const autocompleteEmits = {
  [UPDATE_MODEL_EVENT]: (value: string | number) =>
    isString(value) || isNumber(value),
  [INPUT_EVENT]: (value: string | number) => isString(value) || isNumber(value),
  [CHANGE_EVENT]: (value: string | number) =>
    isString(value) || isNumber(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  select: (item: Record<string, any>) => isObject(item),
}
export type AutocompleteEmits = typeof autocompleteEmits

export type AutocompleteInstance = ComponentInstance<typeof Autocomplete> &
  ComponentExposed<typeof Autocomplete>
