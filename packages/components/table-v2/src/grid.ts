import { buildProps, definePropType } from '@element-plus/utils'
import {
  virtualizedGridProps,
  virtualizedListProps,
} from '@element-plus/components/virtual-list'
import {
  classType,
  columns,
  dataType,
  fixedDataType,
  requiredNumber,
  styleType,
} from './common'
import { tableV2HeaderProps } from './header'
import { tableV2RowProps } from './row'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type { ItemSize } from '@element-plus/components/virtual-list'

export type onRowRenderedParams = {
  rowCacheStart: number
  rowCacheEnd: number
  rowVisibleStart: number
  rowVisibleEnd: number
}

export const tableV2GridProps = buildProps({
  columns,
  data: dataType,
  fixedData: fixedDataType,
  estimatedRowHeight: tableV2RowProps.estimatedRowHeight,

  /**
   * 尺寸相关属性
   */
  width: requiredNumber,
  height: requiredNumber,

  headerWidth: requiredNumber,
  headerHeight: tableV2HeaderProps.headerHeight,

  bodyWidth: requiredNumber,
  rowHeight: requiredNumber,

  /**
   * 特殊属性
   */
  cache: virtualizedListProps.cache,
  useIsScrolling: Boolean,
  scrollbarAlwaysOn: virtualizedGridProps.scrollbarAlwaysOn,
  scrollbarStartGap: virtualizedGridProps.scrollbarStartGap,
  scrollbarEndGap: virtualizedGridProps.scrollbarEndGap,

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
  rowKey: tableV2RowProps.rowKey,

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

export type TableV2GridProps = ExtractPropTypes<typeof tableV2GridProps>
export type TableV2GridPropsPublic = ExtractPublicPropTypes<
  typeof tableV2GridProps
>
