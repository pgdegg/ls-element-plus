/* istanbul ignore file */
import { getCurrentInstance } from 'vue'

const AFTER_APPEAR = 'after-appear'
const AFTER_ENTER = 'after-enter'
const AFTER_LEAVE = 'after-leave'
const APPEAR = 'appear'
const APPEAR_CANCELLED = 'appear-cancelled'
const BEFORE_ENTER = 'before-enter'
const BEFORE_LEAVE = 'before-leave'
const ENTER = 'enter'
const ENTER_CANCELLED = 'enter-cancelled'
const LEAVE = 'leave'
const LEAVE_CANCELLED = 'leave-cancelled'

export const useTransitionFallthroughEmits = [
  AFTER_APPEAR,
  AFTER_ENTER,
  AFTER_LEAVE,
  APPEAR,
  APPEAR_CANCELLED,
  BEFORE_ENTER,
  BEFORE_LEAVE,
  ENTER,
  ENTER_CANCELLED,
  LEAVE,
  LEAVE_CANCELLED,
] as const

// 有时我们希望委托转发 transition 触发的事件
// 我们不得不在本地编写该函数，这并不是一个好的
// 做法，因此我们创建了这个 hook 来处理事件
// 透传（fallthrough）

/**
 * 注意：
 * 这只是一个用于委托转发 transition 回调的代理。
 * 根据需要使用。
 */

/**
 * 简单用法
 *
 * 在你的 setup 中：
 *
 * setup() {
 *   const fallthroughMethods = useTransitionFallthrough()
 *   return fallthrough
 * }
 *
 * 在你的模板中：
 *
 * <template>
 *  <transition name="whatever" v-bind="fallthrough">
 *    <slot />
 *  </transition>
 * </template>
 *
 */

export const useTransitionFallthrough = () => {
  const { emit } = getCurrentInstance()!

  return {
    onAfterAppear: () => {
      emit(AFTER_APPEAR)
    },
    onAfterEnter: () => {
      emit(AFTER_ENTER)
    },
    onAfterLeave: () => {
      emit(AFTER_LEAVE)
    },
    onAppearCancelled: () => {
      emit(APPEAR_CANCELLED)
    },
    onBeforeEnter: () => {
      emit(BEFORE_ENTER)
    },
    onBeforeLeave: () => {
      emit(BEFORE_LEAVE)
    },
    onEnter: () => {
      emit(ENTER)
    },
    onEnterCancelled: () => {
      emit(ENTER_CANCELLED)
    },
    onLeave: () => {
      emit(LEAVE)
    },
    onLeaveCancelled: () => {
      emit(LEAVE_CANCELLED)
    },
  }
}
