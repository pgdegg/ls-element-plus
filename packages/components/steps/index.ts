import { withInstall, withNoopInstall } from '@element-plus/utils'
import Steps from './src/steps.vue'
import Step from './src/item.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElSteps: SFCWithInstall<typeof Steps> & {
  Step: typeof Step
} = withInstall(Steps, {
  Step,
})
export default ElSteps
export const ElStep: SFCWithInstall<typeof Step> = withNoopInstall(Step)

export type { StepProps, StepInstance } from './src/item'
export { stepsEmits } from './src/steps'
export type {
  StepsStatus,
  StepsProps,
  StepsEmits,
  StepsInstance,
} from './src/steps'
export * from './src/tokens'
