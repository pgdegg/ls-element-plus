import {
  buildProps,
  definePropType,
  isBoolean,
  isNumber,
} from '@element-plus/utils'
import { CHANGE_EVENT } from '@element-plus/constants'

import type { ExtractPublicPropTypes } from 'vue'
import type Affix from './affix.vue'
import type { ZIndexType } from '@element-plus/utils'

export interface AffixProps {
  /**
   * @description affix 元素的 zIndex 值
   */
  zIndex?: ZIndexType
  /**
   * @description 目标容器（CSS 选择器）
   */
  target?: string
  /**
   * @description 偏移距离
   */
  offset?: number
  /**
   * @description 固定位置
   */
  position?: 'top' | 'bottom'
  /**
   * @description affix 元素是否被传送；若为 `true`，将被传送到 `append-to` 指定的位置
   */
  teleported?: boolean
  /**
   * @description affix 元素追加到哪个元素
   */
  appendTo?: string | HTMLElement
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `AffixProps`
 */
export const affixProps = buildProps({
  /**
   * @description affix 元素的 zIndex 值
   */
  zIndex: {
    type: definePropType<ZIndexType>([Number, String]),
    default: 100,
  },
  /**
   * @description 目标容器（CSS 选择器）
   */
  target: {
    type: String,
    default: '',
  },
  /**
   * @description 偏移距离
   */
  offset: {
    type: Number,
    default: 0,
  },
  /**
   * @description 固定位置
   */
  position: {
    type: String,
    values: ['top', 'bottom'],
    default: 'top',
  },
  /**
   * @description affix 元素是否被传送；若为 `true`，将被传送到 `append-to` 指定的位置
   */
  teleported: Boolean,
  /**
   * @description affix 元素追加到哪个元素
   */
  appendTo: {
    type: definePropType<string | HTMLElement>([String, Object]),
    default: 'body',
  },
} as const)

/**
 * @deprecated 自 3.0.0 后移除，请使用 `AffixProps`
 */
export type AffixPropsPublic = ExtractPublicPropTypes<typeof affixProps>

export const affixEmits = {
  scroll: ({ scrollTop, fixed }: { scrollTop: number; fixed: boolean }) =>
    isNumber(scrollTop) && isBoolean(fixed),
  [CHANGE_EVENT]: (fixed: boolean) => isBoolean(fixed),
}
export type AffixEmits = typeof affixEmits

export type AffixInstance = InstanceType<typeof Affix> & unknown
