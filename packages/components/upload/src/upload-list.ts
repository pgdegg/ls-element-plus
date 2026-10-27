import { NOOP, buildProps, definePropType, mutable } from '@element-plus/utils'
import { uploadListTypeValues } from './upload'

import type {
  Crossorigin,
  ListType,
  UploadFile,
  UploadFiles,
  UploadHooks,
} from './upload'
import type UploadList from './upload-list.vue'

export interface UploadListProps {
  files?: UploadFiles
  disabled?: boolean
  handlePreview?: UploadHooks['onPreview']
  listType?: ListType
  /**
   * @description 设置 HTML 属性：crossorigin。
   */
  crossorigin?: Crossorigin
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const uploadListPropDefs = buildProps({
  files: {
    type: definePropType<UploadFiles>(Array),
    default: () => mutable([]),
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
  handlePreview: {
    type: definePropType<UploadHooks['onPreview']>(Function),
    default: NOOP,
  },
  listType: {
    type: String,
    values: uploadListTypeValues,
    default: 'text',
  },
  /**
   * @description 设置 HTML 属性：crossorigin。
   */
  crossorigin: {
    type: definePropType<'anonymous' | 'use-credentials' | ''>(String),
  },
} as const)
export const uploadListEmits = {
  remove: (file: UploadFile) => !!file,
}
export type UploadListEmits = typeof uploadListEmits
export type UploadListInstance = InstanceType<typeof UploadList> & unknown
