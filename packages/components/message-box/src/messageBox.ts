import { createVNode, isVNode, markRaw, render } from 'vue'
import {
  debugWarn,
  hasOwn,
  isClient,
  isElement,
  isFunction,
  isObject,
  isString,
  isUndefined,
} from '@element-plus/utils'
import MessageBoxConstructor from './index.vue'

import type { AppContext, ComponentPublicInstance, VNode } from 'vue'
import type {
  Action,
  Callback,
  CloseFn,
  ElMessageBoxOptions,
  ElMessageBoxShortcutMethod,
  IElMessageBox,
  MessageBoxData,
  MessageBoxState,
} from './message-box.type'

// 组件默认合并 props 和 data

const messageInstance = new Map<
  ComponentPublicInstance<{ doClose: CloseFn }>, // 将 doClose 标记为函数
  {
    options: any
    callback: Callback | undefined
    resolve: (res: any) => void
    reject: (reason?: any) => void
  }
>()

const getAppendToElement = (props: any): HTMLElement => {
  let appendTo: HTMLElement | null = document.body
  if (props.appendTo) {
    if (isString(props.appendTo)) {
      appendTo = document.querySelector<HTMLElement>(props.appendTo)
    }
    if (isElement(props.appendTo)) {
      appendTo = props.appendTo
    }

    // 应回退到默认值并给出警告
    if (!isElement(appendTo)) {
      debugWarn(
        'ElMessageBox',
        'the appendTo option is not an HTMLElement. Falling back to document.body.'
      )
      appendTo = document.body
    }
  }
  return appendTo
}

const handleAction = (vnode: VNode, action: Action) => {
  const vm = vnode.component?.proxy as ComponentPublicInstance<{
    handleAction: (action: Action) => void
  }>
  return () => vm.handleAction(action)
}

const initInstance = (
  props: any,
  container: HTMLElement,
  appContext: AppContext | null = null
) => {
  const vnode = createVNode(
    MessageBoxConstructor,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
          default: isFunction(props.message)
            ? () =>
                props.message({
                  confirm: handleAction(vnode, 'confirm'),
                  cancel: handleAction(vnode, 'cancel'),
                  close: handleAction(vnode, 'close'),
                })
            : () => props.message,
        }
      : null
  )
  vnode.appContext = appContext
  render(vnode, container)
  getAppendToElement(props).appendChild(container.firstElementChild!)
  return vnode.component
}

const genContainer = () => {
  return document.createElement('div')
}

const showMessage = (options: any, appContext?: AppContext | null) => {
  const container = genContainer()
  // 添加 destruct 方法。
  // transition 离开时触发 `vanish` 事件，以便我们进行清理。
  options.onVanish = () => {
    // 不确定这是否会导致内存泄漏，需要证据验证。
    // 例如先唤起 1000 个 msg-box 再全部关闭。
    render(null, container)
    messageInstance.delete(vm) // 移除 vm 以避免内存泄漏。
    // 这里本应调用 document.body.removeChild(container.firstElementChild)
    // 但 render(null, container) 已经替我们完成了，因此不直接调用
  }

  options.onAction = (action: Action) => {
    const currentMsg = messageInstance.get(vm)!
    let resolve: Action | { value: string; action: Action }
    if (options.showInput) {
      resolve = { value: vm.inputValue, action }
    } else {
      resolve = action
    }
    if (options.callback) {
      options.callback(resolve, instance.proxy)
    } else {
      if (
        (action === 'cancel' || action === 'close') &&
        options.resolveOnCancel
      ) {
        currentMsg.resolve(
          options.distinguishCancelAndClose ? action : 'cancel'
        )
      } else if (action === 'cancel' || action === 'close') {
        if (options.distinguishCancelAndClose && action !== 'cancel') {
          currentMsg.reject('close')
        } else {
          currentMsg.reject('cancel')
        }
      } else {
        currentMsg.resolve(resolve)
      }
    }
  }

  const instance = initInstance(options, container, appContext)!

  // 这就是我们以编程方式使用消息框的方式。
  // 是否考虑发布一个模板版本？
  // 像 v2 那样获取组件实例。
  const vm = instance.proxy as ComponentPublicInstance<
    {
      visible: boolean
      doClose: CloseFn
    } & MessageBoxState
  >

  for (const prop in options) {
    if (hasOwn(options, prop) && !hasOwn(vm.$props, prop)) {
      if (prop === 'closeIcon' && isObject(options[prop])) {
        vm[prop as keyof ComponentPublicInstance] = markRaw(options[prop])
      } else {
        vm[prop as keyof ComponentPublicInstance] = options[prop]
      }
    }
  }

  // 一切就绪后再改变可见性
  vm.visible = true
  return vm
}

async function MessageBox(
  options: ElMessageBoxOptions,
  appContext?: AppContext | null
): Promise<MessageBoxData>
function MessageBox(
  options: ElMessageBoxOptions | string | VNode,
  appContext: AppContext | null = null
): Promise<MessageBoxData> {
  if (!isClient) return Promise.reject()
  let callback: Callback | undefined
  if (isString(options) || isVNode(options)) {
    options = {
      message: options,
    }
  } else {
    callback = options.callback
  }

  return new Promise((resolve, reject) => {
    const vm = showMessage(
      options,
      appContext ?? (MessageBox as IElMessageBox)._context
    )
    // 收集该 vm 以便处理后续事件。
    messageInstance.set(vm, {
      options,
      callback,
      resolve,
      reject,
    })
  })
}

const confirmDefaults: Partial<ElMessageBoxOptions> = {}
;(MessageBox as IElMessageBox).setConfirmDefaults = (options) => {
  Object.assign(confirmDefaults, options)
}

const MESSAGE_BOX_VARIANTS = ['alert', 'confirm', 'prompt'] as const
const MESSAGE_BOX_DEFAULT_OPTS: Record<
  (typeof MESSAGE_BOX_VARIANTS)[number],
  Partial<ElMessageBoxOptions>
> = {
  alert: { closeOnPressEscape: false, closeOnClickModal: false },
  confirm: { showCancelButton: true },
  prompt: { showCancelButton: true, showInput: true },
}

MESSAGE_BOX_VARIANTS.forEach((boxType) => {
  ;(MessageBox as IElMessageBox)[boxType] = messageBoxFactory(
    boxType
  ) as ElMessageBoxShortcutMethod
})

function messageBoxFactory(boxType: (typeof MESSAGE_BOX_VARIANTS)[number]) {
  return (
    message: string | VNode,
    title: string | ElMessageBoxOptions,
    options?: ElMessageBoxOptions,
    appContext?: AppContext | null
  ) => {
    let titleOrOpts = ''
    if (isObject(title)) {
      options = title as ElMessageBoxOptions
      titleOrOpts = ''
    } else if (isUndefined(title)) {
      titleOrOpts = ''
    } else {
      titleOrOpts = title as string
    }

    return MessageBox(
      Object.assign(
        {
          title: titleOrOpts,
          message,
          type: '',
          ...MESSAGE_BOX_DEFAULT_OPTS[boxType],
          ...(boxType === 'confirm' ? confirmDefaults : {}),
        },
        options,
        {
          boxType,
        }
      ),
      appContext
    )
  }
}

MessageBox.close = () => {
  // instance.setupInstall.doClose()
  // instance.setupInstall.state.visible = false

  messageInstance.forEach((_, vm) => {
    vm.doClose()
  })

  messageInstance.clear()
}
;(MessageBox as IElMessageBox)._context = null

export default MessageBox as IElMessageBox
