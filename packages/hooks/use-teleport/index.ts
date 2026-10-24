import { Teleport, h, onUnmounted, ref } from 'vue'
import {
  NOOP,
  createGlobalNode,
  isClient,
  removeGlobalNode,
} from '@element-plus/utils'

import type { Ref, VNode } from 'vue'

export const useTeleport = (
  contentRenderer: () => VNode,
  appendToBody: Ref<boolean>
) => {
  const isTeleportVisible = ref(false)

  if (!isClient) {
    return {
      isTeleportVisible,
      showTeleport: NOOP,
      hideTeleport: NOOP,
      renderTeleport: NOOP,
    }
  }

  let $el: HTMLElement | null = null

  const showTeleport = () => {
    isTeleportVisible.value = true
    // 这支持延迟显示策略，因为内容本身可能可进入（enterable）
    // 例如 el-popper
    if ($el !== null) return

    $el = createGlobalNode()
  }

  const hideTeleport = () => {
    isTeleportVisible.value = false
    if ($el !== null) {
      removeGlobalNode($el)
      $el = null
    }
  }

  const renderTeleport = () => {
    return appendToBody.value !== true
      ? contentRenderer()
      : isTeleportVisible.value
        ? [h(Teleport, { to: $el }, contentRenderer())]
        : undefined
  }

  onUnmounted(hideTeleport)

  return {
    isTeleportVisible,
    showTeleport,
    hideTeleport,
    renderTeleport,
  }
}
