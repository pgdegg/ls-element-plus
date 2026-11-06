import ElIcon from '@element-plus/components/icon'
import { ArrowRight } from '@element-plus/icons-vue'

import type { PropType, StyleValue } from 'vue'
import type { TableV2RowCellRenderParam } from './row'

type TableV2ExpandIconProps = TableV2RowCellRenderParam['expandIconProps'] & {
  class?: string | string[]
  style: StyleValue
  ariaLabel?: string
  size: number
  expanded: boolean
  expandable: boolean
}
export const TableV2ExpandIconDefaultValueProps = {
  rowData: {
    type: null as unknown as PropType<TableV2ExpandIconProps['rowData']>,
    required: true,
  },
  rowIndex: {
    type: Number as PropType<TableV2ExpandIconProps['rowIndex']>,
    required: true,
  },
  onExpand: {
    type: Function as PropType<TableV2ExpandIconProps['onExpand']>,
    required: true,
  },
  class: { type: [String, Array] as PropType<TableV2ExpandIconProps['class']> },
  style: {
    type: [String, Boolean, Object, Array] as PropType<
      TableV2ExpandIconProps['style']
    >,
    required: true,
    default: undefined,
  },
  ariaLabel: { type: String as PropType<TableV2ExpandIconProps['ariaLabel']> },
  size: {
    type: Number as PropType<TableV2ExpandIconProps['size']>,
    required: true,
  },
  expanded: {
    type: Boolean as PropType<TableV2ExpandIconProps['expanded']>,
    required: true,
    default: undefined,
  },
  expandable: {
    type: Boolean as PropType<TableV2ExpandIconProps['expandable']>,
    required: true,
    default: undefined,
  },
} as const

const ExpandIcon = (props: TableV2ExpandIconProps) => {
  const { expanded, expandable, onExpand, style, size, ariaLabel } = props

  const expandIconProps = {
    onClick: expandable ? () => onExpand(!expanded) : undefined,
    ariaLabel,
    ariaExpanded: expanded,
    class: props.class,
  } as any

  return (
    <button {...expandIconProps} type="button">
      <ElIcon size={size} style={style}>
        <ArrowRight />
      </ElIcon>
    </button>
  )
}

ExpandIcon.inheritAttrs = false

ExpandIcon.props = TableV2ExpandIconDefaultValueProps

export default ExpandIcon

export type ExpandIconInstance = ReturnType<typeof ExpandIcon>
