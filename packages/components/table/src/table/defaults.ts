import { useSizeProp } from '@element-plus/hooks'

import type {
  CSSProperties,
  ComponentInternalInstance,
  PropType,
  Ref,
  StyleValue,
  VNode,
} from 'vue'
import type { ComponentSize } from '@element-plus/constants'
import type { Nullable } from '@element-plus/utils'
import type { Store } from '../store'
import type { TableColumnCtx } from '../table-column/defaults'
import type TableLayout from '../table-layout'
import type {
  TableOverflowTooltipFormatter,
  TableOverflowTooltipOptions,
} from '../util'

type DefaultRow = Record<PropertyKey, any>

interface TableRefs {
  tableWrapper: HTMLElement
  headerWrapper: HTMLElement
  footerWrapper: HTMLElement
  fixedBodyWrapper: HTMLElement
  rightFixedBodyWrapper: HTMLElement
  bodyWrapper: HTMLElement
  appendWrapper: HTMLElement
  [key: string]: any
}

interface TableState {
  isGroup: Ref<boolean>
  resizeState: Ref<{
    width: any
    height: any
  }>
  doLayout: () => void
  debouncedUpdateLayout: () => void
}

interface TreeProps {
  hasChildren?: string
  children?: string
  checkStrictly?: boolean
}

type HoverState<T extends DefaultRow> = Nullable<{
  cell: HTMLElement
  column: TableColumnCtx<T>
  row: T
}>

type RIS<T extends DefaultRow> = {
  row: T
  $index: number
  store: Store<T>
  expanded: boolean
}

type RenderExpanded<T extends DefaultRow> = ({
  row,
  $index,
  store,
  expanded,
}: RIS<T>) => VNode[] | undefined

type SummaryMethod<T extends DefaultRow> = (data: {
  columns: TableColumnCtx<T>[]
  data: T[]
}) => (string | VNode)[]

interface Table<T extends DefaultRow = any> extends Omit<
  ComponentInternalInstance,
  'emit'
> {
  $ready: boolean
  hoverState?: HoverState<T> | null
  renderExpanded: RenderExpanded<T>
  store: Store<T>
  layout: TableLayout<T>
  refs: TableRefs
  tableId: string
  state: TableState
  emit: TableEmits<T>
}

type ColumnCls<T> = string | ((data: { row: T; rowIndex: number }) => string)
type ColumnStyle<T> =
  CSSProperties | ((data: { row: T; rowIndex: number }) => CSSProperties)
type CellCls<T extends DefaultRow> =
  | string
  | ((data: {
      row: T
      rowIndex: number
      column: TableColumnCtx<T>
      columnIndex: number
    }) => string)
type CellStyle<T extends DefaultRow> =
  | CSSProperties
  | ((data: {
      row: T
      rowIndex: number
      column: TableColumnCtx<T>
      columnIndex: number
    }) => CSSProperties)
type Layout = 'fixed' | 'auto'
interface TableProps<T extends DefaultRow = DefaultRow> {
  /**
   * @description 表格数据
   */
  data?: T[]
  /**
   * @description Table 的尺寸
   */
  size?: ComponentSize
  width?: string | number
  /**
   * @description 表格高度。默认为 `auto` 高度。值为数字时以像素为单位；值为字符串时将赋给元素的 style.height，此时高度会受外部样式影响
   */
  height?: string | number
  /**
   * @description 表格最大高度。合法值为数字或以 px 为单位的高度
   */
  maxHeight?: string | number
  /**
   * @description 列宽是否自动适配其容器
   */
  fit?: boolean
  /**
   * @description Table 是否为斑马纹
   */
  stripe?: boolean
  /**
   * @description Table 是否显示纵向边框
   */
  border?: boolean
  /**
   * @description 行数据的 key，用于优化渲染。开启 `reserve-selection` 或展示树形数据时为必填。类型为 String 时支持多级访问，例如 `user.info.id`，但不支持 `user.info[0].id`，这种情况下应使用 `Function`
   */
  rowKey?: string | ((row: T) => string)
  context?: Table<T>
  /**
   * @description 是否显示表头
   */
  showHeader?: boolean
  /**
   * @description 是否显示合计行
   */
  showSummary?: boolean
  /**
   * @description 合计行第一列显示的文本
   */
  sumText?: string
  /**
   * @description 自定义合计方法
   */
  summaryMethod?: SummaryMethod<T>
  /**
   * @description 为某一行返回自定义类名的函数，或为每一行统一设置类名的字符串
   */
  rowClassName?: ColumnCls<T>
  /**
   * @description 为某一行返回自定义样式的函数，或为每一行统一设置自定义样式的对象
   */
  rowStyle?: ColumnStyle<T>
  /**
   * @description 为某个单元格返回自定义类名的函数，或为每个单元格统一设置类名的字符串
   */
  cellClassName?: CellCls<T>
  /**
   * @description 为某个单元格返回自定义样式的函数，或为每个单元格统一设置自定义样式的对象
   */
  cellStyle?: CellStyle<T>
  /**
   * @description 为表头某一行返回自定义类名的函数，或为表头每一行统一设置类名的字符串
   */
  headerRowClassName?: ColumnCls<T>
  /**
   * @description 为表头某一行返回自定义样式的函数，或为表头每一行统一设置自定义样式的对象
   */
  headerRowStyle?: ColumnStyle<T>
  /**
   * @description 为表头某个单元格返回自定义类名的函数，或为表头每个单元格统一设置类名的字符串
   */
  headerCellClassName?: CellCls<T>
  /**
   * @description 为表头某个单元格返回自定义样式的函数，或为表头每个单元格统一设置自定义样式的对象
   */
  headerCellStyle?: CellStyle<T>
  /**
   * @description 当前行是否高亮
   */
  highlightCurrentRow?: boolean
  /**
   * @description 当前行的 key，仅为设置型 prop
   */
  currentRowKey?: string | number
  /**
   * @description 数据为空时显示的文本。可使用 `#empty` 插槽自定义该区域
   */
  emptyText?: string
  /**
   * @description 通过该属性设置展开的行，属性值为展开行的 key，使用前应先设置 row-key
   */
  expandRowKeys?: Array<string>
  /**
   * @description 是否默认展开所有行，在表格存在 type="expand" 的列或包含树形结构数据时生效
   */
  defaultExpandAll?: boolean
  /**
   * @description 启用可展开行，在表格存在 type="expand" 的列时生效
   */
  rowExpandable?: (row: T, index: number) => boolean
  /**
   * @description 设置默认排序列和排序方向。`prop` 属性用于设置默认排序列，`order` 属性用于设置默认排序方向
   */
  defaultSort?: Sort
  /**
   * @description 溢出 tooltip 的 `effect`
   */
  tooltipEffect?: string
  /**
   * @description 溢出 tooltip 的选项，[参见以下 tooltip 组件](tooltip.html#attributes)
   */
  tooltipOptions?: TableOverflowTooltipOptions
  /**
   * @description 返回 rowspan 和 colspan 的方法
   */
  spanMethod?: (data: {
    row: T
    rowIndex: number
    column: TableColumnCtx<T>
    columnIndex: number
  }) =>
    | number[]
    | {
        rowspan: number
        colspan: number
      }
    | undefined
  /**
   * @description 控制多选表格中仅选中部分行（而非全部）时全选复选框的行为。为 true 时选中所有行，否则取消选中
   */
  selectOnIndeterminate?: boolean
  /**
   * @description 树形数据的水平缩进
   */
  indent?: number
  /**
   * @description 渲染嵌套数据的配置
   */
  treeProps?: TreeProps
  /**
   * @description 是否懒加载数据
   */
  lazy?: boolean
  /**
   * @description 加载子行数据的方法，仅在 `lazy` 为 true 时生效
   */
  load?: (row: T, treeNode: TreeNode, resolve: (data: T[]) => void) => void
  className?: string
  style?: StyleValue
  /**
   * @description 设置用于布局表格单元格、行和列的算法
   */
  tableLayout?: Layout
  /**
   * @description 始终显示滚动条
   */
  scrollbarAlwaysOn?: boolean
  /**
   * @description 确保主轴最小尺寸不随内容变化
   */
  flexible?: boolean
  /**
   * @description 是否隐藏多余内容，并在悬停单元格时以 tooltip 形式展示。会影响表格的所有列
   */
  showOverflowTooltip?: boolean | TableOverflowTooltipOptions
  /**
   * @description 格式化单元格 tooltip 内容的函数，在 `show-overflow-tooltip` 为 `true` 时生效
   */
  tooltipFormatter?: TableOverflowTooltipFormatter<T>
  appendFilterPanelTo?: string
  scrollbarTabindex?: number | string
  /**
   * @description 是否允许拖动最后一列
   */
  allowDragLastColumn?: boolean
  /**
   * @description 折叠时是否在 DOM 中保留已展开行的内容
   */
  preserveExpandedContent?: boolean
  /**
   * @description 是否使用原生滚动条
   */
  nativeScrollbar?: boolean
}

type TableTooltipData<T extends DefaultRow> = Parameters<
  TableOverflowTooltipFormatter<T>
>[0]
type TableSortOrder = 'ascending' | 'descending'

interface Sort {
  prop: string
  order: TableSortOrder
  init?: any
  silent?: any
}

interface Filter<T extends DefaultRow> {
  column: TableColumnCtx<T>
  values: string[]
  silent: any
}

interface TreeNode {
  expanded?: boolean
  loading?: boolean
  noLazyChildren?: boolean
  indent?: number
  level?: number
  display?: boolean
}

interface RenderRowData<T extends DefaultRow> {
  store: Store<T>
  _self: Table<T>
  column: TableColumnCtx<T>
  row: T
  $index: number
  cellIndex: number
  treeNode?: TreeNode
  expanded: boolean
}

interface TableConfigContext {
  showOverflowTooltip?: boolean | TableOverflowTooltipOptions
  tooltipEffect?: string
  tooltipOptions?: TableOverflowTooltipOptions
  tooltipFormatter?: TableOverflowTooltipFormatter<any>
}

interface TableEmits<T extends DefaultRow = DefaultRow> {
  (e: 'select', selection: T[], row: T): void
  (e: 'select-all', selection: T[]): void
  (e: 'selection-change', newSelection: T[]): void
  (
    e: 'cell-mouse-enter' | 'cell-mouse-leave' | 'cell-dblclick',
    row: T,
    column: TableColumnCtx<T>,
    cell: HTMLTableCellElement,
    event: MouseEvent
  ): void
  (
    e: 'cell-contextmenu' | 'cell-click',
    row: T,
    column: TableColumnCtx<T>,
    cell: HTMLTableCellElement,
    event: PointerEvent
  ): void
  (
    e: 'row-dblclick',
    row: T,
    column: TableColumnCtx<T> | null,
    event: MouseEvent
  ): void
  (
    e: 'row-click' | 'row-contextmenu',
    row: T,
    column: TableColumnCtx<T> | null,
    event: PointerEvent
  ): void
  (
    e: 'header-click' | 'header-contextmenu',
    column: TableColumnCtx<T>,
    event: PointerEvent
  ): void
  (
    e: 'sort-change',
    data: {
      column: TableColumnCtx<T>
      prop: string | null
      order: TableSortOrder | null
    }
  ): void
  (e: 'filter-change', newFilters: Record<string, string[]>): void
  (e: 'current-change', currentRow: T | null, oldCurrentRow: T | null): void
  (
    e: 'header-dragend',
    newWidth: number,
    oldWidth: number,
    column: TableColumnCtx<T>,
    event: MouseEvent
  ): void
  (e: 'expand-change', row: T, expandedRows: T[]): void
  (e: 'expand-change', row: T, expanded: boolean): void
  (
    e: 'scroll',
    data: {
      scrollLeft: number
      scrollTop: number
    }
  ): void
}

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TableProps`。
 */
export const tableProps = {
  /**
   * @description 表格数据
   */
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  /**
   * @description Table 的尺寸
   */
  size: useSizeProp,
  width: [String, Number],
  /**
   * @description 表格高度。默认为 `auto` 高度。值为数字时以像素为单位；值为字符串时将赋给元素的 style.height，此时高度会受外部样式影响
   */
  height: [String, Number],
  /**
   * @description 表格最大高度。合法值为数字或以 px 为单位的高度
   */
  maxHeight: [String, Number],
  /**
   * @description 列宽是否自动适配其容器
   */
  fit: {
    type: Boolean,
    default: true,
  },
  /**
   * @description Table 是否为斑马纹
   */
  stripe: Boolean,
  /**
   * @description Table 是否显示纵向边框
   */
  border: Boolean,
  /**
   * @description 行数据的 key，用于优化渲染。开启 `reserve-selection` 或展示树形数据时为必填。类型为 String 时支持多级访问，例如 `user.info.id`，但不支持 `user.info[0].id`，这种情况下应使用 `Function`
   */
  rowKey: [String, Function] as PropType<TableProps<any>['rowKey']>,
  /**
   * @description 是否显示表头
   */
  showHeader: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示合计行
   */
  showSummary: Boolean,
  /**
   * @description 合计行第一列显示的文本
   */
  sumText: String,
  /**
   * @description 自定义合计方法
   */
  summaryMethod: Function as PropType<TableProps<any>['summaryMethod']>,
  /**
   * @description 为某一行返回自定义类名的函数，或为每一行统一设置类名的字符串
   */
  rowClassName: [String, Function] as PropType<TableProps<any>['rowClassName']>,
  /**
   * @description 为某一行返回自定义样式的函数，或为每一行统一设置自定义样式的对象
   */
  rowStyle: [Object, Function] as PropType<TableProps<any>['rowStyle']>,
  /**
   * @description 为某个单元格返回自定义类名的函数，或为每个单元格统一设置类名的字符串
   */
  cellClassName: [String, Function] as PropType<
    TableProps<any>['cellClassName']
  >,
  /**
   * @description 为某个单元格返回自定义样式的函数，或为每个单元格统一设置自定义样式的对象
   */
  cellStyle: [Object, Function] as PropType<TableProps<any>['cellStyle']>,
  /**
   * @description 为表头某一行返回自定义类名的函数，或为表头每一行统一设置类名的字符串
   */
  headerRowClassName: [String, Function] as PropType<
    TableProps<any>['headerRowClassName']
  >,
  /**
   * @description 为表头某一行返回自定义样式的函数，或为表头每一行统一设置自定义样式的对象
   */
  headerRowStyle: [Object, Function] as PropType<
    TableProps<any>['headerRowStyle']
  >,
  /**
   * @description 为表头某个单元格返回自定义类名的函数，或为表头每个单元格统一设置类名的字符串
   */
  headerCellClassName: [String, Function] as PropType<
    TableProps<any>['headerCellClassName']
  >,
  /**
   * @description 为表头某个单元格返回自定义样式的函数，或为表头每个单元格统一设置自定义样式的对象
   */
  headerCellStyle: [Object, Function] as PropType<
    TableProps<any>['headerCellStyle']
  >,
  /**
   * @description 当前行是否高亮
   */
  highlightCurrentRow: Boolean,
  /**
   * @description 当前行的 key，仅为设置型 prop
   */
  currentRowKey: [String, Number],
  /**
   * @description 数据为空时显示的文本。可使用 `#empty` 插槽自定义该区域
   */
  emptyText: String,
  /**
   * @description 通过该属性设置展开的行，属性值为展开行的 key，使用前应先设置 row-key
   */
  expandRowKeys: Array as PropType<TableProps<any>['expandRowKeys']>,
  /**
   * @description 是否默认展开所有行，在表格存在 type="expand" 的列或包含树形结构数据时生效
   */
  defaultExpandAll: Boolean,
  /**
   * @description 启用可展开行，在表格存在 type="expand" 的列时生效
   */
  rowExpandable: {
    type: Function as PropType<TableProps<any>['rowExpandable']>,
  },
  /**
   * @description 设置默认排序列和排序方向。`prop` 属性用于设置默认排序列，`order` 属性用于设置默认排序方向
   */
  defaultSort: Object as PropType<TableProps<any>['defaultSort']>,
  /**
   * @description 溢出 tooltip 的 `effect`
   */
  tooltipEffect: String,
  /**
   * @description 溢出 tooltip 的选项，[参见以下 tooltip 组件](tooltip.html#attributes)
   */
  tooltipOptions: Object as PropType<TableProps<any>['tooltipOptions']>,
  /**
   * @description 返回 rowspan 和 colspan 的方法
   */
  spanMethod: Function as PropType<TableProps<any>['spanMethod']>,
  /**
   * @description 控制多选表格中仅选中部分行（而非全部）时全选复选框的行为。为 true 时选中所有行，否则取消选中
   */
  selectOnIndeterminate: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 树形数据的水平缩进
   */
  indent: {
    type: Number,
    default: 16,
  },
  /**
   * @description 渲染嵌套数据的配置
   */
  treeProps: {
    type: Object as PropType<TableProps<any>['treeProps']>,
    default: () => {
      return {
        hasChildren: 'hasChildren',
        children: 'children',
        checkStrictly: false,
      }
    },
  },
  /**
   * @description 是否懒加载数据
   */
  lazy: Boolean,
  /**
   * @description 加载子行数据的方法，仅在 `lazy` 为 true 时生效
   */
  load: Function as PropType<TableProps<any>['load']>,
  style: {
    type: [String, Object, Array, Boolean] as PropType<
      TableProps<any>['style']
    >,
    default: () => ({}),
  },
  className: {
    type: String,
    default: '',
  },
  /**
   * @description 设置用于布局表格单元格、行和列的算法
   */
  tableLayout: {
    type: String as PropType<Layout>,
    default: 'fixed',
  },
  /**
   * @description 始终显示滚动条
   */
  scrollbarAlwaysOn: Boolean,
  /**
   * @description 确保主轴最小尺寸不随内容变化
   */
  flexible: Boolean,
  /**
   * @description 是否隐藏多余内容，并在悬停单元格时以 tooltip 形式展示。会影响表格的所有列
   */
  showOverflowTooltip: {
    type: [Boolean, Object] as PropType<TableProps<any>['showOverflowTooltip']>,
    default: undefined,
  },
  /**
   * @description 格式化单元格 tooltip 内容的函数，在 `show-overflow-tooltip` 为 `true` 时生效
   */
  tooltipFormatter: Function as PropType<TableProps<any>['tooltipFormatter']>,
  appendFilterPanelTo: String,
  scrollbarTabindex: {
    type: [Number, String],
    default: undefined,
  },
  /**
   * @description 是否允许拖动最后一列
   */
  allowDragLastColumn: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 折叠时是否在 DOM 中保留已展开行的内容
   */
  preserveExpandedContent: Boolean,
  /**
   * @description 是否使用原生滚动条
   */
  nativeScrollbar: Boolean,
}
export type {
  SummaryMethod,
  Table,
  TableProps,
  TableRefs,
  ColumnCls,
  ColumnStyle,
  CellCls,
  CellStyle,
  DefaultRow,
  TreeNode,
  RenderRowData,
  Sort,
  Filter,
  TableColumnCtx,
  TreeProps,
  TableTooltipData,
  TableSortOrder,
  RenderExpanded,
  TableConfigContext,
  TableEmits,
}

export default tableProps
