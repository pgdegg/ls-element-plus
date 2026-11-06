<template>
  <td :colspan="colspan" :rowspan="rowspan"><slot /></td>
</template>

<script setup lang="ts">
import { TableTdWrapperDefaultValueProps } from './td-wrapper-props'

defineOptions({
  name: 'TableTdWrapper',
})

defineProps(TableTdWrapperDefaultValueProps)
</script>
