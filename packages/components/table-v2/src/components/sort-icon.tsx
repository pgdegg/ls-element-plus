import ElIcon from '@element-plus/components/icon'
import { SortDown, SortUp } from '@element-plus/icons-vue'
import { SortOrder } from '../constants'

import type { FunctionalComponent, PropType } from 'vue'

export type SortIconProps = {
  sortOrder: SortOrder
  ariaLabel?: string
  class?: JSX.IntrinsicAttributes['class']
}

export const TableV2SortIconDefaultValueProps = {
  sortOrder: {
    type: String as PropType<SortIconProps['sortOrder']>,
    required: true,
  },
  ariaLabel: { type: String as PropType<SortIconProps['ariaLabel']> },
  class: {
    type: [String, Boolean, Object, Array] as PropType<SortIconProps['class']>,
    default: undefined,
  },
} as const

const SortIcon: FunctionalComponent<SortIconProps> = (props) => {
  const { sortOrder } = props

  return (
    <button type="button" aria-label={props.ariaLabel} class={props.class}>
      <ElIcon size={14}>
        {sortOrder === SortOrder.ASC ? <SortUp /> : <SortDown />}
      </ElIcon>
    </button>
  )
}

SortIcon.props = TableV2SortIconDefaultValueProps

export default SortIcon
