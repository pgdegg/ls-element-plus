const FOCUSABLE_ELEMENT_SELECTORS = `a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])`

export const isShadowRoot = (e: unknown): e is ShadowRoot => {
  if (typeof ShadowRoot === 'undefined') return false
  return e instanceof ShadowRoot
}

const isHTMLElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false
  return e instanceof Element
}

/**
 * 判断待测试元素在屏幕上是否可见，无论它是否位于视口内
 */
export const isVisible = (element: HTMLElement) => {
  if (process.env.NODE_ENV === 'test') return true
  const computed = getComputedStyle(element)
  // 对于 fixed 定位的元素，element.offsetParent 无效
  // 警告：这里存在潜在问题，需要该领域专家提供建议
  return computed.position === 'fixed' ? false : element.offsetParent !== null
}

export const obtainAllFocusableElements = (
  element: HTMLElement
): HTMLElement[] => {
  return Array.from(
    element.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENT_SELECTORS)
  ).filter((item: HTMLElement) => isFocusable(item) && isVisible(item))
}

/**
 * @desc 判断目标元素是否可聚焦
 * @param element {HTMLElement}
 * @returns {Boolean} 若可聚焦则为 true
 */
export const isFocusable = (element: HTMLElement): boolean => {
  if (
    element.tabIndex > 0 ||
    (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)
  ) {
    return true
  }
  if (
    element.tabIndex < 0 ||
    element.hasAttribute('disabled') ||
    element.getAttribute('aria-disabled') === 'true'
  ) {
    return false
  }

  switch (element.nodeName) {
    case 'A': {
      // 将当前元素断言为特定 HTMLElement，以获得更精确的类型
      return (
        !!(element as HTMLAnchorElement).href &&
        (element as HTMLAnchorElement).rel !== 'ignore'
      )
    }
    case 'INPUT': {
      return !(
        (element as HTMLInputElement).type === 'hidden' ||
        (element as HTMLInputElement).type === 'file'
      )
    }
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA': {
      return true
    }
    default: {
      return false
    }
  }
}

/**
 * 触发一个事件
 * mouseenter、mouseleave、mouseover、keyup、change、click 等。
 * @param  {HTMLElement} elm
 * @param  {String} name
 * @param  {*} opts
 */
export const triggerEvent = function (
  elm: HTMLElement,
  name: string,
  ...opts: Array<boolean>
): HTMLElement {
  let eventName: string

  if (name.includes('mouse') || name.includes('click')) {
    eventName = 'MouseEvents'
  } else if (name.includes('key')) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }
  const evt = document.createEvent(eventName)

  evt.initEvent(name, ...opts)
  elm.dispatchEvent(evt)
  return elm
}

export const isLeaf = (el: HTMLElement) => !el.getAttribute('aria-owns')

export const getSibling = (
  el: HTMLElement,
  distance: number,
  elClass: string
) => {
  const { parentNode } = el
  if (!parentNode) return null
  const siblings = parentNode.querySelectorAll(elClass)
  const index = Array.prototype.indexOf.call(siblings, el)
  return siblings[index + distance] || null
}

export const focusElement = (
  el?: HTMLElement | { focus: () => void } | null,
  options?: FocusOptions
) => {
  if (!el || !el.focus) return
  let cleanup: boolean = false

  if (isHTMLElement(el) && !isFocusable(el) && !el.getAttribute('tabindex')) {
    el.setAttribute('tabindex', '-1')
    cleanup = true
  }

  el.focus(options)

  if (isHTMLElement(el) && cleanup) {
    el.removeAttribute('tabindex')
  }
}

export const focusNode = (el: HTMLElement) => {
  if (!el) return
  focusElement(el)
  !isLeaf(el) && el.click()
}
