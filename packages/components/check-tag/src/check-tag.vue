<template>
  <span :class="containerKls" @click="handleChange">
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { CheckTagDefaultValueProps, checkTagEmits } from './check-tag'
import { CHANGE_EVENT } from '@element-plus/constants'
import { useNamespace } from '@element-plus/hooks'

defineOptions({
  name: 'ElCheckTag',
})
const props = defineProps(CheckTagDefaultValueProps)
const emit = defineEmits(checkTagEmits)

const ns = useNamespace('check-tag')
const containerKls = computed(() => [
  ns.b(),
  ns.is('checked', props.checked),
  ns.is('disabled', props.disabled),
  ns.m(props.type || 'primary'),
])

const handleChange = () => {
  if (props.disabled) return

  const checked = !props.checked
  emit(CHANGE_EVENT, checked)
  emit('update:checked', checked)
}
</script>
