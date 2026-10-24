import { buildProps } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type Arrow from './arrow.vue'

export interface PopperArrowProps {
  /**
   * @description 箭头偏移量
   */
  arrowOffset?: number
}

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `PopperArrowProps`。
 */
export const popperArrowProps = buildProps({
  arrowOffset: {
    type: Number,
    default: 5,
  },
} as const)

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `PopperArrowProps`。
 */
export type PopperArrowPropsPublic = ExtractPublicPropTypes<
  typeof popperArrowProps
>

export const popperArrowPropsDefaults = {
  arrowOffset: 5,
} as const

export type PopperArrowInstance = InstanceType<typeof Arrow> & unknown

/** @deprecated 请改用 `popperArrowProps`，它将在下一个大版本中被废弃 */
export const usePopperArrowProps = popperArrowProps

/** @deprecated 请改用 `PopperArrowProps`，它将在下一个大版本中被废弃 */
export type UsePopperArrowProps = PopperArrowProps

/** @deprecated 请改用 `PopperArrowInstance`，它将在下一个大版本中被废弃 */
export type ElPopperArrowInstance = PopperArrowInstance
