import { withInstall } from '@element-plus/utils'
import Upload from './src/upload.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElUpload: SFCWithInstall<typeof Upload> = withInstall(Upload)
export default ElUpload

export {
  genFileId,
  UploadBaseDefaultValueProps,
  UploadDefaultValueProps,
} from './src/upload'
export type {
  UploadStatus,
  UploadProgressEvent,
  UploadRequestOptions,
  UploadFile,
  UploadUserFile,
  UploadFiles,
  UploadRawFile,
  UploadRequestHandler,
  UploadHooks,
  UploadData,
  ListType,
  Crossorigin,
  UploadBaseProps,
  UploadProps,
  UploadInstance,
} from './src/upload'

export type {
  UploadContentProps,
  UploadContentInstance,
} from './src/upload-content'
export { uploadListEmits, UploadListDefaultValueProps } from './src/upload-list'
export type {
  UploadListProps,
  UploadListEmits,
  UploadListInstance,
} from './src/upload-list'
export {
  uploadDraggerEmits,
  UploadDraggerDefaultValueProps,
} from './src/upload-dragger'
export type {
  UploadDraggerProps,
  UploadDraggerEmits,
  UploadDraggerInstance,
} from './src/upload-dragger'
export * from './src/constants'

export { UploadContentDefaultValueProps } from './src/upload-content'
