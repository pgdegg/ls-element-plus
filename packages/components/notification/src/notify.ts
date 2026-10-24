import { createVNode, isVNode, render } from 'vue'
import {
  debugWarn,
  isClient,
  isElement,
  isFunction,
  isString,
  isUndefined,
} from '@element-plus/utils'
import NotificationConstructor from './notification.vue'
import { notificationTypes } from './notification'

import type { VNode } from 'vue'
import type {
  NotificationExposed,
  NotificationPosition,
  NotificationProps,
  NotificationQueue,
  Notify,
  NotifyFn,
} from './notification'

// 这里本应是队列，但考虑到存在 `non-autoclosable` 通知。
const notifications: Record<NotificationPosition, NotificationQueue> = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': [],
}

// 各 notification 之间的间距
const GAP_SIZE = 16
let seed = 1

const notify: NotifyFn & Partial<Notify> = function (options = {}, context) {
  if (!isClient) return { close: () => undefined }

  if (isString(options) || isVNode(options)) {
    options = { message: options }
  }

  const position = options.position || 'top-right'

  let verticalOffset = options.offset || 0
  notifications[position].forEach(({ vm }) => {
    verticalOffset += (vm.el?.offsetHeight || 0) + GAP_SIZE
  })
  verticalOffset += GAP_SIZE

  const id = `notification_${seed++}`
  const userOnClose = options.onClose
  const props: Partial<NotificationProps> = {
    ...options,
    offset: verticalOffset,
    id,
    onClose: () => {
      close(id, position, userOnClose)
    },
  }

  let appendTo: HTMLElement | null = document.body
  if (isElement(options.appendTo)) {
    appendTo = options.appendTo
  } else if (isString(options.appendTo)) {
    appendTo = document.querySelector(options.appendTo)
  }

  // 应回退到默认值并给出警告
  if (!isElement(appendTo)) {
    debugWarn(
      'ElNotification',
      'the appendTo option is not an HTMLElement. Falling back to document.body.'
    )
    appendTo = document.body
  }

  const container = document.createElement('div')

  const vm = createVNode(
    NotificationConstructor,
    props,
    isFunction(props.message)
      ? props.message
      : isVNode(props.message)
        ? () => props.message
        : null
  )
  vm.appContext = isUndefined(context) ? notify._context : context

  // 清理 notification 元素以防止内存泄漏
  vm.props!.onDestroy = () => {
    render(null, container)
  }

  // 调用 close 函数时实例会移除该项，无需为此担心。
  render(vm, container)
  notifications[position].push({ vm })
  appendTo.appendChild(container.firstElementChild!)

  return {
    // 不直接调用 onClose 函数，而是设置此值以便走完完整生命周期
    // 以便组件的所有关闭步骤都不会被跳过。
    // 更新：在此处调用暴露的 close()，而不是设置 visible.value = false，
    // 因为 close() 还会运行 clearTimer() 以停止进度 tick 和关闭超时。
    close: () => {
      ;(vm.component!.exposed as NotificationExposed).close()
    },
  }
}
notificationTypes.forEach((type) => {
  notify[type] = (options = {}, appContext) => {
    if (isString(options) || isVNode(options)) {
      options = {
        message: options,
      }
    }
    return notify({ ...options, type }, appContext)
  }
})

/**
 * 用户点击 `x` 按钮、按 `esc` 或时间达到上限时调用此函数。
 * 由 transition@before-leave 事件触发，以便获取当前 notification.offsetHeight；若在 @after-leave 中调用，
 * DOM 元素已从页面移除，将无法再获取 offsetHeight。
 * @param {String} id 待关闭的通知 id
 * @param {Position} position 定位策略
 * @param {Function} userOnClose 用户传入 close 时调用的回调
 */
export function close(
  id: string,
  position: NotificationPosition,
  userOnClose?: (vm: VNode) => void
): void {
  // 或许可以在把 vm 插入通知列表时存储其索引。
  const orientedNotifications = notifications[position]
  const idx = orientedNotifications.findIndex(
    ({ vm }) => vm.component?.props.id === id
  )
  if (idx === -1) return
  const { vm } = orientedNotifications[idx]
  if (!vm) return
  // 在通知从 DOM 移除前调用用户的 onClose 函数。
  userOnClose?.(vm)

  // 注意此处为 @before-leave 调用，因此才能获取该属性。
  const removedHeight = vm.el!.offsetHeight
  const verticalPos = position.split('-')[0]
  orientedNotifications.splice(idx, 1)
  const len = orientedNotifications.length
  if (len < 1) return
  // 从被移除的项开始。
  for (let i = idx; i < len; i++) {
    // 新位置 = 当前 offsetTop - 被移除项高度 + 16px（各项之间的间距）
    const { el, component } = orientedNotifications[i].vm
    const pos =
      Number.parseInt(el!.style[verticalPos], 10) - removedHeight - GAP_SIZE
    component!.props.offset = pos
  }
}

export function closeAll(): void {
  // 遍历所有方向，一次性关闭。
  for (const orientedNotifications of Object.values(notifications)) {
    orientedNotifications.forEach(({ vm }) => {
      // 与前一个 close 方法相同，我们要确保生命周期得到妥善处理。
      // 更新：调用暴露的 close()，使 clearTimer() 也一并运行。
      ;(vm.component!.exposed as NotificationExposed).close()
    })
  }
}

export function updateOffsets(position: NotificationPosition = 'top-right') {
  let verticalOffset =
    notifications[position][0]?.vm.component?.props?.offset || 0

  for (const { vm } of notifications[position]) {
    vm.component!.props.offset = verticalOffset
    verticalOffset += (vm.el?.offsetHeight || 0) + GAP_SIZE
  }
}

notify.closeAll = closeAll
notify.updateOffsets = updateOffsets
notify._context = null

export default notify as Notify
