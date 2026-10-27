import { placements } from '@popperjs/core'
import { buildProps, definePropType } from '@element-plus/utils'
import { useAriaProps } from '@element-plus/hooks'
import { popperArrowPropDefs, popperArrowPropsDefaults } from './arrow'

import type { ClassValue } from '@element-plus/utils'
import type { PopperEffect } from './popper'
import type { StyleValue } from 'vue'
import type { Options, Placement } from '@popperjs/core'
import type { Measurable } from './constants'
import type Content from './content.vue'
import type { PopperArrowProps } from './arrow'

const POSITIONING_STRATEGIES = ['fixed', 'absolute'] as const

export interface CreatePopperInstanceParams {
  referenceEl: Measurable
  popperContentEl: HTMLElement
  arrowEl: HTMLElement | undefined
}

export interface PopperCoreConfigProps {
  boundariesPadding?: number
  fallbackPlacements?: Placement[]
  gpuAcceleration?: boolean
  /**
   * @description Tooltip 的偏移量
   */
  offset?: number
  /**
   * @description Tooltip 的位置
   */
  placement?: Placement
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) 参数
   */
  popperOptions?: Partial<Options>
  strategy?: (typeof POSITIONING_STRATEGIES)[number]
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const popperCoreConfigPropDefs = buildProps({
  boundariesPadding: {
    type: Number,
    default: 0,
  },
  fallbackPlacements: {
    type: definePropType<Placement[]>(Array),
    default: undefined,
  },
  gpuAcceleration: {
    type: Boolean,
    default: true,
  },
  /**
   * @description Tooltip 的偏移量
   */
  offset: {
    type: Number,
    default: 12,
  },
  /**
   * @description Tooltip 的位置
   */
  placement: {
    type: String,
    values: placements,
    default: 'bottom',
  },
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) 参数
   */
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({}),
  },
  strategy: {
    type: String,
    values: POSITIONING_STRATEGIES,
    default: 'absolute',
  },
} as const)

export interface PopperContentProps
  extends PopperCoreConfigProps, PopperArrowProps {
  id?: string
  style?: StyleValue
  className?: ClassValue
  effect?: PopperEffect
  visible?: boolean
  enterable?: boolean
  pure?: boolean
  focusOnShow?: boolean
  trapping?: boolean
  popperClass?: ClassValue
  popperStyle?: StyleValue
  referenceEl?: HTMLElement
  triggerTargetEl?: HTMLElement
  stopPopperMouseEvent?: boolean
  virtualTriggering?: boolean
  zIndex?: number
  ariaLabel?: string
  loop?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const popperContentPropDefs = buildProps({
  ...popperCoreConfigPropDefs,
  ...popperArrowPropDefs,
  id: String,
  style: {
    type: definePropType<StyleValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  className: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
  },
  effect: {
    type: definePropType<PopperEffect>(String),
    default: 'dark',
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: true,
  },
  pure: Boolean,
  focusOnShow: Boolean,
  trapping: Boolean,
  popperClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  popperStyle: {
    type: definePropType<StyleValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  referenceEl: {
    type: definePropType<HTMLElement>(Object),
  },
  triggerTargetEl: {
    type: definePropType<HTMLElement>(Object),
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true,
  },
  virtualTriggering: Boolean,
  zIndex: Number,
  ...useAriaProps(['ariaLabel']),
  loop: Boolean,
} as const)

export const popperCoreConfigPropsDefaults = {
  boundariesPadding: 0,
  gpuAcceleration: true,
  offset: 12,
  placement: 'bottom',
  popperOptions: () => ({}),
  strategy: 'absolute',
} as const

export const popperContentPropsDefaults = {
  ...popperCoreConfigPropsDefaults,
  ...popperArrowPropsDefaults,
  effect: 'dark',
  enterable: true,
  stopPopperMouseEvent: true,
  visible: false,
  pure: false,
  focusOnShow: false,
  trapping: false,
  virtualTriggering: false,
  loop: false,
  style: undefined,
  popperStyle: undefined,
  popperClass: undefined,
} as const

export const popperContentEmits = {
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  focus: () => true,
  blur: () => true,
  close: () => true,
}
export type PopperContentEmits = typeof popperContentEmits

export type PopperContentInstance = InstanceType<typeof Content> & unknown
