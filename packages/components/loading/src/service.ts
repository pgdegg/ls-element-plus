// @ts-nocheck
import { nextTick } from 'vue'
import {
  addClass,
  getStyle,
  isClient,
  isString,
  removeClass,
} from '@element-plus/utils'
import { createLoadingComponent } from './loading'

import type { UseNamespaceReturn, UseZIndexReturn } from '@element-plus/hooks'
import type { LoadingInstance } from './loading'
import type { LoadingOptionsResolved } from '..'
import type { LoadingOptions } from './types'
import type { AppContext, CSSProperties } from 'vue'

let fullscreenInstance: LoadingInstance | undefined = undefined

const Loading = function (
  options: LoadingOptions = {},
  context?: AppContext | null
): LoadingInstance {
  if (!isClient) return undefined as any

  const resolved = resolveOptions(options)

  if (resolved.fullscreen && fullscreenInstance) {
    return fullscreenInstance
  }

  const instance = createLoadingComponent(
    {
      ...resolved,
      closed: () => {
        resolved.closed?.()
        if (resolved.fullscreen) fullscreenInstance = undefined
      },
    },
    context ?? Loading._context
  )

  addStyle(resolved, resolved.parent, instance)
  addClassList(resolved, resolved.parent, instance)

  resolved.parent.vLoadingAddClassList = () =>
    addClassList(resolved, resolved.parent, instance)

  /**
   * 向父级添加 loading-number。
   * 因为如果某处先前触发过 v-loading.body（其父级为带 margin 的 document.body），
   * 此时再触发全屏 loading，全屏 loading 的 destroySelf 函数会移除 'el-loading-parent--relative'，
   * 随后 v-loading.body 的位置就会出错。
   */
  let loadingNumber: string | null =
    resolved.parent.getAttribute('loading-number')
  if (!loadingNumber) {
    loadingNumber = '1'
  } else {
    loadingNumber = `${Number.parseInt(loadingNumber) + 1}`
  }
  resolved.parent.setAttribute('loading-number', loadingNumber)

  resolved.parent.appendChild(instance.$el!)

  // 实例渲染后，再修改 visible 以触发 transition
  nextTick(() => (instance.visible.value = resolved.visible))

  if (resolved.fullscreen) {
    fullscreenInstance = instance
  }
  return instance
}

const resolveOptions = (options: LoadingOptions): LoadingOptionsResolved => {
  let target: HTMLElement
  if (isString(options.target)) {
    target =
      document.querySelector<HTMLElement>(options.target) ?? document.body
  } else {
    target = options.target || document.body
  }
  return {
    parent: target === document.body || options.body ? document.body : target,
    background: options.background || '',
    svg: options.svg || '',
    svgViewBox: options.svgViewBox || '',
    spinner: options.spinner || false,
    text: options.text || '',
    fullscreen: target === document.body && (options.fullscreen ?? true),
    lock: options.lock ?? false,
    customClass: options.customClass || '',
    visible: options.visible ?? true,
    beforeClose: options.beforeClose,
    closed: options.closed,
    target,
  }
}

const addStyle = async (
  options: LoadingOptionsResolved,
  parent: HTMLElement,
  instance: LoadingInstance
) => {
  // 兼容 vue@3.2.12 及更早版本的实例数据格式 #12351
  const { nextZIndex } =
    ((instance.vm as any).zIndex as UseZIndexReturn) ||
    (instance.vm as any)._.exposed.zIndex

  const maskStyle: CSSProperties = {}
  if (options.fullscreen) {
    instance.originalPosition.value = getStyle(document.body, 'position')
    instance.originalOverflow.value = getStyle(document.body, 'overflow')
    maskStyle.zIndex = nextZIndex()
  } else if (options.parent === document.body) {
    instance.originalPosition.value = getStyle(document.body, 'position')
    /**
     * 初始化时 visible 为 true 则等待 DOM 渲染，
     * 因为某些组件的高度可能为 0，
     * 例如 el-table。
     */
    await nextTick()
    for (const property of ['top', 'left']) {
      const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft'
      maskStyle[property] = `${
        (options.target as HTMLElement).getBoundingClientRect()[property] +
        document.body[scroll] +
        document.documentElement[scroll] -
        Number.parseInt(getStyle(document.body, `margin-${property}`), 10)
      }px`
    }
    for (const property of ['height', 'width']) {
      maskStyle[property] = `${
        (options.target as HTMLElement).getBoundingClientRect()[property]
      }px`
    }
  } else {
    instance.originalPosition.value = getStyle(parent, 'position')
  }
  for (const [key, value] of Object.entries(maskStyle)) {
    instance.$el!.style[key] = value
  }
}

const addClassList = (
  options: LoadingOptions,
  parent: HTMLElement,
  instance: LoadingInstance
) => {
  // 兼容 vue@3.2.12 及更早版本的实例数据格式 #12351
  const ns =
    ((instance.vm as any).ns as UseNamespaceReturn) ||
    (instance.vm as any)._.exposed.ns

  if (
    !['absolute', 'fixed', 'sticky'].includes(instance.originalPosition.value)
  ) {
    addClass(parent, ns.bm('parent', 'relative'))
  } else {
    removeClass(parent, ns.bm('parent', 'relative'))
  }
  if (options.fullscreen && options.lock) {
    addClass(parent, ns.bm('parent', 'hidden'))
  } else {
    removeClass(parent, ns.bm('parent', 'hidden'))
  }
}

Loading._context = null as AppContext | null
export default Loading
