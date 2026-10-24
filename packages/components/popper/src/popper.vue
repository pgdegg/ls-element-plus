<template>
  <slot />
</template>

<script lang="ts" setup>
import { computed, provide, ref } from 'vue'
import { POPPER_INJECTION_KEY } from './constants'

import type { Instance as PopperInstance } from '@popperjs/core'
import type { ElPopperInjectionContext } from './constants'
import type { PopperProps } from './popper'

defineOptions({
  name: 'ElPopper',
  inheritAttrs: false,
})
const props = withDefaults(defineProps<PopperProps>(), {
  role: 'tooltip',
})

const triggerRef = ref<HTMLElement>()
const popperInstanceRef = ref<PopperInstance>()
const contentRef = ref<HTMLElement>()
const referenceRef = ref<HTMLElement>()
const role = computed(() => props.role)

const popperProvides = {
  /**
   * @description 触发元素
   */
  triggerRef,
  /**
   * @description popperjs 实例
   */
  popperInstanceRef,
  /**
   * @description popper 内容元素
   */
  contentRef,
  /**
   * @description popper 参考元素
   */
  referenceRef,
  /**
   * @description role 决定 aria 属性如何分配
   */
  role,
} as ElPopperInjectionContext

defineExpose(popperProvides)

provide(POPPER_INJECTION_KEY, popperProvides)
</script>
