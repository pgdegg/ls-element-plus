import { withInstall } from '@element-plus/utils'
import Mention from './src/mention.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElMention: SFCWithInstall<typeof Mention> = withInstall(Mention)
export default ElMention

export { mentionEmits, mentionDefaultProps } from './src/mention'
export type {
  MentionProps,
  MentionEmits,
  MentionInstance,
  MentionOptionProps,
} from './src/mention'
export type { MentionOption } from './src/types'
