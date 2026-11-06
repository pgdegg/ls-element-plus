<template>
  <div
    :class="ns.be('group', 'title')"
    :style="{ ...style, lineHeight: `${height}px` }"
  >
    {{ item.label }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SelectV2GroupItemDefaultValueProps } from './group-item-props'
import { useNamespace } from '@element-plus/hooks'

export default defineComponent({
  props: SelectV2GroupItemDefaultValueProps,
  setup() {
    const ns = useNamespace('select')
    return {
      ns,
    }
  },
})
</script>
