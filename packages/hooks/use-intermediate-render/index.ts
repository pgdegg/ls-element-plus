import { nextTick, unref, watch } from 'vue'

import type { Ref } from 'vue'

export type UseDelayedRenderProps = {
  indicator: Ref<boolean>
  intermediateIndicator: Ref<boolean>
  shouldSetIntermediate?: (step: 'show' | 'hide') => boolean
  beforeShow?: () => void
  beforeHide?: () => void
  afterShow?: () => void
  afterHide?: () => void
}

export const useDelayedRender = ({
  indicator,
  intermediateIndicator,
  shouldSetIntermediate = () => true,
  beforeShow,
  afterShow,
  afterHide,
  beforeHide,
}: UseDelayedRenderProps) => {
  watch(
    () => unref(indicator),
    (val) => {
      if (val) {
        beforeShow?.()
        nextTick(() => {
          if (!unref(indicator)) return
          if (shouldSetIntermediate('show')) {
            intermediateIndicator.value = true
          }
        })
      } else {
        beforeHide?.()
        nextTick(() => {
          if (unref(indicator)) return

          if (shouldSetIntermediate('hide')) {
            intermediateIndicator.value = false
          }
        })
      }
    }
  )

  // 由于我们并不总是自己设置该值，因此
  // 只需 watch 该值的状态，然后调用对应的 hook。
  watch(
    () => intermediateIndicator.value,
    (val) => {
      if (val) {
        afterShow?.()
      } else {
        afterHide?.()
      }
    }
  )
}
