import { buildProps, definePropType } from '@element-plus/utils'
import {
  VirtualizedGridDefaultValueProps,
  VirtualizedScrollbarDefaultValueProps,
} from '@element-plus/components/virtual-list'
import {
  classType,
  columns,
  dataType,
  expandKeys,
  fixedDataType,
  requiredNumber,
  rowKey,
} from './common'
import { TableV2RowDefaultValueProps } from './row'
import { TableV2HeaderDefaultValueProps } from './header'
import { TableV2GridDefaultValueProps } from './grid'

import type {
  CSSProperties,
  ExtractPropTypes,
  ExtractPublicPropTypes,
} from 'vue'
import type { SortOrder } from './constants'
import type {
  Column,
  ColumnCommonParams,
  DataGetter,
  KeyType,
  RowCommonParams,
  SortBy,
  SortState,
} from './types'

/**
 * 参数类型
 */
export type ColumnSortParams<T> = {
  column: Column<T>
  key: KeyType
  order: SortOrder
}

/**
 * Renderer/Getter 类型
 */

export type ExtraCellPropGetter<T> = (
  params: ColumnCommonParams<T> &
    RowCommonParams & { cellData: T; rowData: any }
) => any

export type ExtractHeaderPropGetter<T> = (params: {
  columns: Column<T>[]
  headerIndex: number
}) => any

export type ExtractHeaderCellPropGetter<T> = (
  params: ColumnCommonParams<T> & { headerIndex: number }
) => any

export type ExtractRowPropGetter<T> = (
  params: { columns: Column<T>[] } & RowCommonParams
) => any

export type HeaderClassNameGetter<T> = (params: {
  columns: Column<T>[]
  headerIndex: number
}) => string

export type RowClassNameGetter<T> = (
  params: { columns: Column<T>[] } & RowCommonParams
) => string

/**
 * 处理函数类型
 */
export type ColumnSortHandler<T> = (params: ColumnSortParams<T>) => void
export type ColumnResizeHandler<T> = (column: Column<T>, width: number) => void
export type ExpandedRowsChangeHandler = (expandedRowKeys: KeyType[]) => void

export const TableV2DefaultValueProps = buildProps({
  cache: TableV2GridDefaultValueProps.cache,
  estimatedRowHeight: TableV2RowDefaultValueProps.estimatedRowHeight,
  rowKey,
  // 表头属性
  headerClass: {
    type: definePropType<string | HeaderClassNameGetter<any>>([
      String,
      Function,
    ]),
  },
  headerProps: {
    type: definePropType<any | ExtractHeaderPropGetter<any>>([
      Object,
      Function,
    ]),
  },
  headerCellProps: {
    type: definePropType<any | ExtractHeaderCellPropGetter<any>>([
      Object,
      Function,
    ]),
  },
  headerHeight: TableV2HeaderDefaultValueProps.headerHeight,
  /**
   * 表尾属性
   */
  footerHeight: {
    type: Number,
    default: 0,
  },
  /**
   * 行属性
   */
  rowClass: {
    type: definePropType<string | RowClassNameGetter<any>>([String, Function]),
  },
  rowProps: {
    type: definePropType<ExtractRowPropGetter<any> | any>([Object, Function]),
  },
  rowHeight: {
    type: Number,
    default: 50,
  },

  /**
   * 单元格属性
   */
  cellProps: {
    type: definePropType<Record<string, any> | ExtraCellPropGetter<any>>([
      Object,
      Function,
    ]),
  },
  /**
   * 数据模型
   */
  columns,
  data: dataType,
  dataGetter: {
    type: definePropType<DataGetter<any>>(Function),
  },
  fixedData: fixedDataType,
  /**
   * 展开的 key
   */
  expandColumnKey: TableV2RowDefaultValueProps.expandColumnKey,
  expandedRowKeys: expandKeys,
  defaultExpandedRowKeys: expandKeys,

  /**
   * 属性
   */
  class: classType,
  // disabled: Boolean,
  fixed: Boolean,
  style: {
    type: definePropType<CSSProperties>(Object),
  },
  width: requiredNumber,
  height: requiredNumber,
  maxHeight: Number,
  useIsScrolling: Boolean,
  indentSize: {
    type: Number,
    default: 12,
  },
  iconSize: {
    type: Number,
    default: 12,
  },
  hScrollbarSize: VirtualizedGridDefaultValueProps.hScrollbarSize,
  vScrollbarSize: VirtualizedGridDefaultValueProps.vScrollbarSize,
  scrollbarAlwaysOn: VirtualizedScrollbarDefaultValueProps.alwaysOn,

  /**
   * 排序
   */
  sortBy: {
    type: definePropType<SortBy>(Object),
    default: () => ({}) as { key: KeyType; order: SortOrder },
  },
  sortState: {
    type: definePropType<SortState>(Object),
    default: undefined,
  },

  /**
   * 处理函数
   */
  onColumnSort: {
    type: definePropType<ColumnSortHandler<any>>(Function),
  },
  onExpandedRowsChange: {
    type: definePropType<ExpandedRowsChangeHandler>(Function),
  },
  onEndReached: {
    type: definePropType<(remainDistance: number) => void>(Function),
  },
  onRowExpand: TableV2RowDefaultValueProps.onRowExpand,
  onScroll: TableV2GridDefaultValueProps.onScroll,
  onRowsRendered: TableV2GridDefaultValueProps.onRowsRendered,
  rowEventHandlers: TableV2RowDefaultValueProps.rowEventHandlers,
} as const)

export type TableV2Props = ExtractPropTypes<typeof TableV2DefaultValueProps>
export type TableV2PropsPublic = ExtractPublicPropTypes<
  typeof TableV2DefaultValueProps
>
