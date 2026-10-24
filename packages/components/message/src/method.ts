import { createVNode, isVNode, render } from 'vue'
import {
  debugWarn,
  hasOwn,
  isBoolean,
  isClient,
  isElement,
  isFunction,
  isNumber,
  isString,
} from '@element-plus/utils'
import { messageConfig } from '@element-plus/components/config-provider'
import MessageConstructor from './message.vue'
import {
  MESSAGE_DEFAULT_PLACEMENT,
  messageDefaults,
  messagePlacement,
  messageTypes,
} from './message'
import { getOrCreatePlacementInstances, placementInstances } from './instance'

import type { MessageContext } from './instance'
import type { AppContext } from 'vue'
import type {
  Message,
  MessageFn,
  MessageHandler,
  MessageOptions,
  MessageParams,
  MessageParamsNormalized,
  MessagePlacement,
  MessageType,
} from './message'

let seed = 1

// TODO：Notify.ts 与本文件基本相同，可对二者做封装以减少代码重复。

const normalizeAppendTo = (normalized: MessageOptions) => {
  const appendTo = normalized.appendTo
  if (!appendTo) {
    normalized.appendTo = document.body
  } else if (isString(normalized.appendTo)) {
    let appendTo = document.querySelector<HTMLElement>(normalized.appendTo)

    // 应回退到默认值并给出警告
    if (!isElement(appendTo)) {
      debugWarn(
        'ElMessage',
        'the appendTo option is not an HTMLElement. Falling back to document.body.'
      )
      appendTo = document.body
    }
    normalized.appendTo = appendTo
  }
}

const normalizePlacement = (normalized: MessageOptions) => {
  // 未传 placement 且全局有配置时，使用全局配置
  if (
    !normalized.placement &&
    isString(messageConfig.placement) &&
    messageConfig.placement
  ) {
    normalized.placement = messageConfig.placement as
      MessagePlacement | undefined
  }
  // 未传 placement 且全局无配置时，使用默认配置
  if (!normalized.placement) {
    normalized.placement = MESSAGE_DEFAULT_PLACEMENT
  }
  // placement 无效时，使用默认配置
  if (!messagePlacement.includes(normalized.placement!)) {
    debugWarn(
      'ElMessage',
      `Invalid placement: ${normalized.placement}. Falling back to '${MESSAGE_DEFAULT_PLACEMENT}'.`
    )
    normalized.placement = MESSAGE_DEFAULT_PLACEMENT
  }
}

const normalizeOptions = (params?: MessageParams) => {
  const options: MessageOptions =
    !params || isString(params) || isVNode(params) || isFunction(params)
      ? { message: params }
      : params

  const normalized: MessageOptions = {
    ...messageDefaults,
    ...options,
  }

  normalizeAppendTo(normalized)
  normalizePlacement(normalized)

  // 当全局配置了 grouping 时，
  // 单独调用 message 时手动设置了 grouping 且与默认值不同，
  // 全局配置不能覆盖当前设置。默认 => false
  if (isBoolean(messageConfig.grouping) && !normalized.grouping) {
    normalized.grouping = messageConfig.grouping
  }
  if (isNumber(messageConfig.duration) && normalized.duration === 3000) {
    normalized.duration = messageConfig.duration
  }
  if (isNumber(messageConfig.offset) && normalized.offset === 16) {
    normalized.offset = messageConfig.offset
  }
  if (isBoolean(messageConfig.showClose) && !normalized.showClose) {
    normalized.showClose = messageConfig.showClose
  }
  if (isBoolean(messageConfig.plain) && !normalized.plain) {
    normalized.plain = messageConfig.plain
  }

  return normalized as MessageParamsNormalized
}

const closeMessage = (instance: MessageContext) => {
  const placement = instance.props.placement || MESSAGE_DEFAULT_PLACEMENT
  const instances = placementInstances[placement]

  const idx = instances.indexOf(instance)
  if (idx === -1) return
  instances.splice(idx, 1)
  const { handler } = instance
  handler.close()
}

const createMessage = (
  { appendTo, ...options }: MessageParamsNormalized,
  context?: AppContext | null
): MessageContext => {
  const id = `message_${seed++}`
  const userOnClose = options.onClose

  const container = document.createElement('div')

  const props = {
    ...options,
    // 现在 zIndex 在 message.vue 组件内部使用，而不是在这里。
    // zIndex: nextIndex() + options.zIndex
    id,
    onClose: () => {
      userOnClose?.()
      closeMessage(instance)
    },

    // 清理 message 元素以防止内存泄漏
    onDestroy: () => {
      // 元素销毁后，VNode 也应被 GC 回收
      // 我们不希望造成内存泄漏，因为我们已把 vm 作为引用返回给用户
      // 因此手动将其设为 false。
      render(null, container)
    },
  }
  const vnode = createVNode(
    MessageConstructor,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
          default: isFunction(props.message)
            ? props.message
            : () => props.message,
        }
      : null
  )
  vnode.appContext = context || message._context

  render(vnode, container)
  // 调用 close 函数时实例会移除该项，无需为此担心。
  appendTo.appendChild(container.firstElementChild!)

  const vm = vnode.component!

  const handler: MessageHandler = {
    // 不直接调用 onClose 函数，而是设置此值以便走完完整生命周期
    // 以便组件的所有关闭步骤都不会被跳过。
    close: () => {
      vm.exposed!.close()
    },
  }

  const instance: MessageContext = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component as any).props,
  }

  return instance
}

const message: MessageFn &
  Partial<Message> & { _context: AppContext | null } = (
  options = {},
  context
) => {
  if (!isClient) return { close: () => undefined }

  const normalized = normalizeOptions(options)
  const instances = getOrCreatePlacementInstances(
    normalized.placement || MESSAGE_DEFAULT_PLACEMENT
  )

  if (normalized.grouping && instances.length) {
    const instance = instances.find(
      ({ vnode: vm }) => vm.props?.message === normalized.message
    )
    if (instance) {
      instance.props.repeatNum! += 1
      instance.props.type = normalized.type
      return instance.handler
    }
  }

  if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) {
    return { close: () => undefined }
  }

  const instance = createMessage(normalized, context)

  instances.push(instance)
  return instance.handler
}

messageTypes.forEach((type) => {
  message[type] = (options = {}, appContext) => {
    const normalized = normalizeOptions(options)
    return message({ ...normalized, type }, appContext)
  }
})

export function closeAll(type?: MessageType): void {
  for (const placement in placementInstances) {
    if (hasOwn(placementInstances, placement)) {
      // 创建 instances 的副本，避免迭代过程中被修改
      const instances: MessageContext[] = [...placementInstances[placement]]
      for (const instance of instances) {
        if (!type || type === instance.props.type) {
          instance.handler.close()
        }
      }
    }
  }
}

export function closeAllByPlacement(placement: MessagePlacement) {
  if (!placementInstances[placement]) return
  // 创建 instances 的副本，避免迭代过程中被修改
  const instances = [...placementInstances[placement]]
  instances.forEach((instance) => instance.handler.close())
}

message.closeAll = closeAll
message.closeAllByPlacement = closeAllByPlacement
message._context = null

export default message as Message
