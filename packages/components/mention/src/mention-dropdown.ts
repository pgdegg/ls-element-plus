import { buildProps, definePropType, isString } from '@element-plus/utils'

import type { MentionOption } from './types'

export interface MentionDropdownProps {
  options?: MentionOption[]
  loading?: boolean
  disabled?: boolean
  contentId?: string
  ariaLabel?: string
}

/**
 * @deprecated 3.0.0 后移除，请改用 `MentionDropdownProps`。
 */
export const mentionDropdownProps = buildProps({
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
