import { computed, ref, watch } from 'vue'
import { isString } from '@element-plus/utils'

import type { ComputedRef, Ref } from 'vue'
import type { PanelItemState } from '../type'

export function getPct(str: string) {
  return Number(str.slice(0, -1)) / 100
}

export function getPx(str: string) {
  return Number(str.slice(0, -2))
}

export function isPct(
  itemSize: string | number | undefined
): itemSize is string {
  return isString(itemSize) && itemSize.endsWith('%')
}

export function isPx(
  itemSize: string | number | undefined
): itemSize is string {
  return isString(itemSize) && itemSize.endsWith('px')
}

export function useSize(
  panels: Ref<PanelItemState[]>,
  containerSize: ComputedRef<number>
) {
  const propSizes = computed(() => panels.value.map((i) => i.size))

  const panelCounts = computed(() => panels.value.length)

  const percentSizes = ref<number[]>([])

  watch([propSizes, panelCounts, containerSize], () => {
    let ptgList: (number | undefined)[] = []
    let emptyCount = 0

    // 将传入的 props size 转换为百分比
    for (let i = 0; i < panelCounts.value; i += 1) {
      const itemSize = panels.value[i]?.size

      if (isPct(itemSize)) {
        ptgList[i] = getPct(itemSize)
      } else if (isPx(itemSize)) {
        ptgList[i] = getPx(itemSize) / containerSize.value
      } else if (itemSize || itemSize === 0) {
        const num = Number(itemSize)

        if (!Number.isNaN(num)) {
          ptgList[i] = num / containerSize.value
        }
      } else {
        emptyCount += 1
        ptgList[i] = undefined
      }
    }

    const totalPtg = ptgList.reduce<number>((acc, ptg) => acc + (ptg || 0), 0)

    if (totalPtg > 1 || !emptyCount) {
      // 如果大于 1，则为缩放比例
      const scale = 1 / totalPtg
      ptgList = ptgList.map((ptg) => (ptg === undefined ? 0 : ptg * scale))
    } else {
      // 如果小于 1，则为填充比例
      const avgRest = (1 - totalPtg) / emptyCount
      ptgList = ptgList.map((ptg) => (ptg === undefined ? avgRest : ptg))
    }

    percentSizes.value = ptgList as number[]
  })

  const ptg2px = (ptg: number) => ptg * containerSize.value
  const pxSizes = computed(() => percentSizes.value.map(ptg2px))

  return { percentSizes, pxSizes }
}
