/* eslint-disable @typescript-eslint/no-unused-vars */

import { buildProps } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type Popper from './popper.vue'

const effects = ['light', 'dark'] as const
const triggers = ['click', 'contextmenu', 'hover', 'focus'] as const

export const Effect = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export const roleTypes = [
  'dialog',
  'grid',
  'group',
  'listbox',
  'menu',
  'navigation',
  'tooltip',
  'tree',
] as const

export type PopperEffect =
  (typeof effects)[number] | (string & NonNullable<unknown>)
export type PopperTrigger = (typeof triggers)[number]

export interface PopperProps {
  /**
   * @description role 决定 aria 属性如何分配
   */
  role?: (typeof roleTypes)[number]
}

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `PopperProps`。
 */
export const popperProps = buildProps({
  role: {
    type: String,
    values: roleTypes,
    default: 'tooltip',
  },
} as const)

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `PopperProps`。
 */
export type PopperPropsPublic = ExtractPublicPropTypes<typeof popperProps>

export type PopperInstance = InstanceType<typeof Popper> & unknown

/** @deprecated 请改用 `popperProps`，它将在下一个大版本中被废弃 */
export const usePopperProps = popperProps

/** @deprecated 请改用 `PopperProps`，它将在下一个大版本中被废弃 */
export type UsePopperProps = PopperProps
