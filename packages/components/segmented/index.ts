import { withInstall } from '@element-plus/utils'
import Segmented from './src/segmented.vue'

export const ElSegmented = withInstall(Segmented)
export default ElSegmented

export { defaultProps, segmentedEmits } from './src/segmented'
export type {
  Props,
  SegmentedProps,
  SegmentedEmits,
  SegmentedInstance,
} from './src/segmented'
