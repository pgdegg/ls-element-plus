// @ts-nocheck
import { computed, nextTick, onMounted, toRefs, watch } from 'vue'
import { useEventListener } from '@vueuse/core'
import { omit, pick } from 'lodash-unified'
import ElSelect from '@element-plus/components/select'
import { useNamespace } from '@element-plus/hooks'
import { EVENT_CODE, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { getEventCode } from '@element-plus/utils'

import type { Ref } from 'vue'
import type { SelectInstance } from '@element-plus/components/select'
import type { TreeInstance } from '@element-plus/components/tree'

export const useSelect = (
  props,
  { attrs, emit },
  {
    select,
    tree,
    key,
  }: {
    select: Ref<SelectInstance | undefined>
    tree: Ref<TreeInstance | undefined>
    key: Ref<string>
  }
): Record<string, unknown> => {
  const ns = useNamespace('tree-select')

  // update tree data when use filterMethod/remoteMethod
  watch(
    () => props.data,
    () => {
      if (props.filterable) {
        nextTick(() => {
          // let tree node expand only, same with tree filter
          tree.value?.filter(select.value?.states.inputValue)
        })
      }
    },
    { flush: 'post' }
  )

  const focusLastNode = (listNode) => {
    const lastNode = listNode.at(-1)
    if (lastNode.expanded && lastNode.childNodes.at(-1)) {
      focusLastNode([lastNode.childNodes.at(-1)])
    } else {
      const el = tree.value.el$?.querySelector(
        `[data-key="${listNode.at(-1).key}"]`
      )
      el?.focus({ preventScroll: true })
      return
    }
  }

  onMounted(() => {
    useEventListener(
      () => select.value?.$el,
      'keydown',
      async (evt) => {
        const code = getEventCode(evt)
        const { dropdownMenuVisible } = select.value!
        if (
          [EVENT_CODE.down, EVENT_CODE.up].includes(code) &&
          dropdownMenuVisible
        ) {
          await nextTick()
          // wait navigateOption to finish
          setTimeout(() => {
            if (EVENT_CODE.up === code) {
              const listNode = tree.value.store.root.childNodes
              focusLastNode(listNode)
              return
            }
            // el-select-dropdown__item => el-tree-node__content => el-tree-node__content
            select.value.optionsArray[
              select.value.states.hoveringIndex
            ].$el?.parentNode?.parentNode?.focus({ preventScroll: true })
          })
        }
      },
      {
        capture: true,
      }
    )
  })

  const filterTree = (keyword = '') => {
    if (!props.filterable) return
    if (props.filterMethod) {
      props.filterMethod(keyword)
    } else if (props.remoteMethod) {
      props.remoteMethod(keyword)
    } else {
      tree.value?.filter(keyword)
    }
  }

  const result = {
    ...pick(toRefs(props), Object.keys(ElSelect.props)),
    ...omit(attrs, [
      'onQueryChange',
      'onQuery-change',
      'onVisibleChange',
      'onVisible-change',
    ]),
    class: computed(() => attrs.class),
    style: computed(() => attrs.style),
    // attrs is not reactive, when v-model binding source changes,
    // this listener is still old, see the bug(or test 'v-model source change'):
    // https://github.com/element-plus/element-plus/issues/14204
    'onUpdate:modelValue': (value) => emit(UPDATE_MODEL_EVENT, value),
    valueKey: key,
    popperClass: computed(() => [ns.e('popper'), props.popperClass]),
    // Tree filtering operates on the complete query, including an empty tree.
    // ElSelect's filterMethod is an option predicate and must not drive it.
    filterMethod: () => true,
    remoteMethod: undefined,
    onQueryChange: (keyword) => {
      filterTree(keyword)
      emit('query-change', keyword)
    },
    onVisibleChange: (visible) => {
      if (!visible) filterTree('')
      emit('visible-change', visible)
    },
  }

  return result
}
