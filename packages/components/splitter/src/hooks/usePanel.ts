import { isObject } from '@element-plus/utils'

import type { PanelItemState } from '../type'

export function getCollapsible(
  collapsible: boolean | { start?: boolean; end?: boolean }
) {
  if (collapsible && isObject(collapsible)) {
    return collapsible
  }
  return {
    start: !!collapsible,
    end: !!collapsible,
  }
}

export function isCollapsible(
  panel: PanelItemState | null | undefined,
  size: number,
  nextPanel: PanelItemState | null | undefined,
  nextSize: number
) {
  // 如果当前面板可折叠且有尺寸，则可以折叠
  if (panel?.collapsible.end && size > 0) {
    return true
  }

  // 如果下一个面板可折叠且无尺寸，但当前面板有尺寸，则当前面板可以折叠
  if (nextPanel?.collapsible.start && nextSize === 0 && size > 0) {
    return true
  }

  return false
}
