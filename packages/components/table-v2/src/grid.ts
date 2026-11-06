import { buildProps, definePropType } from '@element-plus/utils'
import {
  VirtualizedGridDefaultValueProps,
  VirtualizedListDefaultValueProps,
} from '@element-plus/components/virtual-list'
import {
  classType,
  columns,
  dataType,
  fixedDataType,
  requiredNumber,
  styleType,
} from './common'
import { TableV2HeaderDefaultValueProps } from './header'
import { TableV2RowDefaultValueProps } from './row'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type { ItemSize } from '@element-plus/components/virtual-list'

export type onRowRenderedParams = {
  rowCacheStart: number
  rowCacheEnd: number
  rowVisibleStart: number
  rowVisibleEnd: number
}

export const TableV2GridDefaultValueProps = buildProps({
  columns,
  data: dataType,
  fixedData: fixedDataType,
  estimatedRowHeight: TableV2RowDefaultValueProps.estimatedRowHeight,

  /**
   * 尺寸相关属性
   */
  width: requiredNumber,
  height: requiredNumber,

  headerWidth: requiredNumber,
  headerHeight: TableV2HeaderDefaultValueProps.headerHeight,

  bodyWidth: requiredNumber,
  rowHeight: requiredNumber,

  /**
   * 特殊属性
   */
  cache: VirtualizedListDefaultValueProps.cache,
  useIsScrolling: Boolean,
  scrollbarAlwaysOn: VirtualizedGridDefaultValueProps.scrollbarAlwaysOn,
  scrollbarStartGap: VirtualizedGridDefaultValueProps.scrollbarStartGap,
  scrollbarEndGap: VirtualizedGridDefaultValueProps.scrollbarEndGap,

  /**
   * CSS 属性
   */
  class: classType,
  style: styleType,
  containerStyle: styleType,

  getRowHeight: {
    type: definePropType<ItemSize>(Function),
    required: true,
  },
  rowKey: TableV2RowDefaultValueProps.rowKey,

  /**
   * 事件处理函数
   */
  onRowsRendered: {
    type: definePropType<(params: onRowRenderedParams) => void>(Function),
  },
  onScroll: {
    type: definePropType<(...args: any[]) => void>(Function),
  },
} as const)

export type TableV2GridProps = ExtractPropTypes<
  typeof TableV2GridDefaultValueProps
>
export type TableV2GridPropsPublic = ExtractPublicPropTypes<
  typeof TableV2GridDefaultValueProps
>
