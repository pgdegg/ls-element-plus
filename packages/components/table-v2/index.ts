import { withInstall } from '@element-plus/utils'
import TableV2 from './src/table-v2'
import AutoResizer from './src/components/auto-resizer'

import type { SFCWithInstall } from '@element-plus/utils'

export {
  Alignment as TableV2Alignment,
  FixedDir as TableV2FixedDir,
  SortOrder as TableV2SortOrder,
} from './src/constants'
export { default as TableV2 } from './src/table-v2'
export * from './src/auto-resizer'
export { placeholderSign as TableV2Placeholder } from './src/private'

export const ElTableV2: SFCWithInstall<typeof TableV2> = withInstall(TableV2)
export const ElAutoResizer: SFCWithInstall<typeof AutoResizer> =
  withInstall(AutoResizer)

export type {
  Column,
  Columns,
  SortBy,
  SortState,
  TableV2CustomizedHeaderSlotParam,
} from './src/types'
export type { TableV2Instance } from './src/table-v2'
export * from './src/table'
export * from './src/row'

export type { HeaderCellSlotProps } from './src/renderers/header-cell'

export { TableV2CellDefaultValueProps } from './src/cell'

export { TableV2GridDefaultValueProps } from './src/grid'

export { TableV2HeaderRowDefaultValueProps } from './src/header-row'

export { TableV2HeaderDefaultValueProps } from './src/header'

export { TableV2SortIconDefaultValueProps } from './src/components/sort-icon'

export { TableV2ExpandIconDefaultValueProps } from './src/components/expand-icon'

export { TableV2MainTableRendererDefaultValueProps } from './src/renderers/main-table'

export { TableV2LeftTableRendererDefaultValueProps } from './src/renderers/left-table'

export { TableV2RightTableRendererDefaultValueProps } from './src/renderers/right-table'

export { TableV2RowRendererDefaultValueProps } from './src/renderers/row'

export { TableV2CellRendererDefaultValueProps } from './src/renderers/cell'

export { TableV2HeaderRendererDefaultValueProps } from './src/renderers/header'

export { TableV2HeaderCellRendererDefaultValueProps } from './src/renderers/header-cell'

export { TableV2FooterRendererDefaultValueProps } from './src/renderers/footer'

export { TableV2EmptyRendererDefaultValueProps } from './src/renderers/empty'

export { TableV2HeaderCellDefaultValueProps } from './src/header-cell'

export { TableV2OverlayDefaultValueProps } from './src/renderers/overlay'
