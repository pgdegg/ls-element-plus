import { placements } from '@popperjs/core'
import { CommonProps } from '@element-plus/components/cascader-panel'
import {
  buildProps,
  definePropType,
  iconPropType,
  isBoolean,
} from '@element-plus/utils'
import { useEmptyValuesProps, useSizeProp } from '@element-plus/hooks'
import { useTooltipContentProps } from '@element-plus/components/tooltip'
import { tagProps } from '@element-plus/components/tag'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { CircleClose } from '@element-plus/icons-vue'

import type { StyleValue } from 'vue'
import type { UseEmptyValuesProps } from '@element-plus/hooks'
import type { ComponentSize } from '@element-plus/constants'
import type { Placement, PopperEffect } from '@element-plus/components/popper'
import type {
  CascaderCommonProps,
  CascaderNode,
  CascaderValue,
} from '@element-plus/components/cascader-panel'
import type { TagProps } from '@element-plus/components/tag'
import type { ClassValue, IconPropType } from '@element-plus/utils'

export interface CascaderComponentProps
  extends CascaderCommonProps, UseEmptyValuesProps {
  hidePlaceholder?: boolean
  /**
   * @description 输入框尺寸
   */
  size?: ComponentSize
  /**
   * @description 输入框占位文本
   */
  placeholder?: string
  /**
   * @description Cascader 是否禁用
   */
  disabled?: boolean
  /**
   * @description 选中值是否可清除
   */
  clearable?: boolean
  /**
   * @description 自定义清除图标组件
   */
  clearIcon?: IconPropType
  /**
   * @description 选项是否可搜索
   */
  filterable?: boolean
  /**
   * @description 是否高亮第一个可用选项
   */
  defaultFirstOption?: boolean
  /**
   * @description 过滤输入框的绑定值
   */
  filterValue?: string
  /**
   * @description 自定义搜索逻辑，第一个参数为 `node`，第二个为 `keyword`，需返回布尔值表示是否命中。
   */
  /** 默认过滤器额外搜索的节点数据字段。 */
  filterKeys?: string[]
  filterMethod?: (node: CascaderNode, keyword: string) => boolean
  /**
   * @description 选项标签分隔符
   */
  separator?: string
  /**
   * @description 是否在输入框中展示选中值的所有层级
   */
  showAllLevels?: boolean
  /**
   * @description 多选模式下是否折叠标签
   */
  collapseTags?: boolean
  /**
   * @description 最多显示的标签数量。使用此项需将 collapse-tags 设为 true
   */
  maxCollapseTags?: number
  /**
   * @description 鼠标悬停在折叠标签文本上时是否显示全部已选标签。使用此项需将 collapse-tags 设为 true
   */
  collapseTagsTooltip?: boolean
  /**
   * @description 折叠标签 tooltip 的最大高度，单位为像素。使用此项需将 collapse-tags-tooltip 设为 true
   */
  maxCollapseTagsTooltipHeight?: string | number
  /**
   * @description 输入过滤关键词时的防抖延迟，单位为毫秒
   */
  debounce?: number
  /**
   * @description 过滤前的钩子函数，参数为待过滤的值。若返回 `false`，或返回 `Promise` 后被拒绝，则中止过滤
   */
  beforeFilter?: (value: string) => boolean | Promise<any>
  /**
   * @description 下拉框位置
   */
  placement?: Placement
  /**
   * @description 下拉框可选位置列表
   */
  fallbackPlacements?: Placement[]
  /**
   * @description Cascader 下拉框的自定义类名
   */
  popperClass?: ClassValue
  /**
   * @description Cascader 下拉框的自定义样式
   */
  popperStyle?: StyleValue
  /**
   * @description 弹层是否被传送
   */
  teleported?: boolean
  /**
   * @description tooltip 主题，内置主题：`dark` / `light`
   */
  effect?: PopperEffect
  /**
   * @description 标签类型
   */
  tagType?: TagProps['type']
  /**
   * @description 标签效果
   */
  tagEffect?: TagProps['effect']
  /**
   * @description 是否触发表单校验
   */
  validateEvent?: boolean
  /**
   * @description 下拉框未激活且 `persistent` 为 `false` 时，下拉框将被销毁
   */
  persistent?: boolean
  /**
   * @description 希望整洁时使用 `parent`（如“整个集合”而非列出 100 项）
   * 每项都很重要时使用 `child`（如重要设置）
   */
  showCheckedStrategy?: 'parent' | 'child'
  /**
   * @description 点击节点时是否勾选或取消勾选该节点
   */
  checkOnClickNode?: boolean
  /**
   * @description 是否显示单选框或复选框前缀
   */
  showPrefix?: boolean
  /**
   * @description 建议面板宽度是否与输入框一致；若值为 `number`，则宽度固定
   */
  fitInputWidth?: boolean | number
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `CascaderComponentProps`
 */
export const cascaderProps = buildProps({
  /** @description 是否隐藏占位文本；默认在禁用或只读时隐藏，false 强制显示。 */
  hidePlaceholder: { type: Boolean, default: undefined },
  ...CommonProps,
  /**
   * @description 输入框尺寸
   */
  size: useSizeProp,
  /**
   * @description 输入框占位文本
   */
  placeholder: String,
  /**
   * @description Cascader 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 选中值是否可清除
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
   * @description 选项是否可搜索
   */
  filterable: Boolean,
  /**
   * @description 是否高亮第一个可用选项
   */
  defaultFirstOption: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 过滤输入框的绑定值
   */
  filterValue: {
    type: String,
    default: undefined,
  },
  /**
   * @description 自定义搜索逻辑，第一个参数为 `node`，第二个为 `keyword`，需返回布尔值表示是否命中。
   */
  filterKeys: { type: definePropType<string[]>(Array), default: () => [] },
  filterMethod: {
    type: definePropType<(node: CascaderNode, keyword: string) => boolean>(
      Function
    ),
    default: (node: CascaderNode, keyword: string) =>
      node.text.includes(keyword),
  },
  /**
   * @description 选项标签分隔符
   */
  separator: {
    type: String,
    default: ' / ',
  },
  /**
   * @description 是否在输入框中展示选中值的所有层级
   */
  showAllLevels: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 多选模式下是否折叠标签
   */
  collapseTags: Boolean,
  /**
   * @description 最多显示的标签数量。使用此项需将 collapse-tags 设为 true
   */
  maxCollapseTags: {
    type: Number,
    default: 1,
  },
  /**
   * @description 鼠标悬停在折叠标签文本上时是否显示全部已选标签。使用此项需将 collapse-tags 设为 true
   */
  collapseTagsTooltip: Boolean,
  /**
   * @description 折叠标签 tooltip 的最大高度，单位为像素。使用此项需将 collapse-tags-tooltip 设为 true
   */
  maxCollapseTagsTooltipHeight: {
    type: [String, Number],
  },
  /**
   * @description 输入过滤关键词时的防抖延迟，单位为毫秒
   */
  debounce: {
    type: Number,
    default: 300,
  },
  /**
   * @description 过滤前的钩子函数，参数为待过滤的值。若返回 `false`，或返回 `Promise` 后被拒绝，则中止过滤
   */
  beforeFilter: {
    type: definePropType<(value: string) => boolean | Promise<any>>(Function),
    default: () => true,
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
    default: ['bottom-start', 'bottom', 'top-start', 'top', 'right', 'left'],
  },
  /**
   * @description Cascader 下拉框的自定义类名
   */
  popperClass: useTooltipContentProps.popperClass,
  /**
   * @description Cascader 下拉框的自定义样式
   */
  popperStyle: useTooltipContentProps.popperStyle,
  /**
   * @description 弹层是否被传送
   */
  teleported: useTooltipContentProps.teleported,
  /**
   * @description tooltip 主题，内置主题：`dark` / `light`
   */
  effect: {
    type: definePropType<PopperEffect>(String),
    default: 'light',
  },
  /**
   * @description 标签类型
   */

  tagType: { ...tagProps.type, default: 'info' },
  /**
   * @description 标签效果
   */
  tagEffect: { ...tagProps.effect, default: 'light' },
  /**
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 下拉框未激活且 `persistent` 为 `false` 时，下拉框将被销毁
   */
  persistent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 希望整洁时使用 `parent`（如“整个集合”而非列出 100 项）
   * 每项都很重要时使用 `child`（如重要设置）
   */
  showCheckedStrategy: {
    type: String,
    values: ['parent', 'child'],
    default: 'child',
  },
  /**
   * @description 点击节点时是否勾选或取消勾选该节点
   */
  checkOnClickNode: Boolean,
  /**
   * @description 是否显示单选框或复选框前缀
   */
  showPrefix: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 建议面板宽度是否与输入框一致；若值为 `number`，则宽度固定
   */
  fitInputWidth: {
    type: [Boolean, Number],
    default: false,
  },
  ...useEmptyValuesProps,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emitChangeFn = (value: CascaderValue | null | undefined) => true

export const cascaderEmits = {
  [UPDATE_MODEL_EVENT]: emitChangeFn,
  [CHANGE_EVENT]: emitChangeFn,
  'update:filterValue': (val: string) => typeof val === 'string',
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  visibleChange: (val: boolean) => isBoolean(val),
  expandChange: (val: CascaderValue) => !!val,
  removeTag: (val: CascaderNode['valueByOption']) => !!val,
}

export type CascaderEmits = typeof cascaderEmits
