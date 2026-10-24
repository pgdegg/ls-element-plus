import { renderSlot } from 'vue'
import { HeaderCell, SortIcon } from '../components'
// import ColumnResizer from '../table-column-resizer'
import { Alignment, SortOrder, oppositeOrderMap } from '../constants'
import { placeholderSign } from '../private'
import { componentToSlot, enforceUnit, tryCall } from '../utils'

import type { FunctionalComponent, UnwrapNestedRefs } from 'vue'
import type { Translator, UseNamespaceReturn } from '@element-plus/hooks'
import type { TableV2HeaderRowCellRendererParams } from '../components'
import type { UseTableReturn } from '../use-table'
import type { TableV2Props } from '../table'

export type HeaderCellRendererProps = TableV2HeaderRowCellRendererParams &
  UnwrapNestedRefs<Pick<UseTableReturn, 'onColumnSorted'>> &
  Pick<TableV2Props, 'sortBy' | 'sortState' | 'headerCellProps'> & {
    ns: UseNamespaceReturn
    t: Translator
  }

const HeaderCellRenderer: FunctionalComponent<HeaderCellRendererProps> = (
  props,
  { slots }
) => {
  const { column, ns, t, style, onColumnSorted } = props

  const cellStyle = enforceUnit(style)

  if (column.placeholderSign === placeholderSign) {
    return (
      <div class={ns.em('header-row-cell', 'placeholder')} style={cellStyle} />
    )
  }

  const { headerCellRenderer, headerClass, sortable } = column

  /**
   * 渲染 Cell 子元素
   */

  const cellProps = {
    ...props,
    class: ns.e('header-cell-text'),
  }

  const columnCellRenderer =
    componentToSlot<typeof cellProps>(headerCellRenderer)

  const Cell = columnCellRenderer
    ? columnCellRenderer(cellProps)
    : renderSlot(slots, 'default', cellProps, () => [
        <HeaderCell {...cellProps} />,
      ])

  /**
   * 渲染单元格容器和排序指示器
   */
  const { sortBy, sortState, headerCellProps } = props

  let sorting: boolean, sortOrder: SortOrder, ariaSort: string | undefined
  if (sortState) {
    const order = sortState[column.key!]
    sorting = Boolean(oppositeOrderMap[order])
    sortOrder = sorting ? order : SortOrder.ASC
  } else {
    sorting = column.key === sortBy.key
    sortOrder = sorting ? sortBy.order : SortOrder.ASC
  }
  if (sortOrder === SortOrder.ASC) {
    ariaSort = 'ascending'
  } else if (sortOrder === SortOrder.DESC) {
    ariaSort = 'descending'
  } else {
    ariaSort = undefined
  }

  const cellKls = [
    ns.e('header-cell'),
    tryCall(headerClass, props, ''),
    column.align === Alignment.CENTER && ns.is('align-center'),
    column.align === Alignment.RIGHT && ns.is('align-right'),
    sortable && ns.is('sortable'),
  ]

  const cellWrapperProps = {
    ...tryCall(headerCellProps, props),
    onClick: column.sortable ? onColumnSorted : undefined,
    ariaSort: sortable ? ariaSort : undefined,
    class: cellKls,
    style: cellStyle,
    ['data-key']: column.key,
  }

  // 目前暂不提供可调整列宽功能，因为存在一些 UX 问题。
  return (
    <div {...cellWrapperProps} role="columnheader">
      {Cell}

      {sortable && (
        <SortIcon
          class={[ns.e('sort-icon'), sorting && ns.is('sorting')]}
          sortOrder={sortOrder}
          ariaLabel={t('el.table.sortLabel', { column: column.title || '' })}
        />
      )}
    </div>
  )
}

export default HeaderCellRenderer
export type HeaderCellSlotProps = HeaderCellRendererProps & { class: string }
