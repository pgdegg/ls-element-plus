// @ts-nocheck
import { computed, nextTick, toRefs, watch } from 'vue'
import { isEqual, isNil, pick } from 'lodash-unified'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { escapeStringRegexp, isEmpty, isFunction } from '@element-plus/utils'
import ElTree from '@element-plus/components/tree'
import TreeSelectOption from './tree-select-option'
import {
  isValidArray,
  isValidValue,
  toValidArray,
  treeEach,
  treeFind,
} from './utils'

import type { CacheOption } from './cache-options'
import type { Ref } from 'vue'
import type { SelectInstance } from '@element-plus/components/select'
import type Node from '@element-plus/components/tree/src/model/node'
import type { TreeNodeData } from '@element-plus/components/tree/src/tree.type'
import type { TreeInstance } from '@element-plus/components/tree'

export const useTree = (
  props,
  { attrs, slots, emit },
  {
    select,
    tree,
    key,
  }: {
    select: Ref<SelectInstance | undefined>
    tree: Ref<TreeInstance | undefined>
    key: Ref<string>
  }
) => {
  watch(
    [() => props.modelValue, tree],
    () => {
      if (props.showCheckbox) {
        nextTick(() => {
          const treeInstance = tree.value
          if (
            treeInstance &&
            !isEqual(
              treeInstance.getCheckedKeys(),
              toValidArray(props.modelValue)
            )
          ) {
            treeInstance.setCheckedKeys(toValidArray(props.modelValue))
          }
        })
      }
    },
    {
      immediate: true,
      deep: true,
    }
  )

  const propsMap = computed(() => ({
    value: key.value,
    label: 'label',
    children: 'children',
    disabled: 'disabled',
    isLeaf: 'isLeaf',
    ...props.props,
  }))

  const getNodeValByProp = (
    prop: 'value' | 'label' | 'children' | 'disabled' | 'isLeaf',
    data: TreeNodeData
  ) => {
    const propVal = propsMap.value[prop]
    if (isFunction(propVal)) {
      return propVal(
        data,
        tree.value?.getNode(getNodeValByProp('value', data)) as Node
      )
    } else {
      return data[propVal as string]
    }
  }

  const defaultExpandedParentKeys = toValidArray(props.modelValue)
    .map((value) => {
      return treeFind(
        props.data || [],
        (data) => getNodeValByProp('value', data) === value,
        (data) => getNodeValByProp('children', data),
        (data, index, array, parent) =>
          parent && getNodeValByProp('value', parent)
      )
    })
    .filter((item) => isValidValue(item))

  const cacheOptions = computed(() => {
    if (!props.renderAfterExpand && !props.lazy) return []

    const options: CacheOption[] = []

    treeEach(
      props.data.concat(props.cacheData),
      (node) => {
        const value = getNodeValByProp('value', node)
        options.push({
          value,
          currentLabel: getNodeValByProp('label', node),
          isDisabled: getNodeValByProp('disabled', node),
        })
      },
      (data) => getNodeValByProp('children', data)
    )

    return options
  })

  const getChildCheckedKeys = () => {
    return tree.value?.getCheckedKeys().filter((checkedKey) => {
      const node = tree.value?.getNode(checkedKey) as Node
      return !isNil(node) && isEmpty(node.childNodes)
    })
  }

  const emitChange = (val: any | any[]) => {
    if (!isEqual(props.modelValue, val)) {
      emit(CHANGE_EVENT, val)
    }
  }

  function update(val) {
    emit(UPDATE_MODEL_EVENT, val)
    emitChange(val)
  }

  return {
    ...pick(toRefs(props), Object.keys(ElTree.props)),
    ...attrs,
    nodeKey: key,

    // 仅在 `check-strictly` 为 false 时点击节点才展开
    expandOnClickNode: computed(() => {
      return !props.checkStrictly && props.expandOnClickNode
    }),

    // 仅首次显示当前选中节点，
    // 修复勾选多个节点时展开多个节点的问题
    defaultExpandedKeys: computed(() => {
      return props.defaultExpandedKeys
        ? props.defaultExpandedKeys.concat(defaultExpandedParentKeys)
        : defaultExpandedParentKeys
    }),

    renderContent: (h, { node, data, store }) => {
      return h(
        TreeSelectOption,
        {
          value: getNodeValByProp('value', data),
          label: getNodeValByProp('label', data),
          disabled: getNodeValByProp('disabled', data),
          visible: node.visible,
        },
        props.renderContent
          ? () => props.renderContent(h, { node, data, store })
          : slots.default
            ? () => slots.default({ node, data, store })
            : undefined
      )
    },
    filterNodeMethod: (value, data, node) => {
      if (props.filterNodeMethod)
        return props.filterNodeMethod(value, data, node)
      if (!value) return true
      const regexp = new RegExp(escapeStringRegexp(value), 'i')
      return regexp.test(getNodeValByProp('label', data) || '')
    },
    onNodeClick: (data, node, e) => {
      attrs.onNodeClick?.(data, node, e)

      // `onCheck` 在 `checkOnClickNode` 时触发
      if (props.showCheckbox && props.checkOnClickNode) return

      // 现在 `checkOnClickNode` 为 false，仅在无 checkbox 且 `checkStrictly` 或 `isLeaf` 时
      if (!props.showCheckbox && (props.checkStrictly || node.isLeaf)) {
        if (!getNodeValByProp('disabled', data)) {
          const option = select.value?.states.options.get(
            getNodeValByProp('value', data)
          )
          select.value?.handleOptionSelect(option)
        }
      } else if (props.expandOnClickNode) {
        e.proxy.handleExpandIconClick()
      }
    },
    onCheck: (data, params) => {
      // 无 checkbox 时忽略，与仅 `checkOnClickNode` 为 true 的情况一致
      if (!props.showCheckbox) return

      const dataValue = getNodeValByProp('value', data)
      const dataMap = {}
      treeEach(
        [tree.value.store.root],
        (node) => (dataMap[node.key] = node),
        (node) => node.childNodes
      )

      // 修复：checkedKeys 未缓存 key
      const uncachedCheckedKeys = params.checkedKeys
      const cachedKeys = props.multiple
        ? toValidArray(props.modelValue).filter(
            (item) => !(item in dataMap) && !uncachedCheckedKeys.includes(item)
          )
        : []
      const checkedKeys = cachedKeys.concat(uncachedCheckedKeys)

      if (props.checkStrictly) {
        // 勾选变化可能来自 `check-on-node-click`
        update(
          props.multiple
            ? checkedKeys
            : checkedKeys.includes(dataValue)
              ? dataValue
              : undefined
        )
      }
      // 只能选择叶子节点
      else if (props.multiple) {
        const childKeys = getChildCheckedKeys()
        update(cachedKeys.concat(childKeys))
      } else {
        // 勾选父节点时选中第一个叶子节点
        const firstLeaf = treeFind(
          [data],
          (data) =>
            !isValidArray(getNodeValByProp('children', data)) &&
            !getNodeValByProp('disabled', data),
          (data) => getNodeValByProp('children', data)
        )
        const firstLeafKey = firstLeaf
          ? getNodeValByProp('value', firstLeaf)
          : undefined

        // 任意子节点被勾选时取消选中
        const hasCheckedChild =
          isValidValue(props.modelValue) &&
          !!treeFind(
            [data],
            (data) => getNodeValByProp('value', data) === props.modelValue,
            (data) => getNodeValByProp('children', data)
          )

        update(
          firstLeafKey === props.modelValue || hasCheckedChild
            ? undefined
            : firstLeafKey
        )
      }

      nextTick(() => {
        const checkedKeys = toValidArray(props.modelValue)
        tree.value.setCheckedKeys(checkedKeys)

        attrs.onCheck?.(data, {
          checkedKeys: tree.value.getCheckedKeys(),
          checkedNodes: tree.value.getCheckedNodes(),
          halfCheckedKeys: tree.value.getHalfCheckedKeys(),
          halfCheckedNodes: tree.value.getHalfCheckedNodes(),
        })
      })

      select.value?.focus()
    },

    onNodeExpand: (data, node, e) => {
      attrs.onNodeExpand?.(data, node, e)
      nextTick(() => {
        if (
          !props.checkStrictly &&
          props.lazy &&
          props.multiple &&
          node.checked
        ) {
          const dataMap = {}
          const uncachedCheckedKeys = (
            tree.value as TreeInstance
          ).getCheckedKeys()

          treeEach(
            [tree.value.store.root],
            (node) => (dataMap[node.key] = node),
            (node) => node.childNodes
          )

          const cachedKeys = toValidArray(props.modelValue).filter(
            (item) => !(item in dataMap) && !uncachedCheckedKeys.includes(item)
          )

          const childKeys = getChildCheckedKeys()
          update(cachedKeys.concat(childKeys))
        }
      })
    },
    // else
    cacheOptions,
  }
}
