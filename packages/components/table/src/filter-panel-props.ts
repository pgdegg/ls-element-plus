import { TooltipContentDefaultValueProps } from '@element-plus/components/tooltip/src/content'

import type { DefaultRow } from './table/defaults'
import type { Placement } from '@element-plus/components/popper'
import type { PropType } from 'vue'
import type { TableColumnCtx } from './table-column/defaults'
import type { Store } from './store'

export const TableFilterPanelDefaultValueProps = {
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom-start',
  },
  store: {
    type: Object as PropType<Store<DefaultRow>>,
  },
  column: {
    type: Object as PropType<TableColumnCtx<DefaultRow>>,
  },
  upDataColumn: {
    type: Function,
  },
  appendTo: TooltipContentDefaultValueProps.appendTo,
} as const
