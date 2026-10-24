import { cAF, rAF } from '@element-plus/utils'

import type { ComputedRef } from 'vue'

interface GridWheelState {
  atXStartEdge: ComputedRef<boolean>
  atXEndEdge: ComputedRef<boolean>
  atYStartEdge: ComputedRef<boolean>
  atYEndEdge: ComputedRef<boolean>
}

type GridWheelHandler = (x: number, y: number) => void

export const useGridWheel = (
  { atXEndEdge, atXStartEdge, atYEndEdge, atYStartEdge }: GridWheelState,
  onWheelDelta: GridWheelHandler
) => {
  let frameHandle: number | null = null
  let xOffset = 0
  let yOffset = 0

  const hasReachedEdge = (x: number, y: number) => {
    const xEdgeReached =
      (x < 0 && atXStartEdge.value) || (x > 0 && atXEndEdge.value)
    const yEdgeReached =
      (y < 0 && atYStartEdge.value) || (y > 0 && atYEndEdge.value)
    return xEdgeReached || yEdgeReached
  }

  const onWheel = (e: WheelEvent) => {
    cAF(frameHandle!)

    let x = e.deltaX
    let y = e.deltaY
    // 模拟使用触控板滚轮时的原生行为。
    if (Math.abs(x) > Math.abs(y)) {
      y = 0
    } else {
      x = 0
    }

    // Windows 机器上 Shift 键 + 滚轮滚动的特殊情况
    if (e.shiftKey && y !== 0) {
      x = y
      y = 0
    }

    if (hasReachedEdge(x, y)) {
      // #23524
      // 在表格仍可滚动时阻止浏览器后退导航
      //（表格）横向滚动，但 Y 轴归一化丢弃了 X 增量，转而命中了 Y 边缘。
      if (e.deltaX !== 0 && x === 0) {
        e.preventDefault()
      }
      return
    }

    xOffset += x
    yOffset += y

    e.preventDefault()

    frameHandle = rAF(() => {
      onWheelDelta(xOffset, yOffset)
      xOffset = 0
      yOffset = 0
    })
  }

  return {
    hasReachedEdge,
    onWheel,
  }
}
