import { EVENT_CODE } from '@element-plus/constants'
import { isAndroid } from '../browser'

export const composeEventHandlers = <E>(
  theirsHandler?: (event: E) => boolean | void,
  oursHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {}
) => {
  const handleEvent = (event: E) => {
    const shouldPrevent = theirsHandler?.(event)

    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandler?.(event)
    }
  }
  return handleEvent
}

type WhenMouseHandler = (e: PointerEvent) => any
export const whenMouse = (handler: WhenMouseHandler): WhenMouseHandler => {
  return (e: PointerEvent) =>
    e.pointerType === 'mouse' ? handler(e) : undefined
}

export const getEventCode = (event: KeyboardEvent): string => {
  if (event.code && event.code !== 'Unidentified') return event.code
  // 在 Android 上，event.code 始终为 ''（参见 https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code#browser_compatibility）
  const key = getEventKey(event)

  if (key) {
    if (Object.values(EVENT_CODE).includes(key)) return key

    switch (key) {
      case ' ':
        return EVENT_CODE.space
      default:
        return ''
    }
  }

  return ''
}

export const getEventKey = (event: KeyboardEvent): string => {
  let key = event.key && event.key !== 'Unidentified' ? event.key : ''

  // 在 Android 上，输入字符或空格时 event.key 与 event.code 可能不可用
  // 因此这里直接取输入的最后一个字符
  // **仅在 keyup 事件中生效**
  if (!key && event.type === 'keyup' && isAndroid()) {
    const target = event.target as HTMLInputElement
    key = target.value.charAt(target.selectionStart! - 1)
  }

  return key
}
