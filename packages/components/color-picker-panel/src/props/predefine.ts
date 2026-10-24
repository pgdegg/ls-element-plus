import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type Color from '../utils/color'

export interface PredefineProps {
  colors: string[]
  color: Color
  enableAlpha: boolean
  disabled?: boolean
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `PredefineProps`
 */
export const predefineProps = buildProps({
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

/**
 * @deprecated 自 3.0.0 后移除，请使用 `PredefineProps`
 */
export type PredefinePropsPublic = ExtractPublicPropTypes<typeof predefineProps>
