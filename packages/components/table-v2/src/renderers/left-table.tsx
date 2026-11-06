import { normalizeStyle } from 'vue'
import Table from '../table-grid'

import type { FunctionalComponent, PropType, Ref } from 'vue'
import type { TableV2GridProps } from '../grid'
import type { TableGridInstance } from '../table-grid'

type LeftTableProps = TableV2GridProps & {
  leftTableRef: Ref<TableGridInstance | undefined>
}

export const TableV2LeftTableRendererDefaultValueProps = {
  data: { type: Array as PropType<LeftTableProps['data']>, required: true },
  height: {
    type: Number as PropType<LeftTableProps['height']>,
    required: true,
  },
  width: { type: Number as PropType<LeftTableProps['width']>, required: true },
  useIsScrolling: {
    type: Boolean as PropType<LeftTableProps['useIsScrolling']>,
    required: true,
    default: undefined,
  },
  scrollbarAlwaysOn: {
    type: Boolean as PropType<LeftTableProps['scrollbarAlwaysOn']>,
    required: true,
    default: undefined,
  },
  rowHeight: {
    type: Number as PropType<LeftTableProps['rowHeight']>,
    required: true,
  },
  scrollbarStartGap: {
    type: Number as PropType<LeftTableProps['scrollbarStartGap']>,
    required: true,
  },
  scrollbarEndGap: {
    type: Number as PropType<LeftTableProps['scrollbarEndGap']>,
    required: true,
  },
  columns: {
    type: Array as PropType<LeftTableProps['columns']>,
    required: true,
  },
  rowKey: {
    type: [String, Number, Symbol] as PropType<LeftTableProps['rowKey']>,
    required: true,
  },
  headerHeight: {
    type: [Number, Array] as PropType<LeftTableProps['headerHeight']>,
    required: true,
  },
  cache: { type: Number as PropType<LeftTableProps['cache']>, required: true },
  getRowHeight: {
    type: Function as PropType<LeftTableProps['getRowHeight']>,
    required: true,
  },
  headerWidth: {
    type: Number as PropType<LeftTableProps['headerWidth']>,
    required: true,
  },
  bodyWidth: {
    type: Number as PropType<LeftTableProps['bodyWidth']>,
    required: true,
  },
  class: { type: String as PropType<LeftTableProps['class']> },
  estimatedRowHeight: {
    type: Number as PropType<LeftTableProps['estimatedRowHeight']>,
  },
  style: {
    type: [String, Array, Object, Boolean] as PropType<LeftTableProps['style']>,
  },
  onRowsRendered: {
    type: Function as PropType<LeftTableProps['onRowsRendered']>,
  },
  onScroll: { type: Function as PropType<LeftTableProps['onScroll']> },
  fixedData: { type: Array as PropType<LeftTableProps['fixedData']> },
  containerStyle: {
    type: Object as PropType<LeftTableProps['containerStyle']>,
  },
  leftTableRef: {
    type: Object as PropType<LeftTableProps['leftTableRef']>,
    required: true,
  },
} as const

const LeftTable: FunctionalComponent<LeftTableProps> = (props, { slots }) => {
  if (!props.columns.length) return

  const { leftTableRef, ...rest } = props

  return (
    <Table
      ref={leftTableRef}
      {...rest}
      style={normalizeStyle(rest.style) as TableV2GridProps['style']}
    >
      {slots}
    </Table>
  )
}

LeftTable.props = TableV2LeftTableRendererDefaultValueProps

export default LeftTable
