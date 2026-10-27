import { buildProps, definePropType } from '@element-plus/utils'

import type Icon from './icon.vue'

export interface IconProps {
  /** SVG symbol 名称。 */
  symbol?: string
  prefix?: string | string[]
  /** 应用自有的 symbol 解析器；默认为 document sprite。 */
  symbolResolver?: (symbol: string, prefix: string | string[]) => Element | null
  /** 异步 sprite 更新后重新解析。 */
  symbolVersion?: string | number
  /**
   * @description SVG 图标尺寸，size x size
   */
  size?: number | string
  /**
   * @description SVG 标签的 fill 属性
   */
  color?: string
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const iconPropDefs = buildProps({
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
   * @description SVG 图标尺寸，size x size
   */
  size: {
    type: definePropType<number | string>([Number, String]),
  },
  /**
   * @description SVG 标签的 fill 属性
   */
  color: {
    type: String,
  },
} as const)
export type IconInstance = InstanceType<typeof Icon> & unknown
