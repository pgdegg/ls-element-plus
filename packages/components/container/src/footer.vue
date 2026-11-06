<template>
  <footer :class="ns.b()" :style="style">
    <slot />
  </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { FooterDefaultValueProps } from './footer'
import { useNamespace } from '@element-plus/hooks'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'ElFooter',
})
const props = defineProps(FooterDefaultValueProps)

const ns = useNamespace('footer')

const style = computed(
  () =>
    (props.height
      ? ns.cssVarBlock({ height: props.height })
      : {}) as CSSProperties
)
</script>
