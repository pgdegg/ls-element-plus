import type { IconPropType } from '@element-plus/utils'
import type {
  ComponentInternalInstance,
  ExtractPublicPropTypes,
  SetupContext,
} from 'vue'
import type { treeEmits, treeProps } from './virtual-tree'

export type TreeNodeData = Record<string, any>

export type TreeData = TreeNodeData[]

export type TreeKey = string | number

export interface TreeOptionProps {
  children?: string
  label?: string
  value?: string
  disabled?: string
  class?:
    | ((
        data: TreeNodeData,
        node: TreeNode
      ) => string | { [key: string]: boolean })
    | string
}

export interface TreeProps {
  data?: TreeData
  emptyText?: string
  height?: number
  props?: TreeOptionProps
  highlightCurrent?: boolean
  showCheckbox?: boolean
  defaultCheckedKeys?: TreeKey[]
  // 勾选某节点时是否不影响其父节点和
  // 子节点（当 show-checkbox 为 true 时）
  checkStrictly?: boolean
  defaultExpandedKeys?: TreeKey[]
  indent?: number
  itemSize?: number
  icon?: IconPropType
  expandOnClickNode?: boolean
  checkOnClickNode?: boolean
  checkOnClickLeaf?: boolean
  currentNodeKey?: string | number
  accordion?: boolean
  filterMethod?: FilterMethod
  // 性能模式会增加内存占用，但滚动更流畅
  perfMode?: boolean
  /**
   * @description 始终显示滚动条
   */
  scrollbarAlwaysOn?: boolean
}

export interface TreeNodeProps {
  node?: TreeNode
  expanded?: boolean
  checked?: boolean
  indeterminate?: boolean
  showCheckbox?: boolean
  disabled?: boolean
  current?: boolean
  hiddenExpandIcon?: boolean
  itemSize?: number
}

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TreeProps`。
 */
export type TreePropsPublic = ExtractPublicPropTypes<typeof treeProps>

export interface TreeNode {
  key: TreeKey
  level: number
  parent?: TreeNode
  children?: TreeNode[]
  data: TreeNodeData
  disabled?: boolean
  label?: string
  isLeaf?: boolean
  expanded?: boolean

  /**
   * 判断当前树节点是否被有效勾选。
   *
   * 规则：
   * 1. 被禁用的叶子节点始终视为已勾选。
   * 2. 未禁用的叶子节点反映其真实勾选状态。
   * 3. 非叶子节点仅在以下情况视为已勾选：
   *    - 其所有子节点都被有效勾选，且
   *    - 每个子节点遵循相同的评估规则：
   *      - 禁用的叶子节点遵循规则 #1。
   *      - 非叶子子节点在本规则（#3）下递归评估。
   */
  isEffectivelyChecked?: boolean
}

export interface TreeContext {
  ctx: Omit<SetupContext<typeof treeEmits>, 'expose' | 'attrs'>
  instance: ComponentInternalInstance
  props: TreeProps
}

export interface Tree {
  treeNodeMap: Map<TreeKey, TreeNode>
  levelTreeNodeMap: Map<number, TreeNode[]>
  treeNodes: TreeNode[]
  maxLevel: number
}

export type FilterMethod = (
  query: string,
  data: TreeNodeData,
  node: TreeNode
) => boolean

export interface CheckedInfo {
  checkedKeys: TreeKey[]
  checkedNodes: TreeData
  halfCheckedKeys: TreeKey[]
  halfCheckedNodes: TreeData
}
