/* eslint-disable @typescript-eslint/no-unused-vars */

import { buildProps } from '@element-plus/utils'

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

/** @internal Runtime prop definitions; use the public props interface for types. */
export const popperPropDefs = buildProps({
  role: {
    type: String,
    values: roleTypes,
    default: 'tooltip',
  },
} as const)

export type PopperInstance = InstanceType<typeof Popper> & unknown
