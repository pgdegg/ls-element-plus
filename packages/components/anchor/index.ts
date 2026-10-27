import { withInstall, withNoopInstall } from '@element-plus/utils'
import Anchor from './src/anchor.vue'
import AnchorLink from './src/anchor-link.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElAnchor: SFCWithInstall<typeof Anchor> & {
  AnchorLink: typeof AnchorLink
} = withInstall(Anchor, {
  AnchorLink,
})
export const ElAnchorLink: SFCWithInstall<typeof AnchorLink> =
  withNoopInstall(AnchorLink)
export default ElAnchor

export { anchorEmits } from './src/anchor'
export type { AnchorProps, AnchorInstance, AnchorEmits } from './src/anchor'
