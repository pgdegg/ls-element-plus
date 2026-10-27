import { buildProps, definePropType } from '@element-plus/utils'

import type { PosInfo } from './types'

export interface MaskProps {
  /**
   * @description 遮罩的 zIndex
   */
  zIndex?: number
  /**
   * @description 是否显示遮罩
   */
  visible?: boolean
  /**
   * @description 遮罩的填充色
   */
  fill?: string
  /***
   * @description 遮罩透明区域的位置
   */
  pos?: PosInfo | null
  /**
   * @description 使用遮罩时目标元素是否可点击
   */
  targetAreaClickable?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const maskPropDefs = buildProps({
  /**
   * @description 遮罩的 zIndex
   */
  zIndex: {
    type: Number,
    default: 1001,
  },
  /**
   * @description 是否显示遮罩
   */
  visible: Boolean,
  /**
   * @description 遮罩的填充色
   */
  fill: {
    type: String,
    default: 'rgba(0,0,0,0.5)',
  },
  /***
   * @description 遮罩透明区域的位置
   */
  pos: {
    type: definePropType<PosInfo | null>(Object),
  },
  /**
   * @description 使用遮罩时目标元素是否可点击
   */
  targetAreaClickable: {
    type: Boolean,
    default: true,
  },
})
