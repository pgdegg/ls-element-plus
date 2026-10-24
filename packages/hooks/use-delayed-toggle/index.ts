import { unref } from 'vue'
import { buildProps, isNumber } from '@element-plus/utils'
import { useTimeout } from '../use-timeout'

import type { ToRefs } from 'vue'

export interface UseDelayedToggleProps {
  /**
   * @description 出现延迟，单位为毫秒，在受控模式下无效
   */
  showAfter?: number
  /**
   * @description 消失延迟，单位为毫秒，在受控模式下无效
   */
  hideAfter?: number
  /**
   * @description 自动消失时长，单位为毫秒，在受控模式下无效
   */
  autoClose?: number
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `UseDelayedToggleProps`。
 */
export const useDelayedToggleProps = buildProps({
  /**
   * @description 出现延迟，单位为毫秒，在受控模式下无效
   */
  showAfter: {
    type: Number,
    default: 0,
  },
  /**
   * @description 消失延迟，单位为毫秒，在受控模式下无效
   */
  hideAfter: {
    type: Number,
    default: 200,
  },
  /**
   * @description 自动消失时长，单位为毫秒，在受控模式下无效
   */
  autoClose: {
    type: Number,
    default: 0,
  },
} as const)

export type DelayedToggle = {
  open: (event?: Event) => void
  close: (event?: Event) => void
} & ToRefs<Required<UseDelayedToggleProps>>

export const useDelayedTogglePropsDefaults = {
  showAfter: 0,
  hideAfter: 200,
  autoClose: 0,
} as const

export const useDelayedToggle = ({
  showAfter,
  hideAfter,
  autoClose,
  open,
  close,
}: DelayedToggle) => {
  const { registerTimeout } = useTimeout()
  const {
    registerTimeout: registerTimeoutForAutoClose,
    cancelTimeout: cancelTimeoutForAutoClose,
  } = useTimeout()

  const onOpen = (event?: Event, delay = unref(showAfter)) => {
    registerTimeout(() => {
      open(event)

      const _autoClose = unref(autoClose)
      if (isNumber(_autoClose) && _autoClose > 0) {
        registerTimeoutForAutoClose(() => {
          close(event)
        }, _autoClose)
      }
    }, delay)
  }

  const onClose = (event?: Event, delay = unref(hideAfter)) => {
    cancelTimeoutForAutoClose()
    registerTimeout(() => {
      close(event)
    }, delay)
  }

  return {
    onOpen,
    onClose,
  }
}
