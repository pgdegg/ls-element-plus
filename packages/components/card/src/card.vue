<template>
  <div
    :class="[
      ns.b(),
      ns.is('disabled', disabled),
      ns.is(`${shadow || globalConfig?.shadow || 'always'}-shadow`),
    ]"
  >
    <div v-if="$slots.header || header" :class="[ns.e('header'), headerClass]">
      <slot name="header">{{ header }}</slot>
    </div>
    <div :class="[ns.e('body'), bodyClass]" :style="bodyStyle">
      <slot />
    </div>
    <div v-if="$slots.footer || footer" :class="[ns.e('footer'), footerClass]">
      <slot name="footer">{{ footer }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CardDefaultValueProps } from './card'
import { useNamespace } from '@element-plus/hooks'
import { useGlobalConfig } from '@element-plus/components/config-provider'

const globalConfig = useGlobalConfig('card')

defineOptions({
  name: 'ElCard',
})

defineProps(CardDefaultValueProps)

const ns = useNamespace('card')
</script>
