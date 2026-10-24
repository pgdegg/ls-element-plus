import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type Color from '../utils/color'

export interface AlphaSliderProps {
  color: Color
  vertical?: boolean
  disabled?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface HueSliderProps extends AlphaSliderProps {}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `AlphaSliderProps`
 */
export const alphaSliderProps = buildProps({
  color: {
    type: definePropType<Color>(Object),
    required: true,
  },
  vertical: Boolean,
  disabled: Boolean,
} as const)

/**
 * @deprecated 自 3.0.0 后移除，请使用 `HueSliderProps`
 */
export const hueSliderProps = alphaSliderProps

/**
 * @deprecated 自 3.0.0 后移除，请使用 `AlphaSliderProps`
 */
export type AlphaSliderPropsPublic = ExtractPublicPropTypes<
  typeof alphaSliderProps
>
