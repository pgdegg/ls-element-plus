import { buildProps, definePropType } from '@element-plus/utils'

import type Color from '../utils/color'

export interface PredefineProps {
  colors: string[]
  color: Color
  enableAlpha: boolean
  disabled?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const predefinePropDefs = buildProps({
  colors: {
    type: definePropType<string[]>(Array),
    required: true,
  },
  color: {
    type: definePropType<Color>(Object),
    required: true,
  },
  enableAlpha: {
    type: Boolean,
    required: true,
  },
  disabled: Boolean,
} as const)
