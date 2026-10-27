import { buildProps, definePropType } from '@element-plus/utils'

import type Color from '../utils/color'

export interface AlphaSliderProps {
  color: Color
  vertical?: boolean
  disabled?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HueSliderProps extends AlphaSliderProps {}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const alphaSliderPropDefs = buildProps({
  color: {
    type: definePropType<Color>(Object),
    required: true,
  },
  vertical: Boolean,
  disabled: Boolean,
} as const)
