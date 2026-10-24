<template>
  <i
    ref="element"
    :class="ns.b()"
    :style="style"
    :title="symbolElement?.getAttribute('name') ?? undefined"
    v-bind="$attrs"
  >
    <svg
      v-if="showPlaceholder"
      :class="ns.e('placeholder')"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m4 17 4.5-4.5 3 3 3.5-5 5 6.5" />
    </svg>
    <svg v-else-if="symbolElement" xmlns="http://www.w3.org/2000/svg">
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
import { loadIconImage } from './image-resource'

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
const imagesReady = ref(false)
const imageResources = computed(() =>
  Array.from(
    symbolElement.value?.querySelectorAll<SVGElement>('[data-src]') ?? []
  )
)
const showPlaceholder = computed(() =>
  Boolean(
    props.symbol &&
    (!symbolElement.value ||
      (imageResources.value.length && !imagesReady.value))
  )
)

const visible = ref(false)
useIntersectionObserver(element, ([entry]) => {
  visible.value = !!entry?.isIntersecting
})
watch(
  [imageResources, visible],
  async ([resources, isVisible], _, onCleanup) => {
    imagesReady.value = false
    if (!isVisible || !resources.length) return
    let cancelled = false
    onCleanup(() => {
      cancelled = true
    })
    const loaded = await Promise.all(resources.map(loadIconImage))
    if (!cancelled) imagesReady.value = loaded.every(Boolean)
  },
  { immediate: true, flush: 'sync' }
)

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
