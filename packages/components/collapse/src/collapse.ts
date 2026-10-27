import {
  buildProps,
  definePropType,
  isArray,
  isNumber,
  isString,
  mutable,
} from '@element-plus/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'

import type { Arrayable, Awaitable } from '@element-plus/utils'

export type CollapseActiveName = string | number
export type CollapseModelValue = Arrayable<CollapseActiveName>

export type CollapseIconPositionType = 'left' | 'right'

export const emitChangeFn = (value: CollapseModelValue) =>
  isNumber(value) || isString(value) || isArray(value)

export interface CollapseProps {
  /**
   * @description 是否启用手风琴模式
   */
  accordion?: boolean
  /**
   * @description 当前激活的面板，手风琴模式下类型为 `string`，否则为 `array`
   */
  modelValue?: CollapseModelValue
  /**
   * @description 设置展开图标的位置
   */
  expandIconPosition?: CollapseIconPositionType
  /**
   * @description 折叠状态变化前的 before-collapse 钩子。若返回 `false`，或返回 `Promise` 后被拒绝，则停止折叠
   */
  beforeCollapse?: (name: CollapseActiveName) => Awaitable<boolean>
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const collapsePropDefs = buildProps({
  /**
   * @description 是否启用手风琴模式
   */
  accordion: Boolean,
  /**
   * @description 当前激活的面板，手风琴模式下类型为 `string`，否则为 `array`
   */
  modelValue: {
    type: definePropType<CollapseModelValue>([Array, String, Number]),
    default: () => mutable([] as const),
  },
  /**
   * @description 设置展开图标的位置
   */
  expandIconPosition: {
    type: definePropType<CollapseIconPositionType>([String]),
    default: 'right',
  },
  /**
   * @description 折叠状态变化前的 before-collapse 钩子。若返回 `false`，或返回 `Promise` 后被拒绝，则停止折叠
   */
  beforeCollapse: {
    type: definePropType<(name: CollapseActiveName) => Awaitable<boolean>>(
      Function
    ),
  },
} as const)

export const collapseEmits = {
  [UPDATE_MODEL_EVENT]: emitChangeFn,
  [CHANGE_EVENT]: emitChangeFn,
}
export type CollapseEmits = typeof collapseEmits
