import { buildProps, definePropType } from '@element-plus/utils'

import type { Measurable } from './constants'
import type Trigger from './trigger.vue'

export interface PopperTriggerProps {
  /** @description popper 所附着的参考元素 */
  virtualRef?: Measurable
  /** @description 是否启用虚拟触发 */
  virtualTriggering?: boolean
  onMouseenter?: (e: MouseEvent) => void
  onMouseleave?: (e: MouseEvent) => void
  onClick?: (e: PointerEvent) => void
  onKeydown?: (e: KeyboardEvent) => void
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
  onContextmenu?: (e: PointerEvent) => void
  id?: string
  open?: boolean
}

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `PopperTriggerProps`。
 */
export const popperTriggerProps = buildProps({
  /** @description popper 所附着的参考元素 */
  virtualRef: {
    type: definePropType<Measurable>(Object),
  },
  /** @description 是否启用虚拟触发 */
  virtualTriggering: Boolean,
  onMouseenter: {
    type: definePropType<(e: MouseEvent) => void>(Function),
  },
  onMouseleave: {
    type: definePropType<(e: MouseEvent) => void>(Function),
  },
  onClick: {
    type: definePropType<(e: PointerEvent) => void>(Function),
  },
  onKeydown: {
    type: definePropType<(e: KeyboardEvent) => void>(Function),
  },
  onFocus: {
    type: definePropType<(e: FocusEvent) => void>(Function),
  },
  onBlur: {
    type: definePropType<(e: FocusEvent) => void>(Function),
  },
  onContextmenu: {
    type: definePropType<(e: PointerEvent) => void>(Function),
  },
  id: String,
  open: Boolean,
} as const)

export type PopperTriggerInstance = InstanceType<typeof Trigger> & unknown

/** @deprecated 请改用 `popperTriggerProps`，它将在下一个大版本中被废弃 */
export const usePopperTriggerProps = popperTriggerProps

/** @deprecated 请改用 `PopperTriggerInstance`，它将在下一个大版本中被废弃 */
export type ElPopperArrowTrigger = PopperTriggerInstance
