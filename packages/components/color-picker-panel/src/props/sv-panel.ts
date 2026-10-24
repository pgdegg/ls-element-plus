import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type Color from '../utils/color'

export interface SvPanelProps {
  color: Color
  disabled?: boolean
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `SvPanelProps`
 */
export const svPanelProps = buildProps({
  color: {
    type: definePropType<Color>(Object),
    required: true,
  },
  disabled: Boolean,
} as const)

/**
 * @deprecated 自 3.0.0 后移除，请使用 `SvPanelProps`
 */
export type SvPanelPropsPublic = ExtractPublicPropTypes<typeof svPanelProps>
