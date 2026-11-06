import { renderSlot } from 'vue'
import { TableV2HeaderCellDefaultValueProps } from '../header-cell'

import type { FunctionalComponent } from 'vue'
import type { TableV2HeaderCell } from '../header-cell'

const HeaderCell: FunctionalComponent<TableV2HeaderCell> = (props, { slots }) =>
  renderSlot(slots, 'default', props, () => [
    <div class={props.class} title={props.column?.title}>
      {props.column?.title}
    </div>,
  ])

HeaderCell.displayName = 'ElTableV2HeaderCell'
HeaderCell.inheritAttrs = false

HeaderCell.props = TableV2HeaderCellDefaultValueProps

export default HeaderCell
