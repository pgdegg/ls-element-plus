import { buildProps, definePropType } from '@element-plus/utils'
import { createCollectionWithScope } from '@element-plus/components/collection'

import type {
  ExtractPropTypes,
  ExtractPublicPropTypes,
  HTMLAttributes,
  StyleValue,
} from 'vue'

export const rovingFocusGroupProps = buildProps({
  style: {
    type: definePropType<StyleValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  currentTabId: {
    type: definePropType<string | null>(String),
  },
  defaultCurrentTabId: String,
  loop: Boolean,
  dir: {
    type: String, // 保留以便支持方向（dir）
    values: ['ltr', 'rtl'],
    default: 'ltr',
  },
  orientation: {
    // 保留以便支持朝向（orientation）
    type: definePropType<HTMLAttributes['aria-orientation']>(String),
  },

  onBlur: Function,
  onFocus: Function,
  onMousedown: Function,
})

export type ElRovingFocusGroupProps = ExtractPropTypes<
  typeof rovingFocusGroupProps
>

export type ElRovingFocusGroupPropsPublic = ExtractPublicPropTypes<
  typeof rovingFocusGroupProps
>

const {
  ElCollection,
  ElCollectionItem,
  COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY,
} = createCollectionWithScope('RovingFocusGroup')

export {
  ElCollection,
  ElCollectionItem,
  COLLECTION_INJECTION_KEY as ROVING_FOCUS_COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY as ROVING_FOCUS_ITEM_COLLECTION_INJECTION_KEY,
}
