import { buildProps, definePropType, isString } from '@element-plus/utils'

import type { MentionOption } from './types'

export interface MentionDropdownProps {
  options?: MentionOption[]
  loading?: boolean
  disabled?: boolean
  contentId?: string
  ariaLabel?: string
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const mentionDropdownPropDefs = buildProps({
  options: {
    type: definePropType<MentionOption[]>(Array),
    default: () => [],
  },
  loading: Boolean,
  disabled: Boolean,
  contentId: String,
  ariaLabel: String,
})

export const mentionDropdownEmits = {
  select: (option: MentionOption) => isString(option.value),
}
