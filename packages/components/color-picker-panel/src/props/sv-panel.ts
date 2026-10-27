import { buildProps, definePropType } from '@element-plus/utils'

import type Color from '../utils/color'

export interface SvPanelProps {
  color: Color
  disabled?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const svPanelPropDefs = buildProps({
  color: {
    type: definePropType<Color>(Object),
    required: true,
  },
  disabled: Boolean,
} as const)
