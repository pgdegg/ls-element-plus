import { withInstall } from '@element-plus/utils'
import Transfer from './src/transfer.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElTransfer: SFCWithInstall<typeof Transfer> = withInstall(Transfer)
export default ElTransfer

export {
  LEFT_CHECK_CHANGE_EVENT,
  RIGHT_CHECK_CHANGE_EVENT,
  transferCheckedChangeFn,
  transferEmits,
} from './src/transfer'
export type {
  TransferKey,
  TransferDirection,
  TransferDataItem,
  renderContent,
  TransferFormat,
  TransferPropsAlias,
  TransferCheckedState,
  TransferProps,
  TransferEmits,
  TransferInstance,
} from './src/transfer'
