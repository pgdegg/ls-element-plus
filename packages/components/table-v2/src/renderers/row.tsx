import { Row } from '../components'
import { tryCall } from '../utils'

import type {
  ComponentInternalInstance,
  FunctionalComponent,
  PropType,
  UnwrapNestedRefs,
} from 'vue'
import type { UseNamespaceReturn } from '@element-plus/hooks'
import type { UseTableReturn } from '../use-table'
import type { TableV2Props } from '../table'
import type { TableGridRowSlotParams } from '../table-grid'

type RowRendererProps = Omit<TableGridRowSlotParams, 'key'> &
  Pick<
    TableV2Props,
    | 'expandColumnKey'
    | 'estimatedRowHeight'
    | 'rowProps'
    | 'rowClass'
    | 'rowKey'
    | 'rowEventHandlers'
  > &
  UnwrapNestedRefs<
    Pick<
      UseTableReturn,
      | 'depthMap'
      | 'expandedRowKeys'
      | 'hasFixedColumns'
      | 'onRowHovered'
      | 'onRowExpanded'
      | 'columnsStyles'
    >
  > & {
    ns: UseNamespaceReturn
    tableInstance?: ComponentInternalInstance
  }

export const TableV2RowRendererDefaultValueProps = {
  columns: {
    type: Array as PropType<RowRendererProps['columns']>,
    required: true,
  },
  rowData: {
    type: null as unknown as PropType<RowRendererProps['rowData']>,
    required: true,
  },
  columnIndex: {
    type: Number as PropType<RowRendererProps['columnIndex']>,
    required: true,
  },
  rowIndex: {
    type: Number as PropType<RowRendererProps['rowIndex']>,
    required: true,
  },
  data: {
    type: null as unknown as PropType<RowRendererProps['data']>,
    required: true,
  },
  isScrolling: {
    type: Boolean as PropType<RowRendererProps['isScrolling']>,
    default: undefined,
  },
  style: {
    type: [String, Array, Object, Boolean] as PropType<
      RowRendererProps['style']
    >,
    required: true,
  },
  estimatedRowHeight: {
    type: Number as PropType<RowRendererProps['estimatedRowHeight']>,
  },
  rowEventHandlers: {
    type: Object as PropType<RowRendererProps['rowEventHandlers']>,
  },
  expandColumnKey: {
    type: String as PropType<RowRendererProps['expandColumnKey']>,
  },
  rowKey: {
    type: [String, Number, Symbol] as PropType<RowRendererProps['rowKey']>,
    required: true,
  },
  rowClass: {
    type: [String, Function] as PropType<RowRendererProps['rowClass']>,
  },
  rowProps: { type: null as unknown as PropType<RowRendererProps['rowProps']> },
  columnsStyles: {
    type: Object as PropType<RowRendererProps['columnsStyles']>,
    required: true,
  },
  expandedRowKeys: {
    type: Array as PropType<RowRendererProps['expandedRowKeys']>,
    required: true,
  },
  hasFixedColumns: {
    type: Number as PropType<RowRendererProps['hasFixedColumns']>,
    required: true,
  },
  depthMap: {
    type: Object as PropType<RowRendererProps['depthMap']>,
    required: true,
  },
  onRowHovered: {
    type: Function as PropType<RowRendererProps['onRowHovered']>,
    required: true,
  },
  onRowExpanded: {
    type: Function as PropType<RowRendererProps['onRowExpanded']>,
    required: true,
  },
  ns: { type: Object as PropType<RowRendererProps['ns']>, required: true },
  tableInstance: {
    type: Object as PropType<RowRendererProps['tableInstance']>,
  },
} as const

const RowRenderer: FunctionalComponent<RowRendererProps> = (
  props,
  { slots }
) => {
  const {
    columns,
    columnsStyles,
    depthMap,
    expandColumnKey,
    expandedRowKeys,
    estimatedRowHeight,
    hasFixedColumns,
    rowData,
    rowIndex,
    style,
    isScrolling,
    rowProps,
    rowClass,
    rowKey,
    rowEventHandlers,
    ns,
    onRowHovered,
    onRowExpanded,
  } = props

  const rowKls = tryCall(rowClass, { columns, rowData, rowIndex }, '')
  const additionalProps = tryCall(rowProps, {
    columns,
    rowData,
    rowIndex,
  })
  const _rowKey = rowData[rowKey]
  const depth = depthMap[_rowKey] || 0
  const canExpand = Boolean(expandColumnKey)
  const isFixedRow = rowIndex < 0
  const kls = [
    ns.e('row'),
    rowKls,
    ns.is('expanded', canExpand && expandedRowKeys.includes(_rowKey)),
    ns.is('fixed', !depth && isFixedRow),
    ns.is('customized', Boolean(slots.row)),
    {
      [ns.e(`row-depth-${depth}`)]: canExpand && rowIndex >= 0,
    },
  ]

  const onRowHover = hasFixedColumns ? onRowHovered : undefined

  const _rowProps = {
    ...additionalProps,
    columns,
    columnsStyles,
    class: kls,
    depth,
    expandColumnKey,
    estimatedRowHeight: isFixedRow ? undefined : estimatedRowHeight,
    isScrolling,
    rowIndex,
    rowData,
    rowKey: _rowKey,
    rowEventHandlers,
    style,
  }

  const handlerMouseEnter = (e: MouseEvent) => {
    onRowHover?.({
      hovered: true,
      rowKey: _rowKey,
      event: e,
      rowData,
      rowIndex,
    })
  }

  const handlerMouseLeave = (e: MouseEvent) => {
    onRowHover?.({
      hovered: false,
      rowKey: _rowKey,
      event: e,
      rowData,
      rowIndex,
    })
  }

  return (
    <Row
      {..._rowProps}
      onRowExpand={onRowExpanded}
      onMouseenter={handlerMouseEnter}
      onMouseleave={handlerMouseLeave}
      rowkey={_rowKey}
    >
      {slots}
    </Row>
  )
}

RowRenderer.props = TableV2RowRendererDefaultValueProps

export default RowRenderer
