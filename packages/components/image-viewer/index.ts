import { withInstall } from '@element-plus/utils'
import ImageViewer from './src/image-viewer.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElImageViewer: SFCWithInstall<typeof ImageViewer> =
  withInstall(ImageViewer)
export default ElImageViewer

export { imageViewerEmits } from './src/image-viewer'
export type {
  ImageViewerAction,
  ImageViewerCrossorigin,
  ImageViewerProps,
  ImageViewerEmits,
  ImageViewerMode,
  ImageViewerInstance,
} from './src/image-viewer'
