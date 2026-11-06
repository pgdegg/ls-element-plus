<template>
  <div :class="rootKls">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { CollapseDefaultValueProps, collapseEmits } from './collapse'
import { useCollapse, useCollapseDOM } from './use-collapse'

defineOptions({
  name: 'ElCollapse',
})
const props = defineProps(CollapseDefaultValueProps)
const emit = defineEmits(collapseEmits)

const { activeNames, setActiveNames } = useCollapse(props, emit)

const { rootKls } = useCollapseDOM(props)

defineExpose({
  /** @description 激活项名称 */
  activeNames,
  /** @description 设置激活项名称 */
  setActiveNames,
})
</script>
