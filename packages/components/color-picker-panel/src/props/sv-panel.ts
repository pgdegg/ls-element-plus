import { buildProps, definePropType } from '@element-plus/utils'

import type Color from '../utils/color'

export interface SvPanelProps {
  color: Color
  disabled?: boolean
}

/** Runtime prop definitions; use the public props interface for types. */
export const SvPanelDefaultValueProps = buildProps({
  color: {
    type: definePropType<Color>(Object),
    required: true,
  },
  disabled: Boolean,
} as const)
