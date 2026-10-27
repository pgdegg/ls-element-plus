import { withInstall } from '@element-plus/utils'
import Popper from './src/popper.vue'
import ElPopperArrow from './src/arrow.vue'
import ElPopperTrigger from './src/trigger.vue'
import ElPopperContent from './src/content.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export { ElPopperArrow, ElPopperTrigger, ElPopperContent }

export const ElPopper: SFCWithInstall<typeof Popper> = withInstall(Popper)
export default ElPopper

export { Effect, roleTypes } from './src/popper'
export type {
  PopperEffect,
  PopperTrigger,
  PopperProps,
  PopperInstance,
} from './src/popper'
export type { PopperTriggerProps, PopperTriggerInstance } from './src/trigger'
export {
  popperCoreConfigPropsDefaults,
  popperContentPropsDefaults,
  popperContentEmits,
} from './src/content'
export type {
  CreatePopperInstanceParams,
  PopperCoreConfigProps,
  PopperContentProps,
  PopperContentEmits,
  PopperContentInstance,
} from './src/content'
export { popperArrowPropsDefaults } from './src/arrow'
export type { PopperArrowProps, PopperArrowInstance } from './src/arrow'
export * from './src/constants'

export type { Placement, Options } from '@popperjs/core'
