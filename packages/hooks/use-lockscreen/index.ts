import { computed, isRef, onScopeDispose, watch } from 'vue'
import {
  addClass,
  getScrollBarWidth,
  getStyle,
  hasClass,
  removeClass,
  throwError,
} from '@element-plus/utils'
import { useNamespace } from '../use-namespace'

import type { Ref } from 'vue'
import type { UseNamespaceReturn } from '../use-namespace'

export type UseLockScreenOptions = {
  ns?: UseNamespaceReturn
  // shouldLock?: MaybeRef<boolean>
}

/**
 * 该 Hook 用于监控 ref 值以锁定或解锁屏幕。
 * 当 trigger 变为 true 时，认为弹窗已打开，反之亦然。
 * @param trigger {Ref<boolean>}
 */
export const useLockscreen = (
  trigger: Ref<boolean>,
  options: UseLockScreenOptions = {}
) => {
  if (!isRef(trigger)) {
    throwError(
      '[useLockscreen]',
      'You need to pass a ref param to this function'
    )
  }

  const ns = options.ns || useNamespace('popup')

  const hiddenCls = computed(() => ns.bm('parent', 'hidden'))

  let scrollBarWidth = 0
  let withoutHiddenClass = false
  let bodyWidth = '0'
  let cleaned = false

  const cleanup = () => {
    if (cleaned) return

    cleaned = true
    setTimeout(() => {
      // 测试用例运行时，jsdom 模拟的上下文环境可能已被销毁，
      // 此时 document 可能不存在。
      if (typeof document === 'undefined') return
      if (withoutHiddenClass && document) {
        document.body.style.width = bodyWidth
        removeClass(document.body, hiddenCls.value)
      }
    }, 200)
  }
  watch(trigger, (val) => {
    if (!val) {
      cleanup()
      return
    }

    cleaned = false
    withoutHiddenClass = !hasClass(document.body, hiddenCls.value)
    if (withoutHiddenClass) {
      bodyWidth = document.body.style.width
      addClass(document.body, hiddenCls.value)
    }
    scrollBarWidth = getScrollBarWidth(ns.namespace.value)
    const bodyHasOverflow =
      document.documentElement.clientHeight < document.body.scrollHeight
    const bodyOverflowY = getStyle(document.body, 'overflowY')
    if (
      scrollBarWidth > 0 &&
      (bodyHasOverflow || bodyOverflowY === 'scroll') &&
      withoutHiddenClass
    ) {
      document.body.style.width = `calc(100% - ${scrollBarWidth}px)`
    }
  })
  onScopeDispose(() => cleanup())
}
