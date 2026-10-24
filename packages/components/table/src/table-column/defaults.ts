import type { ComponentInternalInstance, PropType, Ref, VNode } from 'vue'
import type { DefaultRow, Table, TableSortOrder } from '../table/defaults'
import type {
  TableOverflowTooltipFormatter,
  TableOverflowTooltipOptions,
} from '../util'
import type { Store } from '../store'

type CI<T extends DefaultRow> = {
  column: TableColumnCtx<T>
  $index: number
  store: Store<T>
  _self: any
}

type Filters = {
  text: string
  value: string
}[]

type FilterMethods<T extends DefaultRow> = (
  value: string,
  row: T,
  column: TableColumnCtx<T>
) => void

type ValueOf<T> = T[keyof T]

type TableColumnCtx<T extends DefaultRow = DefaultRow> = {
  id: string
  realWidth: number | null
  type: string
  label: string
  className: string
  labelClassName: string
  property: string
  prop: string
  width?: string | number
  minWidth: string | number
  renderHeader: (data: CI<T>) => VNode
  sortable: boolean | string
  sortMethod: (a: T, b: T) => number
  sortBy: string | ((row: T, index: number, array?: T[]) => string) | string[]
  resizable: boolean
  columnKey: string
  rawColumnKey: string
  align: string
  headerAlign: string
  showOverflowTooltip?: boolean | TableOverflowTooltipOptions
  tooltipFormatter?: TableOverflowTooltipFormatter<T>
  fixed: boolean | string
  formatter: (
    row: T,
    column: TableColumnCtx<T>,
    cellValue: any,
    index: number
  ) => VNode | string
  selectable: (row: T, index: number) => boolean
  reserveSelection: boolean
  filterMethod: FilterMethods<T>
  filteredValue: string[]
  filters: Filters
  filterPlacement: string
  filterMultiple: boolean
  filterClassName: string
  index: number | ((index: number) => number)
  sortOrders: (TableSortOrder | null)[]
  renderCell: (data: any) => VNode | VNode[]
  colSpan: number
  rowSpan: number
  children?: TableColumnCtx<T>[]
  level: number
  filterable: boolean | FilterMethods<T> | Filters
  order: TableSortOrder | null
  isColumnGroup: boolean
  isSubColumn: boolean
  columns: TableColumnCtx<T>[]
  getColumnIndex: () => number
  no: number
  filterOpened?: boolean
  renderFilterIcon?: (scope: any) => VNode
  renderExpand?: (scope: any) => VNode
}

interface TableColumn<T extends DefaultRow> extends ComponentInternalInstance {
  vnode: {
    vParent: TableColumn<T> | Table<T>
  } & VNode
  vParent: TableColumn<T> | Table<T>
  columnId: string
  columnConfig: Ref<Partial<TableColumnCtx<T>>>
}

interface TableColumnProps<T extends DefaultRow = DefaultRow> {
  /**
   * @description 列的类型。设置为 `selection` 时该列显示复选框；设置为 `index` 时显示行索引（从 1 开始）；设置为 `expand` 时显示展开图标
   */
  type?: string
  /**
   * @description 列的标签
   */
  label?: string
  /**
   * @description 该列单元格的类名
   */
  className?: string
  /**
   * @description 该列表头标签的类名
   */
  labelClassName?: string
  /**
   * @description
   */
  property?: string
  /**
   * @description 字段名。也可以使用它的别名：`property`
   */
  prop?: string
  /**
   * @description 列宽
   */
  width?: string | number
  /**
   * @description 列的最小宽度。设置了 `width` 的列宽度固定，而设置了 `min-width` 的列按比例分配宽度
   */
  minWidth?: string | number
  /**
   * @description 该列表头的渲染函数
   */
  renderHeader?: TableColumnCtx<T>['renderHeader']
  /**
   * @description 列是否可排序。将该属性设为 'custom' 并监听 Table 的 `sort-change` 事件即可实现远程排序
   */
  sortable?: boolean | string
  /**
   * @description 排序方法，在 `sortable` 为 `true` 时生效。应像 Array.sort 一样返回一个数字
   */
  sortMethod?: TableColumnCtx<T>['sortMethod']
  /**
   * @description 指定按哪个属性排序，在 `sortable` 为 `true` 且 `sort-method` 为 `undefined` 时生效。若设为数组，当前一个属性相同时将依次按下一个属性排序
   */
  sortBy?: TableColumnCtx<T>['sortBy']
  /**
   * @description 列宽是否可调整，在 `el-table` 的 `border` 为 `true` 时生效
   */
  resizable?: boolean
  /**
   * @description 列的 key。若需要使用 filter-change 事件，需要通过该属性标识当前被过滤的是哪一列
   */
  columnKey?: string
  /**
   * @description 对齐方式，取值应为 'left' \/ 'center' \/ 'right'
   */
  align?: string
  /**
   * @description 表头的对齐方式。省略时将应用上面 `align` 属性的值，取值应为 'left' \/ 'center' \/ 'right'
   */
  headerAlign?: string
  /**
   * @description 是否隐藏多余内容，并在悬停单元格时以 tooltip 形式展示
   */
  showOverflowTooltip?: TableColumnCtx<T>['showOverflowTooltip']
  /**
   * @description 格式化单元格 tooltip 内容的函数，在 `show-overflow-tooltip` 为 `true` 时生效
   */
  tooltipFormatter?: TableColumnCtx<T>['tooltipFormatter']
  /**
   * @description 列是否固定在左侧 / 右侧。设为 `true` 时固定在左侧
   */
  fixed?: boolean | string
  /**
   * @description 格式化单元格内容的函数
   */
  formatter?: TableColumnCtx<T>['formatter']
  /**
   * @description 判断某一行是否可被选中的函数，在 `type` 为 'selection' 时生效
   */
  selectable?: TableColumnCtx<T>['selectable']
  /**
   * @description 数据刷新后是否保留选中状态，在 `type` 为 'selection' 时生效。注意：此功能需要设置 `row-key`
   */
  reserveSelection?: boolean
  /**
   * @description 数据过滤方法。开启 `filter-multiple` 时，该方法会对每一行被调用多次，只要有一次调用返回 `true` 就显示该行
   */
  filterMethod?: TableColumnCtx<T>['filterMethod']
  /**
   * @description 选中数据的过滤值，在使用 `render-header` 渲染表头时可能有用
   */
  filteredValue?: TableColumnCtx<T>['filteredValue']
  /**
   * @description 数据过滤选项数组。数组中每个元素都需要 `text` 和 `value`
   */
  filters?: TableColumnCtx<T>['filters']
  /**
   * @description 过滤下拉框的弹出位置
   */
  filterPlacement?: string
  /**
   * @description 数据过滤是否支持多选
   */
  filterMultiple?: boolean
  /**
   * @description 过滤下拉框的 className
   */
  filterClassName?: string
  /**
   * @description 自定义每一行的索引，在 `type=index` 的列上生效
   */
  index?: TableColumnCtx<T>['index']
  /**
   * @description 数据排序时所用排序策略的顺序，在 `sortable` 为 `true` 时生效。接收一个数组，用户点击表头时，列将按数组中元素的顺序进行排序
   */
  sortOrders?: TableColumnCtx<T>['sortOrders']
}

export type {
  Filters,
  FilterMethods,
  TableColumnCtx,
  TableColumn,
  TableColumnProps,
  ValueOf,
}

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TableColumnProps`。
 */
export const tableColumnProps = {
  /**
   * @description 列的类型。设置为 `selection` 时该列显示复选框；设置为 `index` 时显示行索引（从 1 开始）；设置为 `expand` 时显示展开图标
   */
  type: {
    type: String,
    default: 'default',
  },
  /**
   * @description 列的标签
   */
  label: String,
  /**
   * @description 该列单元格的类名
   */
  className: String,
  /**
   * @description 该列表头标签的类名
   */
  labelClassName: String,
  /**
   * @description
   */
  property: String,
  /**
   * @description 字段名。也可以使用它的别名：`property`
   */
  prop: String,
  /**
   * @description 列宽
   */
  width: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 列的最小宽度。设置了 `width` 的列宽度固定，而设置了 `min-width` 的列按比例分配宽度
   */
  minWidth: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 该列表头的渲染函数
   */
  renderHeader: Function as PropType<TableColumnCtx<any>['renderHeader']>,
  /**
   * @description 列是否可排序。将该属性设为 'custom' 并监听 Table 的 `sort-change` 事件即可实现远程排序
   */
  sortable: {
    type: [Boolean, String],
    default: false,
  },
  /**
   * @description 排序方法，在 `sortable` 为 `true` 时生效。应像 Array.sort 一样返回一个数字
   */
  sortMethod: Function as PropType<TableColumnCtx<any>['sortMethod']>,
  /**
   * @description 指定按哪个属性排序，在 `sortable` 为 `true` 且 `sort-method` 为 `undefined` 时生效。若设为数组，当前一个属性相同时将依次按下一个属性排序
   */
  sortBy: [String, Function, Array] as PropType<TableColumnCtx<any>['sortBy']>,
  /**
   * @description 列宽是否可调整，在 `el-table` 的 `border` 为 `true` 时生效
   */
  resizable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 列的 key。若需要使用 filter-change 事件，需要通过该属性标识当前被过滤的是哪一列
   */
  columnKey: String,
  /**
   * @description 对齐方式，取值应为 'left' \/ 'center' \/ 'right'
   */
  align: String,
  /**
   * @description 表头的对齐方式。省略时将应用上面 `align` 属性的值，取值应为 'left' \/ 'center' \/ 'right'
   */
  headerAlign: String,
  /**
   * @description 是否隐藏多余内容，并在悬停单元格时以 tooltip 形式展示
   */
  showOverflowTooltip: {
    type: [Boolean, Object] as PropType<
      TableColumnCtx<any>['showOverflowTooltip']
    >,
    default: undefined,
  },
  /**
   * @description 格式化单元格 tooltip 内容的函数，在 `show-overflow-tooltip` 为 `true` 时生效
   */
  tooltipFormatter: Function as PropType<
    TableColumnCtx<any>['tooltipFormatter']
  >,
  /**
   * @description 列是否固定在左侧 / 右侧。设为 `true` 时固定在左侧
   */
  fixed: [Boolean, String],
  /**
   * @description 格式化单元格内容的函数
   */
  formatter: Function as PropType<TableColumnCtx<any>['formatter']>,
  /**
   * @description 判断某一行是否可被选中的函数，在 `type` 为 'selection' 时生效
   */
  selectable: Function as PropType<TableColumnCtx<any>['selectable']>,
  /**
   * @description 数据刷新后是否保留选中状态，在 `type` 为 'selection' 时生效。注意：此功能需要设置 `row-key`
   */
  reserveSelection: Boolean,
  /**
   * @description 数据过滤方法。开启 `filter-multiple` 时，该方法会对每一行被调用多次，只要有一次调用返回 `true` 就显示该行
   */
  filterMethod: Function as PropType<TableColumnCtx<any>['filterMethod']>,
  /**
   * @description 选中数据的过滤值，在使用 `render-header` 渲染表头时可能有用
   */
  filteredValue: Array as PropType<TableColumnCtx<any>['filteredValue']>,
  /**
   * @description 数据过滤选项数组。数组中每个元素都需要 `text` 和 `value`
   */
  filters: Array as PropType<TableColumnCtx<any>['filters']>,
  /**
   * @description 过滤下拉框的弹出位置
   */
  filterPlacement: String,
  /**
   * @description whether data filtering supports multiple options
   */
  filterMultiple: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 过滤下拉框的 className
   */
  filterClassName: String,
  /**
   * @description 自定义每一行的索引，在 `type=index` 的列上生效
   */
  index: [Number, Function] as PropType<TableColumnCtx<any>['index']>,
  /**
   * @description 数据排序时所用排序策略的顺序，在 `sortable` 为 `true` 时生效。接收一个数组，用户点击表头时，列将按数组中元素的顺序进行排序
   */
  sortOrders: {
    type: Array as PropType<TableColumnCtx<any>['sortOrders']>,
    default: () => {
      return ['ascending', 'descending', null]
    },
    validator: (val: TableColumnCtx<any>['sortOrders']) => {
      return val.every((order: TableSortOrder | null) =>
        ['ascending', 'descending', null].includes(order)
      )
    },
  },
}

export default tableColumnProps
