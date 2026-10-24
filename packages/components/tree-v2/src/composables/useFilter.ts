import { computed, ref } from 'vue'
import { isFunction } from '@element-plus/utils'

import type { Ref } from 'vue'
import type { Tree, TreeKey, TreeNode, TreeProps } from '../types'

// 数据量很大时使用过滤会导致卡顿
// 目前尚未找到更好的优化方式
// 或许这个问题应交给服务端处理
export function useFilter(props: TreeProps, tree: Ref<Tree | undefined>) {
  const hiddenNodeKeySet = ref<Set<TreeKey>>(new Set([]))
  const hiddenExpandIconKeySet = ref<Set<TreeKey>>(new Set([]))

  const filterable = computed(() => {
    return isFunction(props.filterMethod)
  })

  function doFilter(query: string) {
    if (!filterable.value) {
      return
    }
    const expandKeySet = new Set<TreeKey>()
    const hiddenExpandIconKeys = hiddenExpandIconKeySet.value
    const hiddenKeys = hiddenNodeKeySet.value
    const family: TreeNode[] = []
    const nodes = tree.value?.treeNodes || []
    const filter = props.filterMethod
    hiddenKeys.clear()
    function traverse(nodes: TreeNode[]) {
      nodes.forEach((node) => {
        family.push(node)
        if (filter?.(query, node.data, node)) {
          family.forEach((member) => {
            expandKeySet.add(member.key)
            member.expanded = true
          })
        } else {
          node.expanded = false
          if (node.isLeaf) {
            hiddenKeys.add(node.key)
          }
        }
        const children = node.children
        if (children) {
          traverse(children)
        }
        if (!node.isLeaf) {
          if (!expandKeySet.has(node.key)) {
            hiddenKeys.add(node.key)
          } else if (children) {
            // 若所有子节点都被隐藏，则展开图标也会隐藏
            let allHidden = true
            for (const childNode of children) {
              if (!hiddenKeys.has(childNode.key)) {
                allHidden = false
                break
              }
            }
            if (allHidden) {
              hiddenExpandIconKeys.add(node.key)
            } else {
              hiddenExpandIconKeys.delete(node.key)
            }
          }
        }
        family.pop()
      })
    }
    traverse(nodes)
    return expandKeySet
  }

  function isForceHiddenExpandIcon(node: TreeNode): boolean {
    return hiddenExpandIconKeySet.value.has(node.key)
  }

  return {
    hiddenExpandIconKeySet,
    hiddenNodeKeySet,
    doFilter,
    isForceHiddenExpandIcon,
  }
}
