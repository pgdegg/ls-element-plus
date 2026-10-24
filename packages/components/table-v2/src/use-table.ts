import {
  computed,
  getCurrentInstance,
  ref,
  shallowRef,
  toRef,
  unref,
  watch,
} from 'vue'
import { isArray, isNumber } from '@element-plus/utils'
import { useNamespace } from '@element-plus/hooks'
import {
  useColumns,
  useData,
  useRow,
  useScrollbar,
  useStyles,
} from './composables'

import type { TableV2Props } from './table'
import type { TableGridInstance } from './table-grid'

function useTable(props: TableV2Props) {
  const mainTableRef = ref<TableGridInstance>()
  const leftTableRef = ref<TableGridInstance>()
  const rightTableRef = ref<TableGridInstance>()
  const {
    columns,
    columnsStyles,
    columnsTotalWidth,
    fixedColumnsOnLeft,
    fixedColumnsOnRight,
    hasFixedColumns,
    mainColumns,

    onColumnSorted,
  } = useColumns(props, toRef(props, 'columns'), toRef(props, 'fixed'))

  const {
    scrollTo,
    scrollToLeft,
    scrollToTop,
    scrollToRow,
    onScroll,
    onVerticalScroll,
    scrollPos,
  } = useScrollbar(props, {
    mainTableRef,
    leftTableRef,
    rightTableRef,

    onMaybeEndReached,
  })

  const ns = useNamespace('table-v2')
  const instance = getCurrentInstance()!

  // 状态
  const isScrolling = shallowRef(false)

  const {
    expandedRowKeys,
    lastRenderedRowIndex,
    isDynamic,
    isResetting,
    rowHeights,
    resetAfterIndex,
    onRowExpanded,
    onRowHeightChange,
    onRowHovered,
    onRowsRendered,
  } = useRow(props, {
    mainTableRef,
    leftTableRef,
    rightTableRef,
    tableInstance: instance,
    ns,
    isScrolling,
  })

  const { data, depthMap } = useData(props, {
    expandedRowKeys,
    lastRenderedRowIndex,
    resetAfterIndex,
  })

  const rowsHeight = computed(() => {
    const { estimatedRowHeight, rowHeight } = props
    const _data = unref(data)
    if (isNumber(estimatedRowHeight)) {
      // 计算实际高度
      return Object.values(unref(rowHeights)).reduce(
        (acc, curr) => acc + curr,
        0
      )
    }

    return _data.length * rowHeight
  })

  const {
    bodyWidth,
    fixedTableHeight,
    mainTableHeight,
    leftTableWidth,
    rightTableWidth,
    windowHeight,
    footerHeight,
    emptyStyle,
    rootStyle,
    headerHeight,
  } = useStyles(props, {
    columnsTotalWidth,
    fixedColumnsOnLeft,
    fixedColumnsOnRight,
    rowsHeight,
  })

  // DOM/组件 refs
  const containerRef = ref()

  const showEmpty = computed(() => {
    const noData = unref(data).length === 0

    return isArray(props.fixedData)
      ? props.fixedData.length === 0 && noData
      : noData
  })

  function getRowHeight(rowIndex: number) {
    const { estimatedRowHeight, rowHeight, rowKey } = props

    if (!estimatedRowHeight) return rowHeight

    return (
      unref(rowHeights)[unref(data)[rowIndex][rowKey]] || estimatedRowHeight
    )
  }

  const isEndReached = ref(false)
  function onMaybeEndReached() {
    const { onEndReached } = props
    if (!onEndReached) return

    const { scrollTop } = unref(scrollPos)

    const _totalHeight = unref(rowsHeight)
    const clientHeight = unref(windowHeight)

    const remainDistance =
      _totalHeight - (scrollTop + clientHeight) + props.hScrollbarSize

    if (
      !isEndReached.value &&
      unref(lastRenderedRowIndex) >= 0 &&
      _totalHeight <= scrollTop + unref(mainTableHeight) - unref(headerHeight)
    ) {
      isEndReached.value = true
      onEndReached(remainDistance)
    } else {
      isEndReached.value = false
    }
  }

  // 事件

  watch(
    () => unref(rowsHeight),
    () => (isEndReached.value = false)
  )

  watch(
    () => props.expandedRowKeys,
    (val) => (expandedRowKeys.value = val),
    {
      deep: true,
    }
  )

  return {
    // 模型
    columns,
    containerRef,
    mainTableRef,
    leftTableRef,
    rightTableRef,
    // 状态
    isDynamic,
    isResetting,
    isScrolling,
    hasFixedColumns,
    // 记录
    columnsStyles,
    columnsTotalWidth,
    data,
    expandedRowKeys,
    depthMap,
    fixedColumnsOnLeft,
    fixedColumnsOnRight,
    mainColumns,
    // 元数据
    bodyWidth,
    emptyStyle,
    rootStyle,
    footerHeight,
    mainTableHeight,
    fixedTableHeight,
    leftTableWidth,
    rightTableWidth,
    // 标志位
    showEmpty,

    // 方法
    getRowHeight,

    // 事件处理函数
    onColumnSorted,
    onRowHovered,
    onRowExpanded,
    onRowsRendered,
    onRowHeightChange,
    // 滚动条相关
    scrollTo,
    scrollToLeft,
    scrollToTop,
    scrollToRow,
    onScroll,
    onVerticalScroll,
  }
}

export { useTable }

export type UseTableReturn = ReturnType<typeof useTable>
