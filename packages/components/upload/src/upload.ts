import { NOOP, buildProps, definePropType, mutable } from '@element-plus/utils'
import { ajaxUpload } from './ajax'

import type { Awaitable, Mutable } from '@element-plus/utils'
import type { UploadAjaxError } from './ajax'
import type Upload from './upload.vue'

/** @internal Runtime prop definitions; use the public props interface for types. */
export const uploadListTypeValues = ['text', 'picture', 'picture-card'] as const

let fileId = 1
export const genFileId = () => Date.now() + fileId++

export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
export interface UploadProgressEvent extends ProgressEvent {
  percent: number
}

export interface UploadRequestOptions {
  action: string
  method: string
  data: Record<string, string | Blob | [string | Blob, string] | string[]>
  filename: string
  file: UploadRawFile
  headers: Headers | Record<string, string | number | null | undefined>
  onError: (evt: UploadAjaxError) => void
  onProgress: (evt: UploadProgressEvent) => void
  onSuccess: (response: any) => void
  withCredentials: boolean
}
export interface UploadFile {
  name: string
  percentage?: number
  status: UploadStatus
  size?: number
  response?: unknown
  uid: number
  url?: string
  raw?: UploadRawFile
}
export type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> &
  Partial<Pick<UploadFile, 'status' | 'uid'>>

export type UploadFiles = UploadFile[]
export interface UploadRawFile extends File {
  uid: number
  isDirectory?: boolean
}
export type UploadRequestHandler = (
  options: UploadRequestOptions
) => XMLHttpRequest | Promise<unknown>
export interface UploadHooks {
  beforeUpload: (
    rawFile: UploadRawFile
  ) => Awaitable<void | undefined | null | boolean | File | Blob>
  beforeRemove: (
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => Awaitable<boolean>
  onRemove: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onChange: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onPreview: (uploadFile: UploadFile) => void
  onSuccess: (
    response: any,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onProgress: (
    evt: UploadProgressEvent,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onError: (
    error: Error,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onExceed: (files: File[], uploadFiles: UploadUserFile[]) => void
}

export type UploadData = Mutable<Record<string, any>>

export type ListType = 'text' | 'picture' | 'picture-card'
export type Crossorigin = 'anonymous' | 'use-credentials' | ''

export interface UploadBaseProps {
  /**
   * @description 请求 URL
   */
  action?: string
  /**
   * @description 请求头
   */
  headers?: Headers | Record<string, any>
  /**
   * @description 设置上传请求方法
   */
  method?: string
  /**
   * @description 请求的附加选项
   */
  data?:
    Awaitable<UploadData> | ((rawFile: UploadRawFile) => Awaitable<UploadData>)
  /**
   * @description 是否允许多文件上传
   */
  multiple?: boolean
  /**
   * @description 上传文件的字段名
   */
  name?: string
  /**
   * @description 是否启用拖拽模式
   */
  drag?: boolean
  /**
   * @description 是否发送 cookies
   */
  withCredentials?: boolean
  /**
   * @description 是否显示已上传文件列表
   */
  showFileList?: boolean
  /**
   * @description 接受的 [文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)，在 `thumbnail-mode === true` 时无效
   */
  accept?: string
  /** 允许的最大文件大小，单位为字节。*/
  maxSize?: number
  /** 同时校验程序化选择和拖拽文件的 accept。*/
  validateAccept?: boolean
  onValidationError?: (reason: 'size' | 'type', file: UploadRawFile) => void
  /**
   * @description 默认已上传文件
   */
  fileList?: UploadUserFile[]
  /**
   * @description 是否自动上传文件
   */
  autoUpload?: boolean
  /**
   * @description 文件列表类型
   */
  listType?: ListType
  /**
   * @description 覆盖默认 xhr 行为，允许自行实现上传文件的请求
   */
  httpRequest?: UploadRequestHandler
  /**
   * @description 是否禁用上传
   */
  disabled?: boolean
  /**
   * @description 允许的最大上传数量
   */
  limit?: number
  /**
   * @description 是否支持上传目录
   */
  directory?: boolean
}

export interface UploadProps extends UploadBaseProps {
  /**
   * @description 上传前的钩子函数，参数为待上传文件。若返回 `false`，或返回 `Promise` 且被 reject，则中止上传
   */
  beforeUpload?: UploadHooks['beforeUpload']
  /**
   * @description 移除文件前的钩子函数，参数为该文件和文件列表。若返回 `false`，或返回 `Promise` 且被 reject，则中止移除
   */
  beforeRemove?: UploadHooks['beforeRemove']
  /**
   * @description 文件被移除时的钩子函数
   */
  onRemove?: UploadHooks['onRemove']
  /**
   * @description 选择文件、上传成功或上传失败时的钩子函数
   */
  onChange?: UploadHooks['onChange']
  /**
   * @description 点击已上传文件时的钩子函数
   */
  onPreview?: UploadHooks['onPreview']
  /**
   * @description 上传成功时的钩子函数
   */
  onSuccess?: UploadHooks['onSuccess']
  /**
   * @description 产生上传进度时的钩子函数
   */
  onProgress?: UploadHooks['onProgress']
  /**
   * @description 发生错误时的钩子函数
   */
  onError?: UploadHooks['onError']
  /**
   * @description 超出数量限制时的钩子函数
   */
  onExceed?: UploadHooks['onExceed']
  /**
   * @description 设置 HTML 属性：crossorigin。
   */
  crossorigin?: Crossorigin
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const uploadBasePropDefs = buildProps({
  /**
   * @description 请求 URL
   */
  action: {
    type: String,
    default: '#',
  },
  /**
   * @description 请求头
   */
  headers: {
    type: definePropType<Headers | Record<string, any>>(Object),
  },
  /**
   * @description 设置上传请求方法
   */
  method: {
    type: String,
    default: 'post',
  },
  /**
   * @description 请求的附加选项
   */
  data: {
    type: definePropType<
      | Awaitable<UploadData>
      | ((rawFile: UploadRawFile) => Awaitable<UploadData>)
    >([Object, Function, Promise]),
    default: () => mutable({} as const),
  },
  /**
   * @description 是否允许多文件上传
   */
  multiple: Boolean,
  /**
   * @description 上传文件的字段名
   */
  name: {
    type: String,
    default: 'file',
  },
  /**
   * @description 是否启用拖拽模式
   */
  drag: Boolean,
  /**
   * @description 是否发送 cookies
   */
  withCredentials: Boolean,
  /**
   * @description 是否显示已上传文件列表
   */
  showFileList: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 接受的 [文件类型](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)，在 `thumbnail-mode === true` 时无效
   */
  maxSize: Number,
  validateAccept: Boolean,
  onValidationError: {
    type: definePropType<
      (reason: 'size' | 'type', file: UploadRawFile) => void
    >(Function),
  },
  accept: {
    type: String,
    default: '',
  },
  /**
   * @description 默认已上传文件
   */
  fileList: {
    type: definePropType<UploadUserFile[]>(Array),
    default: () => mutable([] as const),
  },
  /**
   * @description 是否自动上传文件
   */
  autoUpload: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 文件列表类型
   */
  listType: {
    type: String,
    values: uploadListTypeValues,
    default: 'text',
  },
  /**
   * @description 覆盖默认 xhr 行为，允许自行实现上传文件的请求
   */
  httpRequest: {
    type: definePropType<UploadRequestHandler>(Function),
    default: ajaxUpload,
  },
  /**
   * @description 是否禁用上传
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 允许的最大上传数量
   */
  limit: Number,
  /**
   * @description 是否支持上传目录
   */
  directory: Boolean,
} as const)

/** @internal Runtime prop definitions; use the public props interface for types. */
export const uploadPropDefs = buildProps({
  ...uploadBasePropDefs,
  /**
   * @description 上传前的钩子函数，参数为待上传文件。若返回 `false`，或返回 `Promise` 且被 reject，则中止上传
   */
  beforeUpload: {
    type: definePropType<UploadHooks['beforeUpload']>(Function),
    default: NOOP,
  },
  /**
   * @description 移除文件前的钩子函数，参数为该文件和文件列表。若返回 `false`，或返回 `Promise` 且被 reject，则中止移除
   */
  beforeRemove: {
    type: definePropType<UploadHooks['beforeRemove']>(Function),
  },
  /**
   * @description 文件被移除时的钩子函数
   */
  onRemove: {
    type: definePropType<UploadHooks['onRemove']>(Function),
    default: NOOP,
  },
  /**
   * @description 选择文件、上传成功或上传失败时的钩子函数
   */
  onChange: {
    type: definePropType<UploadHooks['onChange']>(Function),
    default: NOOP,
  },
  /**
   * @description 点击已上传文件时的钩子函数
   */
  onPreview: {
    type: definePropType<UploadHooks['onPreview']>(Function),
    default: NOOP,
  },
  /**
   * @description 上传成功时的钩子函数
   */
  onSuccess: {
    type: definePropType<UploadHooks['onSuccess']>(Function),
    default: NOOP,
  },
  /**
   * @description 产生上传进度时的钩子函数
   */
  onProgress: {
    type: definePropType<UploadHooks['onProgress']>(Function),
    default: NOOP,
  },
  /**
   * @description 发生错误时的钩子函数
   */
  onError: {
    type: definePropType<UploadHooks['onError']>(Function),
    default: NOOP,
  },
  /**
   * @description 超出数量限制时的钩子函数
   */
  onExceed: {
    type: definePropType<UploadHooks['onExceed']>(Function),
    default: NOOP,
  },
  /**
   * @description 设置 HTML 属性：crossorigin。
   */
  crossorigin: {
    type: definePropType<'anonymous' | 'use-credentials' | ''>(String),
  },
} as const)

export type UploadInstance = InstanceType<typeof Upload> & unknown

export const uploadBasePropsDefaults = {
  action: '#',
  method: 'post',
  data: () => mutable({}),
  name: 'file',
  showFileList: true,
  accept: '',
  fileList: () => mutable([]),
  autoUpload: true,
  listType: 'text',
  httpRequest: ajaxUpload,
  disabled: undefined,
} as const

export const uploadPropsDefaults = {
  ...uploadBasePropsDefaults,
  beforeUpload: NOOP,
  onRemove: NOOP,
  onChange: NOOP,
  onPreview: NOOP,
  onSuccess: NOOP,
  onProgress: NOOP,
  onError: NOOP,
  onExceed: NOOP,
} as const
