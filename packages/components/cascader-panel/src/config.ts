import { computed } from 'vue'
import { NOOP, buildProps, definePropType } from '@element-plus/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'

import type { PropType } from 'vue'
import type {
  CascaderConfig,
  CascaderNodePathValue,
  CascaderOption,
  CascaderProps,
  CascaderValue,
  RenderLabel,
} from './types'

export interface CascaderCommonProps {
  /**
   * @description 指定节点对象的哪个键作为节点的值
   */
  modelValue?: CascaderValue | null
  /**
   * @description 选项数据，`value` 和 `label` 的键可通过 `CascaderProps` 自定义。
   */
  options?: CascaderOption[]
  /**
   * @description 配置选项，见下文 `CascaderProps` 表格。
   */
  props?: CascaderProps
  /**
   * @description 是否启用虚拟滚动
   */
  virtualScroll?: boolean
  /**
   * @description 虚拟滚动的节点高度
   */
  itemSize?: number
  /**
   * @description 虚拟滚动的菜单高度
   */
  height?: number
}

/**
 * @description 虚拟滚动的节点高度
 */
export const CASCADER_PANEL_ITEM_SIZE = 34

/**
 * @description 虚拟滚动的菜单高度
 */
export const CASCADER_PANEL_HEIGHT = 204

export const CommonProps = buildProps({
  /**
   * @description 指定节点对象的哪个键作为节点的值
   */
  modelValue: {
    type: definePropType<CascaderValue | null>([Number, String, Array, Object]),
  },
  /**
   * @description 选项数据，`value` 和 `label` 的键可通过 `CascaderProps` 自定义。
   */
  options: {
    type: definePropType<CascaderOption[]>(Array),
    default: () => [] as CascaderOption[],
  },
  /**
   * @description 配置选项，见下文 `CascaderProps` 表格。
   */
  props: {
    type: definePropType<CascaderProps>(Object),
    default: () => ({}) as CascaderProps,
  },
  /**
   * @description 是否启用虚拟滚动
   */
  virtualScroll: Boolean,
  /**
   * @description 虚拟滚动的节点高度
   */
  itemSize: {
    type: Number,
    default: CASCADER_PANEL_ITEM_SIZE,
  },
  /**
   * @description 虚拟滚动的菜单高度
   */
  height: {
    type: Number,
    default: CASCADER_PANEL_HEIGHT,
  },
} as const)

export interface CascaderPanelProps extends CascaderCommonProps {
  border?: boolean
  renderLabel?: RenderLabel
}

export const DefaultProps: CascaderConfig = {
  /**
   * @description 展开选项的触发方式
   */
  expandTrigger: 'click',
  /**
   * @description 是否启用多选
   */
  multiple: false,
  /**
   * @description 节点的选中状态是否不影响其父节点和子节点
   */
  checkStrictly: false, // 是否所有节点都可被选中
  /**
   * @description 选中节点变化时，是否发出节点路径数组；若为 false，则只发出节点的值。
   */
  emitPath: true, // 是否发出节点所在所有层级的值组成的数组
  /**
   * @description 是否动态加载子节点，配合 `lazyload` 属性使用
   */
  lazy: false,
  /**
   * @description 加载子节点数据的方法，仅当 `lazy` 为 true 时生效
   */
  lazyLoad: NOOP,
  /**
   * @description 指定节点对象的哪个键作为节点的值
   */
  value: 'value',
  /**
   * @description 指定节点对象的哪个键作为节点的标签
   */
  label: 'label',
  /**
   * @description 指定节点对象的哪个键作为节点的子节点
   */
  children: 'children',
  /**
   * @description 指定节点对象的哪个键作为节点的叶子标记
   */
  leaf: 'leaf',
  /**
   * @description 指定节点对象的哪个键作为节点的禁用标记
   */
  disabled: 'disabled',
  /**
   * @description 展开选项的悬停阈值
   */
  hoverThreshold: 500,
  /**
   * @description 点击节点时是否勾选或取消勾选该节点
   */
  checkOnClickNode: false,
  /**
   * @description 点击叶子节点（最后一级子节点）时是否勾选或取消勾选该节点。
   */
  checkOnClickLeaf: true,
  /**
   * @description 是否显示单选框或复选框前缀
   */
  showPrefix: true,
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const cascaderPanelPropDefs = buildProps({
  ...CommonProps,
  border: {
    type: Boolean,
    default: true,
  },
  renderLabel: {
    type: Function as PropType<RenderLabel>,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emitChangeFn = (value: CascaderValue | undefined | null) => true

export const cascaderPanelEmits = {
  [UPDATE_MODEL_EVENT]: emitChangeFn,
  [CHANGE_EVENT]: emitChangeFn,
  close: () => true,
  'expand-change': (value: CascaderNodePathValue) => value,
}

export const useCascaderConfig = (props: { props: CascaderProps }) => {
  return computed(() => ({
    ...DefaultProps,
    ...props.props,
  }))
}
