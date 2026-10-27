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
import { computed, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { addUnit } from '@element-plus/utils'
import { useNamespace } from '@element-plus/hooks'
import { useSpriteIcon } from './use-sprite-icon'

import type { CSSProperties } from 'vue'
import type { IconProps } from './icon'

defineOptions({
  name: 'ElIcon',
  inheritAttrs: false,
})
const props = defineProps<IconProps>()
const ns = useNamespace('icon')

const element = ref<HTMLElement>()
const visible = ref(false)
useIntersectionObserver(element, ([entry]) => {
  if (entry?.isIntersecting) visible.value = true
})
const { symbolElement, showPlaceholder } = useSpriteIcon(
  props,
  element,
  visible
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
