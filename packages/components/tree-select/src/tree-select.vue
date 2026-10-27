<script lang="ts">
import {
  computed,
  createVNode,
  defineComponent,
  h,
  onMounted,
  reactive,
  ref,
} from 'vue'
import { ElSelect, selectProps } from '@element-plus/components/select'
import { ElTree, treeProps } from '@element-plus/components/tree'
import { definePropType } from '@element-plus/utils'
import { useSelect } from './select'
import { useTree } from './tree'
import CacheOptions from './cache-options'

import type { TreeInstance } from '@element-plus/components/tree'
import type { SelectInstance } from '@element-plus/components/select'

export default defineComponent({
  name: 'ElTreeSelect',
  // 禁用 `ElSelect` 继承当前 attrs
  inheritAttrs: false,
  props: {
    ...selectProps,
    ...treeProps,
    filterMethod: {
      type: definePropType<(query: string) => void>(Function),
    },
    /**
     * @description 懒加载节点的缓存数据，结构与 data 相同，用于获取未加载数据的标签
     */
    cacheData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const { slots, expose, emit, attrs } = context
    const childAttrs = {
      ...attrs,
      onChange: undefined,
    }

    const select = ref<SelectInstance>()
    const tree = ref<TreeInstance>()

    const key = computed(() => props.nodeKey || props.valueKey || 'value')

    const selectProps = useSelect(props, { attrs, emit }, { select, tree, key })
    const { cacheOptions, ...treeProps } = useTree(
      props,
      { attrs: childAttrs, slots, emit },
      {
        select,
        tree,
        key,
      }
    )

    // 暴露 ElTree/ElSelect 方法
    const methods = reactive({})
    expose(methods)
    onMounted(() => {
      Object.assign(methods, {
        treeRef: tree.value,
        selectRef: select.value,
      })
    })

    return () =>
      createVNode(
        ElSelect,
        /**
         * 1. `props` 被处理为 `Refs`，但 `v-bind` 和
         * 渲染函数的 props 无法读取 `Refs`，因此使用 `reactive`
         * 解包 `Refs` 并保持响应式。
         * 2. 关键字 `ref` 需要 `Ref`，但 `reactive` 破坏了它，
         * 因此使用函数。
         */
        reactive({
          ...selectProps,
          ref: (instance: unknown) => {
            select.value = instance ? (instance as SelectInstance) : undefined
          },
        }),
        {
          ...slots,
          default: () => [
            h(CacheOptions, { data: cacheOptions.value }),
            h(
              ElTree,
              reactive({
                ...treeProps,
                ref: (ref: TreeInstance) => (tree.value = ref),
              })
            ),
          ],
        }
      )
  },
})
</script>
