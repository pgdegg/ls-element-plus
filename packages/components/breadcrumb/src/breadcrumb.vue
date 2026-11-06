<template>
  <div
    ref="breadcrumb"
    :class="ns.b()"
    :aria-label="t('el.breadcrumb.label')"
    role="navigation"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, provide, ref } from 'vue'
import { BreadcrumbDefaultValueProps } from './breadcrumb'
import { useLocale, useNamespace } from '@element-plus/hooks'
import { breadcrumbKey } from './constants'

defineOptions({
  name: 'ElBreadcrumb',
})

const { t } = useLocale()
const props = defineProps(BreadcrumbDefaultValueProps)

const ns = useNamespace('breadcrumb')
const breadcrumb = ref<HTMLDivElement>()

provide(breadcrumbKey, props)

onMounted(() => {
  const items = breadcrumb.value!.querySelectorAll(`.${ns.e('item')}`)
  if (items.length) {
    items[items.length - 1].setAttribute('aria-current', 'page')
  }
})
</script>
