import { normalizeStyle } from 'vue'
import Table from '../table-grid'

import type { FunctionalComponent, PropType, Ref } from 'vue'
import type { TableV2GridProps } from '../grid'
import type { TableGridInstance } from '../table-grid'

export type MainTableRendererProps = TableV2GridProps & {
  mainTableRef: Ref<TableGridInstance | undefined>
}

export const TableV2MainTableRendererDefaultValueProps = {
  data: {
    type: Array as PropType<MainTableRendererProps['data']>,
    required: true,
  },
  height: {
    type: Number as PropType<MainTableRendererProps['height']>,
    required: true,
  },
  width: {
    type: Number as PropType<MainTableRendererProps['width']>,
    required: true,
  },
  useIsScrolling: {
    type: Boolean as PropType<MainTableRendererProps['useIsScrolling']>,
    required: true,
    default: undefined,
  },
  scrollbarAlwaysOn: {
    type: Boolean as PropType<MainTableRendererProps['scrollbarAlwaysOn']>,
    required: true,
    default: undefined,
  },
  rowHeight: {
    type: Number as PropType<MainTableRendererProps['rowHeight']>,
    required: true,
  },
  scrollbarStartGap: {
    type: Number as PropType<MainTableRendererProps['scrollbarStartGap']>,
    required: true,
  },
  scrollbarEndGap: {
    type: Number as PropType<MainTableRendererProps['scrollbarEndGap']>,
    required: true,
  },
  columns: {
    type: Array as PropType<MainTableRendererProps['columns']>,
    required: true,
  },
  rowKey: {
    type: [String, Number, Symbol] as PropType<
      MainTableRendererProps['rowKey']
    >,
    required: true,
  },
  headerHeight: {
    type: [Number, Array] as PropType<MainTableRendererProps['headerHeight']>,
    required: true,
  },
  cache: {
    type: Number as PropType<MainTableRendererProps['cache']>,
    required: true,
  },
  getRowHeight: {
    type: Function as PropType<MainTableRendererProps['getRowHeight']>,
    required: true,
  },
  headerWidth: {
    type: Number as PropType<MainTableRendererProps['headerWidth']>,
    required: true,
  },
  bodyWidth: {
    type: Number as PropType<MainTableRendererProps['bodyWidth']>,
    required: true,
  },
  class: { type: String as PropType<MainTableRendererProps['class']> },
  estimatedRowHeight: {
    type: Number as PropType<MainTableRendererProps['estimatedRowHeight']>,
  },
  style: {
    type: [String, Array, Object, Boolean] as PropType<
      MainTableRendererProps['style']
    >,
  },
  onRowsRendered: {
    type: Function as PropType<MainTableRendererProps['onRowsRendered']>,
  },
  onScroll: { type: Function as PropType<MainTableRendererProps['onScroll']> },
  fixedData: { type: Array as PropType<MainTableRendererProps['fixedData']> },
  containerStyle: {
    type: Object as PropType<MainTableRendererProps['containerStyle']>,
  },
  mainTableRef: {
    type: Object as PropType<MainTableRendererProps['mainTableRef']>,
    required: true,
  },
} as const

const MainTable: FunctionalComponent<MainTableRendererProps> = (
  props: MainTableRendererProps,
  { slots }
) => {
  const { mainTableRef, ...rest } = props
  return (
    <Table
      ref={mainTableRef}
      {...rest}
      style={normalizeStyle(rest.style) as TableV2GridProps['style']}
    >
      {slots}
    </Table>
  )
}

MainTable.props = TableV2MainTableRendererDefaultValueProps

export default MainTable
