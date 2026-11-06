import Node from './model/node'

import type { PropType } from 'vue'
import type { TreeOptionProps } from './tree.type'

export const TreeNodeDefaultValueProps = {
  node: {
    type: Node,
    default: () => ({}),
  },
  props: {
    type: Object as PropType<TreeOptionProps>,
    default: () => ({}),
  },
  accordion: Boolean,
  renderContent: Function,
  renderAfterExpand: Boolean,
  showCheckbox: Boolean,
} as const
