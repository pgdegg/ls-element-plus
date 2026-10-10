import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type Icon from './icon.vue'

export interface IconProps {
  /** SVG symbol name. */
  symbol?: string
  prefix?: string | string[]
  /** App-owned symbol resolver; defaults to the document sprite. */
  symbolResolver?: (symbol: string, prefix: string | string[]) => Element | null
  /** Re-resolve after an async sprite update. */
  symbolVersion?: string | number
  /**
   * @description SVG icon size, size x size
   */
  size?: number | string
  /**
   * @description SVG tag's fill attribute
   */
  color?: string
}

/**
 * @deprecated Removed after 3.0.0, Use `IconProps` instead.
 */
export const iconProps = buildProps({
  symbol: String,
  prefix: {
    type: definePropType<string | string[]>([String, Array]),
    default: 'icon',
  },
  symbolResolver: {
    type: definePropType<IconProps['symbolResolver']>(Function),
  },
  symbolVersion: { type: definePropType<string | number>([String, Number]) },
  /**
   * @description SVG icon size, size x size
   */
  size: {
    type: definePropType<number | string>([Number, String]),
  },
  /**
   * @description SVG tag's fill attribute
   */
  color: {
    type: String,
  },
} as const)

/**
 * @deprecated Removed after 3.0.0, Use `IconProps` instead.
 */
export type IconPropsPublic = ExtractPublicPropTypes<typeof iconProps>
export type IconInstance = InstanceType<typeof Icon> & unknown
