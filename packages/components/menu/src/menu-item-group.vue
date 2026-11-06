<template>
  <li :class="ns.b()">
    <div :class="ns.e('title')">
      <template v-if="!$slots.title">{{ title }}</template>
      <slot v-else name="title" />
    </div>
    <ul>
      <slot />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { MenuItemGroupDefaultValueProps } from './menu-item-group'
import { useNamespace } from '@element-plus/hooks'

defineOptions({
  name: 'ElMenuItemGroup',
})
defineProps(MenuItemGroupDefaultValueProps)

const ns = useNamespace('menu-item-group')
</script>
