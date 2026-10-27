import { withInstall, withNoopInstall } from '@element-plus/utils'
import Tour from './src/tour.vue'
import TourStep from './src/step.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElTour: SFCWithInstall<typeof Tour> & {
  TourStep: typeof TourStep
} = withInstall(Tour, {
  TourStep,
})
export const ElTourStep: SFCWithInstall<typeof TourStep> =
  withNoopInstall(TourStep)
export default ElTour

export { tourEmits } from './src/tour'
export type { TourProps, TourInstance, TourEmits } from './src/tour'
export { tourStepEmits } from './src/step'
export type { TourStepProps, TourStepEmits } from './src/step'
export { tourStrategies, tourPlacements, tourContentEmits } from './src/content'
export type { TourContentProps, TourContentEmits } from './src/content'
export type { TourMask, TourGap, TourBtnProps } from './src/types'
