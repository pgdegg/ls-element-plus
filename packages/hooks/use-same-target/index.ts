import { NOOP } from '@element-plus/utils'

export const useSameTarget = (handleClick?: (e: MouseEvent) => void) => {
  if (!handleClick) {
    return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP }
  }

  let mousedownTarget = false
  let mouseupTarget = false
  // 参考 https://javascript.info/mouse-events-basics
  // 事件触发顺序：mousedown -> mouseup -> click
  // 我们需要在 click 触发后将 mousedown 标记设为 false。
  const onClick = (e: MouseEvent) => {
    // 当且仅当
    if (mousedownTarget && mouseupTarget) {
      handleClick(e)
    }
    mousedownTarget = mouseupTarget = false
  }

  const onMousedown = (e: MouseEvent) => {
    // 标记当前 mousedown 的目标。
    mousedownTarget = e.target === e.currentTarget
  }
  const onMouseup = (e: MouseEvent) => {
    // 标记当前 mouseup 的目标。
    mouseupTarget = e.target === e.currentTarget
  }

  return { onClick, onMousedown, onMouseup }
}
