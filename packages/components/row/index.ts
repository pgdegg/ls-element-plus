import { withInstall } from '@element-plus/utils'
import Row from './src/row.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElRow: SFCWithInstall<typeof Row> = withInstall(Row)
export default ElRow

export { RowJustify, RowAlign } from './src/row'
export type { RowProps, RowInstance } from './src/row'
export * from './src/constants'
