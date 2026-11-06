<template>
  <a
    :class="linkKls"
    :href="disabled || !href ? undefined : href"
    :target="disabled || !href ? undefined : target"
    @click="handleClick"
  >
    <el-icon v-if="icon"><component :is="icon" /></el-icon>
    <span v-if="$slots.default" :class="ns.e('inner')">
      <slot />
    </span>

    <slot v-if="$slots.icon" name="icon" />
  </a>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { LinkDefaultValueProps, linkEmits } from './link'
import { ElIcon } from '@element-plus/components/icon'
import { useGlobalConfig } from '@element-plus/components/config-provider'
import { useNamespace } from '@element-plus/hooks'

defineOptions({
  name: 'ElLink',
})
const props = defineProps(LinkDefaultValueProps)
const emit = defineEmits(linkEmits)
const globalConfig = useGlobalConfig('link')

const ns = useNamespace('link')

const linkKls = computed(() => [
  ns.b(),
  ns.m(props.type ?? globalConfig.value?.type ?? 'default'),
  ns.is('disabled', props.disabled),
  ns.is('underline', underline.value === 'always'),
  ns.is('hover-underline', underline.value === 'hover' && !props.disabled),
])

const underline = computed(
  () => props.underline ?? globalConfig.value?.underline ?? 'hover'
)

function handleClick(event: MouseEvent) {
  if (!props.disabled) emit('click', event)
}
</script>
