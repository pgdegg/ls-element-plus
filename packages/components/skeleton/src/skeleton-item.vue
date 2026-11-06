<template>
  <div :class="[ns.e('item'), ns.e(variant)]">
    <picture-filled v-if="variant === 'image'" />
  </div>
</template>

<script lang="ts" setup>
import { SkeletonItemDefaultValueProps } from './skeleton-item'
import { useNamespace } from '@element-plus/hooks'
import { PictureFilled } from '@element-plus/icons-vue'

defineOptions({
  name: 'ElSkeletonItem',
})
defineProps(SkeletonItemDefaultValueProps)
const ns = useNamespace('skeleton')
</script>
