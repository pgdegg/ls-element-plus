<template>
  <i
    ref="element"
    :class="ns.b()"
    :style="style"
    :title="symbolElement?.getAttribute('name') ?? undefined"
    v-bind="$attrs"
  >
    <svg v-if="symbolElement" xmlns="http://www.w3.org/2000/svg">
      <use :href="`#${symbolElement.id}`" />
    </svg>
    <slot v-else-if="!symbol" />
  </i>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { addUnit } from '@element-plus/utils'
import { useNamespace } from '@element-plus/hooks'

import type { CSSProperties } from 'vue'
import type { IconProps } from './icon'

defineOptions({
  name: 'ElIcon',
  inheritAttrs: false,
})
const props = defineProps<IconProps>()
const ns = useNamespace('icon')

const element = ref<HTMLElement>()
// The version argument invalidates the computed sprite after async updates.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const resolveSymbol = (_version?: string | number) => {
  if (!props.symbol || typeof document === 'undefined') return null
  const prefix = props.prefix ?? 'icon'
  if (props.symbolResolver) return props.symbolResolver(props.symbol, prefix)
  if (prefix === '*')
    return (
      Array.from(document.querySelectorAll('symbol[id]')).find((item) =>
        item.id.endsWith(`-${props.symbol}`)
      ) ?? null
    )
  for (const item of Array.isArray(prefix) ? prefix : [prefix]) {
    // Sprite IDs may contain characters requiring CSS escaping.
    // eslint-disable-next-line unicorn/prefer-query-selector
    const symbol = document.getElementById(`${item}-${props.symbol}`)
    if (symbol) return symbol
  }
  return null
}
const symbolElement = computed(() => resolveSymbol(props.symbolVersion))

const visible = ref(false)
const activate = () => {
  if (!visible.value) return
  symbolElement.value
    ?.querySelectorAll<SVGElement>('[data-src]')
    .forEach((resource) => {
      const source = resource.dataset.src
      if (source) resource.setAttribute('href', source)
    })
}
useIntersectionObserver(element, ([entry]) => {
  visible.value = !!entry?.isIntersecting
  activate()
})
watch(symbolElement, activate, { flush: 'post' })

const style = computed<CSSProperties>(() => {
  const { size, color } = props
  const fontSize = addUnit(size)
  if (!fontSize && !color) return {}

  return {
    fontSize,
    '--color': color,
  }
})
</script>
