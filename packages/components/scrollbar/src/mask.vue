<template>
  <div :class="ns.e('mask')" aria-hidden="true">
    <transition v-for="edge in edges" :key="edge" :name="ns.b('mask-fade')">
      <div
        v-if="mask === true || mask === edge"
        v-show="visible[edge]"
        :class="ns.e(`${edge}-mask`)"
        :style="styles[edge]"
        aria-hidden="true"
      />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { inject, shallowReactive, shallowRef } from 'vue'
import { useNamespace } from '@element-plus/hooks'
import { getStyle } from '@element-plus/utils'
import { scrollbarContextKey } from './constants'
import { getRTLOffsetType } from './mask-utils'

import type { CSSProperties } from 'vue'
import type { ScrollbarDirection, ScrollbarProps } from './scrollbar'

defineProps<{
  mask: ScrollbarProps['mask']
}>()

const ns = useNamespace('scrollbar')
const scrollbar = inject(scrollbarContextKey)!
const edges = ['top', 'bottom', 'left', 'right'] as const
const visible = shallowReactive({
  top: false,
  bottom: false,
  left: false,
  right: false,
})
const styles = shallowRef<Partial<Record<ScrollbarDirection, CSSProperties>>>(
  {}
)

const handleScroll = () => {
  const wrap = scrollbar.wrapElement
  if (!wrap) return

  const {
    clientHeight,
    scrollHeight,
    scrollTop,
    clientWidth,
    scrollWidth,
    scrollLeft,
  } = wrap
  // 滚动偏移量可能是小数，而 scroll 和 client 尺寸是取整的。
  const maxTop = scrollHeight - clientHeight
  const maxLeft = scrollWidth - clientWidth
  const hasVerticalOverflow = clientHeight > 0 && maxTop > 1
  const hasHorizontalOverflow = clientWidth > 0 && maxLeft > 1
  let left = scrollLeft
  if (hasHorizontalOverflow && getStyle(wrap, 'direction') === 'rtl') {
    // 将浏览器的 RTL 偏移量归一化为距物理左侧的距离。
    switch (getRTLOffsetType()) {
      case 'negative':
        left = maxLeft + scrollLeft
        break
      case 'positive-ascending':
        left = maxLeft - scrollLeft
        break
    }
  }

  visible.top = hasVerticalOverflow && scrollTop > 1
  visible.bottom = hasVerticalOverflow && maxTop - scrollTop > 1
  visible.left = hasHorizontalOverflow && left > 1
  visible.right = hasHorizontalOverflow && maxLeft - left > 1
}

const update = () => {
  const { wrapElement: wrap, scrollbarElement } = scrollbar
  if (!wrap || !scrollbarElement) return

  // 与视口对齐，排除原生滚动条以及任何 wrap 边框。
  const {
    offsetLeft,
    offsetTop,
    clientLeft,
    clientTop,
    clientWidth,
    clientHeight,
  } = wrap
  const left = offsetLeft + clientLeft
  const top = offsetTop + clientTop
  const verticalStyle = {
    left: `${left}px`,
    width: `${clientWidth}px`,
    maxHeight: `${clientHeight}px`,
  }
  const horizontalStyle = {
    top: `${top}px`,
    height: `${clientHeight}px`,
    maxWidth: `${clientWidth}px`,
  }
  styles.value = {
    top: { ...verticalStyle, top: `${top}px` },
    bottom: {
      ...verticalStyle,
      bottom: `${scrollbarElement.clientHeight - top - clientHeight}px`,
    },
    left: { ...horizontalStyle, left: `${left}px` },
    right: {
      ...horizontalStyle,
      right: `${scrollbarElement.clientWidth - left - clientWidth}px`,
    },
  }
  handleScroll()
}

defineExpose({ update, handleScroll })
</script>
