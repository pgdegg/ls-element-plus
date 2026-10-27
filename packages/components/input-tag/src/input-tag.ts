import {
  buildProps,
  definePropType,
  iconPropType,
  isArray,
  isNumber,
  isString,
  isUndefined,
} from '@element-plus/utils'
import { useSizeProp } from '@element-plus/hooks'
import {
  CHANGE_EVENT,
  EVENT_CODE,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '@element-plus/constants'
import { tagProps } from '@element-plus/components/tag/src/tag'
import { CircleClose } from '@element-plus/icons-vue'

import type { ExtractPublicPropTypes } from 'vue'
import type { ComponentSize } from '@element-plus/constants'
import type { PopperEffect } from '@element-plus/components/popper'
import type { TagProps } from '@element-plus/components/tag'
import type { IconPropType } from '@element-plus/utils'

export interface InputTagProps {
  hidePlaceholder?: boolean
  /**
   * @description 绑定值
   */
  modelValue?: string[]
  /**
   * @description 可输入标签的最大数量
   */
  max?: number
  /**
   * @description 标签类型
   */
  tagType?: TagProps['type']
  /**
   * @description 标签 effect
   */
  tagEffect?: TagProps['effect']
  /**
   * @description Tooltip 主题，内置主题：`dark` / `light`
   */
  effect?: PopperEffect
  /**
   * @description 触发输入标签的按键
   */
  trigger?: 'Enter' | 'Space'
  /**
   * @description 标签是否可拖拽
   */
  draggable?: boolean
  /**
   * @description 匹配到分隔符时添加标签
   */
  delimiter?: string | RegExp
  /**
   * @description 输入框尺寸
   */
  size?: ComponentSize
  /**
   * @description 是否显示清除按钮
   */
  clearable?: boolean
  /**
   * @description 自定义清除图标组件
   */
  clearIcon?: IconPropType
  /**
   * @description 是否禁用 input-tag
   */
  disabled?: boolean
  /**
   * @description 是否触发表单校验
   */
  validateEvent?: boolean
  /**
   * @description 原生 input 的 readonly
   */
  readonly?: boolean
  /**
   * @description 原生 input 的 autofocus
   */
  autofocus?: boolean
  /**
   * @description 与原生 input 的 `id` 相同
   */
  id?: string
  /**
   * @description 与原生 input 的 `tabindex` 相同
   */
  tabindex?: string | number
  /**
   * @description 与原生 input 的 `maxlength` 相同
   */
  maxlength?: string | number
  /**
   * @description 与原生 input 的 `minlength` 相同
   */
  minlength?: string | number
  /**
   * @description 输入框的 placeholder
   */
  placeholder?: string
  /**
   * @description 原生 input 的 autocomplete
   * - 当联合类型中字面量类型数量超过 315 时会出现 TS2590 错误，见：https://github.com/vuejs/core/issues/10514
   */
  autocomplete?: string // HTMLInputElement['autocomplete']
  /**
   * @description 输入框失焦时是否保存输入值
   */
  saveOnBlur?: boolean
  /**
   * @description 是否将标签折叠为文本
   */
  collapseTags?: boolean
  /**
   * @description 鼠标悬停在 collapse-tags 文本时是否显示所有已选标签。使用此功能时，`collapse-tags` 必须为 true
   */
  collapseTagsTooltip?: boolean
  /**
   * @description 显示的最大标签数量。使用此功能时，`collapse-tags` 必须为 true
   */
  maxCollapseTags?: number
  /**
   * @description 原生 `aria-label` 属性
   */
  ariaLabel?: string
}

/**
 * @deprecated 3.0.0 后移除，请改用 `InputTagProps`。
 */
export const inputTagProps = buildProps({
  /** @description 是否隐藏占位文本；默认在禁用或只读时隐藏，false 强制显示。 */
  hidePlaceholder: { type: Boolean, default: undefined },
  /**
   * @description 绑定值
   */
  modelValue: {
    type: definePropType<string[]>(Array),
  },
  /**
   * @description 可输入标签的最大数量
   */
  max: Number,
  /**
   * @description 标签类型
   */
  tagType: { ...tagProps.type, default: 'info' },
  /**
   * @description 标签 effect
   */
  tagEffect: tagProps.effect,
  /**
   * @description Tooltip 主题，内置主题：`dark` / `light`
   */
  effect: {
    type: definePropType<PopperEffect>(String),
    default: 'light',
  },
  /**
   * @description 触发输入标签的按键
   */
  trigger: {
    type: definePropType<'Enter' | 'Space'>(String),
    default: EVENT_CODE.enter,
  },
  /**
   * @description 标签是否可拖拽
   */
  draggable: Boolean,
  /**
   * @description 匹配到分隔符时添加标签
   */
  delimiter: {
    type: [String, RegExp],
    default: '',
  },
  /**
   * @description 输入框尺寸
   */
  size: useSizeProp,
  /**
   * @description 是否显示清除按钮
   */
  clearable: Boolean,
  /**
   * @description 自定义清除图标组件
   */
  clearIcon: {
    type: iconPropType,
    default: CircleClose,
  },
  /**
   * @description 是否禁用 input-tag
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 原生 input 的 readonly
   */
  readonly: Boolean,
  /**
   * @description 原生 input 的 autofocus
   */
  autofocus: Boolean,
  /**
   * @description 与原生 input 的 `id` 相同
   */
  id: {
    type: String,
    default: undefined,
  },
  /**
   * @description 与原生 input 的 `tabindex` 相同
   */
  tabindex: {
    type: [String, Number],
    default: 0,
  },
  /**
   * @description 与原生 input 的 `maxlength` 相同
   */
  maxlength: {
    type: [String, Number],
  },
  /**
   * @description 与原生 input 的 `minlength` 相同
   */
  minlength: {
    type: [String, Number],
  },
  /**
   * @description 输入框的 placeholder
   */
  placeholder: String,
  /**
   * @description 原生 input 的 autocomplete
   */
  autocomplete: {
    type: definePropType<HTMLInputElement['autocomplete']>(String),
    default: 'off',
  },
  /**
   * @description 输入框失焦时是否保存输入值
   */
  saveOnBlur: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否将标签折叠为文本
   */
  collapseTags: Boolean,
  /**
   * @description 鼠标悬停在 collapse-tags 文本时是否显示所有已选标签。使用此功能时，`collapse-tags` 必须为 true
   */
  collapseTagsTooltip: Boolean,
  /**
   * @description 显示的最大标签数量。使用此功能时，`collapse-tags` 必须为 true
   */
  maxCollapseTags: {
    type: Number,
    default: 1,
  },
  /**
   * @description 原生 `aria-label` 属性
   */
  ariaLabel: String,
} as const)

/**
 * @deprecated 3.0.0 后移除，请改用 `InputTagProps`。
 */
export type InputTagPropsPublic = ExtractPublicPropTypes<typeof inputTagProps>

export const inputTagEmits = {
  [UPDATE_MODEL_EVENT]: (value?: string[]) =>
    isArray(value) || isUndefined(value),
  [CHANGE_EVENT]: (value?: string[]) => isArray(value) || isUndefined(value),
  [INPUT_EVENT]: (value: string) => isString(value),
  'add-tag': (value: string | string[]) => isString(value) || isArray(value),
  'remove-tag': (value: string, index: number) =>
    isString(value) && isNumber(index),
  'drag-tag': (oldIndex: number, newIndex: number, value: string) =>
    isNumber(oldIndex) && isNumber(newIndex) && isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
}
export type InputTagEmits = typeof inputTagEmits
