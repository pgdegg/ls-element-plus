import { defineComponent, inject, watch } from 'vue'
import { selectKey } from '@element-plus/components/select'
import { isClient } from '@element-plus/utils'

import type { SelectContext } from '@element-plus/components/select'
import type { PropType } from 'vue'

// 与 el-option 实例相同，
// `cachedOptions` 需要这些字段
export type CacheOption = {
  value: string | number | boolean | object
  currentLabel: string | number
  isDisabled: boolean
}

export default defineComponent({
  props: {
    data: {
      type: Array as PropType<CacheOption[]>,
      default: () => [],
    },
  },
  setup(props) {
    const select = inject(selectKey) as NonNullable<SelectContext>

    watch(
      () => props.data,
      () => {
        props.data.forEach((item) => {
          if (!select.states.cachedOptions.has(item.value)) {
            // TODO：'item' 的类型与 'cachedOptions' 的类型不兼容，
            // 这可能意味着存在潜在的运行时问题。
            // @ts-expect-error
            select.states.cachedOptions.set(item.value, item)
          }
        })

        // fork from packages/select/src/useSelect.ts#330
        const inputs = select.selectRef?.querySelectorAll('input') || []
        if (
          isClient &&
          !Array.from(inputs).includes(
            document.activeElement as HTMLInputElement
          )
        ) {
          select.setSelected()
        }
      },
      { flush: 'post', immediate: true }
    )

    return () => undefined
  },
})
