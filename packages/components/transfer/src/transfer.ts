import { isNil } from 'lodash-unified'
import {
  buildProps,
  definePropType,
  isArray,
  mutable,
} from '@element-plus/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'

import type {
  ComponentInstance,
  ExtractPublicPropTypes,
  h as H,
  VNode,
} from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import type Transfer from './transfer.vue'

export type TransferKey = string | number
export type TransferDirection = 'left' | 'right'

export type TransferDataItem = Record<string, any>

export type renderContent<T extends TransferDataItem = TransferDataItem> = (
  h: typeof H,
  option: T
) => VNode | VNode[]

export interface TransferFormat {
  noChecked?: string
  hasChecked?: string
}

export interface TransferPropsAlias {
  label?: string
  key?: string
  disabled?: string
}

export interface TransferCheckedState {
  leftChecked: TransferKey[]
  rightChecked: TransferKey[]
}

export const LEFT_CHECK_CHANGE_EVENT = 'left-check-change'
export const RIGHT_CHECK_CHANGE_EVENT = 'right-check-change'

export interface TransferProps<T extends TransferDataItem = TransferDataItem> {
  /**
   * @description 数据源
   */
  data?: T[]
  /**
   * @description 自定义列表标题
   */
  titles?: [string, string]
  /**
   * @description 自定义按钮文案
   */
  buttonTexts?: [string, string]
  /**
   * @description 过滤输入框的占位符
   */
  filterPlaceholder?: string
  /**
   * @description 自定义过滤方法
   */
  filterMethod?: (query: string, item: T) => boolean
  /**
   * @description 左侧列表初始勾选数据项的 key 数组
   */
  leftDefaultChecked?: TransferKey[]
  /**
   * @description 右侧列表初始勾选数据项的 key 数组
   */
  rightDefaultChecked?: TransferKey[]
  /**
   * @description 数据项的自定义渲染函数
   */
  renderContent?: renderContent<T>
  /**
   * @description 绑定值
   */
  modelValue?: TransferKey[]
  /**
   * @description 列表头部勾选状态的文案
   */
  format?: TransferFormat
  /**
   * @description Transfer 是否可过滤
   */
  filterable?: boolean
  /**
   * @description 数据源的 prop 别名
   */
  props?: TransferPropsAlias
  /**
   * @description 目标列表中元素的排序策略。设为 `original` 时保持与数据源相同的顺序；设为 `push` 时新增元素追加到底部；设为 `unshift` 时新增元素插入到顶部
   */
  targetOrder?: 'original' | 'push' | 'unshift'
  /**
   * @description 是否触发表单校验
   */
  validateEvent?: boolean
  /**
   * @description 是否启用虚拟滚动
   */
  virtualScroll?: boolean
  /**
   * @description 虚拟滚动的行高
   */
  itemSize?: number
}

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TransferProps`。
 */
export const transferProps = buildProps({
  /**
   * @description 数据源
   */
  data: {
    type: definePropType<TransferDataItem[]>(Array),
    default: () => [],
  },
  /**
   * @description 自定义列表标题
   */
  titles: {
    type: definePropType<[string, string]>(Array),
    default: () => [],
  },
  /**
   * @description 自定义按钮文案
   */
  buttonTexts: {
    type: definePropType<[string, string]>(Array),
    default: () => [],
  },
  /**
   * @description 过滤输入框的占位符
   */
  filterPlaceholder: String,
  /**
   * @description 自定义过滤方法
   */
  filterMethod: {
    type: definePropType<(query: string, item: TransferDataItem) => boolean>(
      Function
    ),
  },
  /**
   * @description 左侧列表初始勾选数据项的 key 数组
   */
  leftDefaultChecked: {
    type: definePropType<TransferKey[]>(Array),
    default: () => [],
  },
  /**
   * @description 右侧列表初始勾选数据项的 key 数组
   */
  rightDefaultChecked: {
    type: definePropType<TransferKey[]>(Array),
    default: () => [],
  },
  /**
   * @description 数据项的自定义渲染函数
   */
  renderContent: {
    type: definePropType<renderContent>(Function),
  },
  /**
   * @description 绑定值
   */
  modelValue: {
    type: definePropType<TransferKey[]>(Array),
    default: () => [],
  },
  /**
   * @description 列表头部勾选状态的文案
   */
  format: {
    type: definePropType<TransferFormat>(Object),
    default: () => ({}),
  },
  /**
   * @description Transfer 是否可过滤
   */
  filterable: Boolean,
  /**
   * @description 数据源的 prop 别名
   */
  props: {
    type: definePropType<TransferPropsAlias>(Object),
    default: () =>
      mutable({
        label: 'label',
        key: 'key',
        disabled: 'disabled',
      } as const),
  },
  /**
   * @description 目标列表中元素的排序策略。设为 `original` 时保持与数据源相同的顺序；设为 `push` 时新增元素追加到底部；设为 `unshift` 时新增元素插入到顶部
   */
  targetOrder: {
    type: String,
    values: ['original', 'push', 'unshift'],
    default: 'original',
  },
  /**
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否启用虚拟滚动
   */
  virtualScroll: Boolean,
  /**
   * @description 虚拟滚动的行高
   */
  itemSize: {
    type: Number,
    default: 30,
  },
} as const)

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TransferProps`。
 */
export type TransferPropsPublic = ExtractPublicPropTypes<typeof transferProps>

export const transferCheckedChangeFn = (
  value: TransferKey[],
  movedKeys?: TransferKey[]
) => [value, movedKeys].every(isArray) || (isArray(value) && isNil(movedKeys))

export const transferEmits = {
  [CHANGE_EVENT]: (
    value: TransferKey[],
    direction: TransferDirection,
    movedKeys: TransferKey[]
  ) =>
    [value, movedKeys].every(isArray) && ['left', 'right'].includes(direction),
  [UPDATE_MODEL_EVENT]: (value: TransferKey[]) => isArray(value),
  [LEFT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn,
  [RIGHT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn,
}
export type TransferEmits = typeof transferEmits

export type TransferInstance = ComponentInstance<typeof Transfer> &
  ComponentExposed<typeof Transfer>
