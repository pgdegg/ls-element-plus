import { renderSlot } from 'vue'
import { get } from 'lodash-unified'
import { isFunction, isObject } from '@element-plus/utils'
import { ExpandIcon, TableCell } from '../components'
import { Alignment } from '../constants'
import { placeholderSign } from '../private'
import { componentToSlot, enforceUnit, tryCall } from '../utils'

import type {
  FunctionalComponent,
  PropType,
  UnwrapNestedRefs,
  VNode,
} from 'vue'
import type { TableV2RowCellRenderParam } from '../components'
import type { Translator, UseNamespaceReturn } from '@element-plus/hooks'
import type { UseTableReturn } from '../use-table'
import type { TableV2Props } from '../table'

type CellRendererProps = TableV2RowCellRenderParam &
  Pick<
    TableV2Props,
    'cellProps' | 'expandColumnKey' | 'indentSize' | 'iconSize' | 'rowKey'
  > &
  UnwrapNestedRefs<Pick<UseTableReturn, 'expandedRowKeys'>> & {
    ns: UseNamespaceReturn
    t: Translator
  }

export const TableV2CellRendererDefaultValueProps = {
  column: {
    type: Object as PropType<CellRendererProps['column']>,
    required: true,
  },
  columns: {
    type: Array as PropType<CellRendererProps['columns']>,
    required: true,
  },
  columnIndex: {
    type: Number as PropType<CellRendererProps['columnIndex']>,
    required: true,
  },
  depth: {
    type: Number as PropType<CellRendererProps['depth']>,
    required: true,
  },
  style: {
    type: [String, Array, Object, Boolean] as PropType<
      CellRendererProps['style']
    >,
    required: true,
  },
  rowData: {
    type: null as unknown as PropType<CellRendererProps['rowData']>,
    required: true,
  },
  rowIndex: {
    type: Number as PropType<CellRendererProps['rowIndex']>,
    required: true,
  },
  isScrolling: {
    type: Boolean as PropType<CellRendererProps['isScrolling']>,
    required: true,
    default: undefined,
  },
  expandIconProps: {
    type: Object as PropType<CellRendererProps['expandIconProps']>,
  },
  expandColumnKey: {
    type: String as PropType<CellRendererProps['expandColumnKey']>,
  },
  rowKey: {
    type: [String, Number, Symbol] as PropType<CellRendererProps['rowKey']>,
    required: true,
  },
  cellProps: {
    type: [Object, Function] as PropType<CellRendererProps['cellProps']>,
  },
  indentSize: {
    type: Number as PropType<CellRendererProps['indentSize']>,
    required: true,
  },
  iconSize: {
    type: Number as PropType<CellRendererProps['iconSize']>,
    required: true,
  },
  expandedRowKeys: {
    type: Array as PropType<CellRendererProps['expandedRowKeys']>,
    required: true,
  },
  ns: { type: Object as PropType<CellRendererProps['ns']>, required: true },
  t: { type: Function as PropType<CellRendererProps['t']>, required: true },
} as const

const CellRenderer: FunctionalComponent<CellRendererProps> = (
  {
    // renderer props
    columns,
    column,
    columnIndex,
    depth,
    expandIconProps,
    isScrolling,
    rowData,
    rowIndex,
    // from use-table
    style,
    expandedRowKeys,
    ns,
    t,
    // derived props
    cellProps: _cellProps,
    expandColumnKey,
    indentSize,
    iconSize,
    rowKey,
  },
  { slots }
) => {
  const cellStyle = enforceUnit(style)

  if (column.placeholderSign === placeholderSign) {
    return <div class={ns.em('row-cell', 'placeholder')} style={cellStyle} />
  }
  const { cellRenderer, dataKey, dataGetter } = column

  const cellData = isFunction(dataGetter)
    ? dataGetter({ columns, column, columnIndex, rowData, rowIndex })
    : get(rowData, dataKey ?? '')

  const extraCellProps = tryCall(_cellProps, {
    cellData,
    columns,
    column,
    columnIndex,
    rowIndex,
    rowData,
  })

  const cellProps = {
    class: ns.e('cell-text'),
    columns,
    column,
    columnIndex,
    cellData,
    isScrolling,
    rowData,
    rowIndex,
  }
  const columnCellRenderer = componentToSlot<typeof cellProps>(cellRenderer)
  const Cell = columnCellRenderer
    ? columnCellRenderer(cellProps)
    : renderSlot(slots, 'default', cellProps, () => [
        <TableCell {...cellProps}></TableCell>,
      ])

  const kls = [
    ns.e('row-cell'),
    column.class,
    column.align === Alignment.CENTER && ns.is('align-center'),
    column.align === Alignment.RIGHT && ns.is('align-right'),
  ]

  const expandable =
    rowIndex >= 0 && expandColumnKey && column.key === expandColumnKey
  const expanded = rowIndex >= 0 && expandedRowKeys.includes(rowData[rowKey])

  let IconOrPlaceholder: VNode | undefined
  const iconStyle = `margin-inline-start: ${depth * indentSize}px;`
  if (expandable) {
    if (isObject(expandIconProps)) {
      IconOrPlaceholder = (
        <ExpandIcon
          {...expandIconProps}
          class={[ns.e('expand-icon'), ns.is('expanded', expanded)]}
          size={iconSize}
          expanded={expanded}
          ariaLabel={t(
            expanded ? 'el.table.collapseRowLabel' : 'el.table.expandRowLabel'
          )}
          style={iconStyle}
          expandable
        />
      )
    } else {
      IconOrPlaceholder = (
        <div
          style={[
            iconStyle,
            `width: ${iconSize}px; height: ${iconSize}px;`,
          ].join(' ')}
        />
      )
    }
  }

  return (
    <div class={kls} style={cellStyle} {...extraCellProps} role="cell">
      {IconOrPlaceholder}
      {Cell}
    </div>
  )
}

CellRenderer.inheritAttrs = false

CellRenderer.props = TableV2CellRendererDefaultValueProps

export default CellRenderer
