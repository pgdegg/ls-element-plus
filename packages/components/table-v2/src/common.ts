import { definePropType, mutable } from '@element-plus/utils'

import type { CSSProperties } from 'vue'
import type { Column, KeyType } from './types'

export type AnyColumn = Column<any>

/**
 * @Note 尽管我们可以使用 `string[] | string` 作为类型，但为了方便，
 * 这里仅将 `string` 作为可接受的值。
 */
export const classType = String

export const columns = {
  type: definePropType<AnyColumn[]>(Array),
  required: true,
} as const

export const column = {
  type: definePropType<AnyColumn>(Object),
} as const

export const fixedDataType = {
  type: definePropType<any[]>(Array),
} as const

export const dataType = {
  ...fixedDataType,
  required: true,
} as const

export const expandColumnKey = String

export const expandKeys = {
  type: definePropType<KeyType[]>(Array),
  default: () => mutable([]),
} as const

export const requiredNumber = {
  type: Number,
  required: true,
} as const

export const rowKey = {
  type: definePropType<KeyType>([String, Number, Symbol]),
  default: 'id',
} as const

/**
 * @note 尽管我们可以使用 `StyleValue`，但那样映射起来比较困难，
 * 因此这里仅将 `CSSProperties` 作为可接受的值。
 */
export const styleType = {
  type: definePropType<CSSProperties>(Object),
}
