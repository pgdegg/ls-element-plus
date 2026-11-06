<template>
  <div :class="[ns.b('group'), ns.bm('group', props.direction)]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { provide, reactive, toRef } from 'vue'
import { ButtonGroupDefaultValueProps } from './button-group'
import { useNamespace } from '@element-plus/hooks'
import { buttonGroupContextKey } from './constants'

defineOptions({
  name: 'ElButtonGroup',
})
const props = defineProps(ButtonGroupDefaultValueProps)
provide(
  buttonGroupContextKey,
  reactive({
    size: toRef(props, 'size'),
    disabled: toRef(props, 'disabled'),
    plain: toRef(props, 'plain'),
    text: toRef(props, 'text'),
    link: toRef(props, 'link'),
    type: toRef(props, 'type'),
  })
)
const ns = useNamespace('button')
</script>
