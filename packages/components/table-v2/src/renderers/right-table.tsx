import { normalizeStyle } from 'vue'
import Table from '../table-grid'

import type { FunctionalComponent, PropType, Ref } from 'vue'
import type { TableV2GridProps } from '../grid'
import type { TableGridInstance } from '../table-grid'

type RightTableProps = TableV2GridProps & {
  rightTableRef: Ref<TableGridInstance | undefined>
}

export const TableV2RightTableRendererDefaultValueProps = {
  data: { type: Array as PropType<RightTableProps['data']>, required: true },
  height: {
    type: Number as PropType<RightTableProps['height']>,
    required: true,
  },
  width: { type: Number as PropType<RightTableProps['width']>, required: true },
  useIsScrolling: {
    type: Boolean as PropType<RightTableProps['useIsScrolling']>,
    required: true,
    default: undefined,
  },
  scrollbarAlwaysOn: {
    type: Boolean as PropType<RightTableProps['scrollbarAlwaysOn']>,
    required: true,
    default: undefined,
  },
  rowHeight: {
    type: Number as PropType<RightTableProps['rowHeight']>,
    required: true,
  },
  scrollbarStartGap: {
    type: Number as PropType<RightTableProps['scrollbarStartGap']>,
    required: true,
  },
  scrollbarEndGap: {
    type: Number as PropType<RightTableProps['scrollbarEndGap']>,
    required: true,
  },
  columns: {
    type: Array as PropType<RightTableProps['columns']>,
    required: true,
  },
  rowKey: {
    type: [String, Number, Symbol] as PropType<RightTableProps['rowKey']>,
    required: true,
  },
  headerHeight: {
    type: [Number, Array] as PropType<RightTableProps['headerHeight']>,
    required: true,
  },
  cache: { type: Number as PropType<RightTableProps['cache']>, required: true },
  getRowHeight: {
    type: Function as PropType<RightTableProps['getRowHeight']>,
    required: true,
  },
  headerWidth: {
    type: Number as PropType<RightTableProps['headerWidth']>,
    required: true,
  },
  bodyWidth: {
    type: Number as PropType<RightTableProps['bodyWidth']>,
    required: true,
  },
  class: { type: String as PropType<RightTableProps['class']> },
  estimatedRowHeight: {
    type: Number as PropType<RightTableProps['estimatedRowHeight']>,
  },
  style: {
    type: [String, Array, Object, Boolean] as PropType<
      RightTableProps['style']
    >,
  },
  onRowsRendered: {
    type: Function as PropType<RightTableProps['onRowsRendered']>,
  },
  onScroll: { type: Function as PropType<RightTableProps['onScroll']> },
  fixedData: { type: Array as PropType<RightTableProps['fixedData']> },
  containerStyle: {
    type: Object as PropType<RightTableProps['containerStyle']>,
  },
  rightTableRef: {
    type: Object as PropType<RightTableProps['rightTableRef']>,
    required: true,
  },
} as const

const RightTable: FunctionalComponent<RightTableProps> = (props, { slots }) => {
  if (!props.columns.length) return

  const { rightTableRef, ...rest } = props

  return (
    <Table
      ref={rightTableRef}
      {...rest}
      style={normalizeStyle(rest.style) as TableV2GridProps['style']}
    >
      {slots}
    </Table>
  )
}

RightTable.props = TableV2RightTableRendererDefaultValueProps

export default RightTable
