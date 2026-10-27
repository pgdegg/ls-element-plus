import { buildProps, isArray } from '@element-plus/utils'

import type UploadDragger from './upload-dragger.vue'

export interface UploadDraggerProps {
  disabled?: boolean
  directory?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const uploadDraggerPropDefs = buildProps({
  disabled: {
    type: Boolean,
    default: undefined,
  },
  directory: Boolean,
} as const)

export const uploadDraggerEmits = {
  file: (file: File[]) => isArray(file),
}
export type UploadDraggerEmits = typeof uploadDraggerEmits

export type UploadDraggerInstance = InstanceType<typeof UploadDragger> & unknown
