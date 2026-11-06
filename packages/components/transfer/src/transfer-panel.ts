import { buildProps, definePropType } from '@element-plus/utils'
import { TransferDefaultValueProps, transferCheckedChangeFn } from './transfer'

import type { ComponentInstance, VNode } from 'vue'
import type { ComponentExposed } from 'vue-component-type-helpers'
import type {
  TransferDataItem,
  TransferFormat,
  TransferKey,
  TransferPropsAlias,
} from './transfer'
import type TransferPanel from './transfer-panel.vue'

export interface TransferPanelState {
  checked: TransferKey[]
  allChecked: boolean
  query: string
  checkChangeByUser: boolean
}

export const CHECKED_CHANGE_EVENT = 'checked-change'

export interface TransferPanelProps<
  T extends TransferDataItem = TransferDataItem,
> {
  data?: T[]
  optionRender?: (option: T) => VNode | VNode[]
  placeholder?: string
  title?: string
  filterable?: boolean
  format?: TransferFormat
  filterMethod?: (query: string, item: T) => boolean
  defaultChecked?: TransferKey[]
  props?: TransferPropsAlias
  virtualScroll?: boolean
  itemSize?: number
}

/** Runtime prop definitions; use the public props interface for types. */
export const TransferPanelDefaultValueProps = buildProps({
  data: TransferDefaultValueProps.data,
  optionRender: {
    type: definePropType<(option: TransferDataItem) => VNode | VNode[]>(
      Function
    ),
  },
  placeholder: String,
  title: String,
  filterable: Boolean,
  format: TransferDefaultValueProps.format,
  filterMethod: TransferDefaultValueProps.filterMethod,
  defaultChecked: TransferDefaultValueProps.leftDefaultChecked,
  props: TransferDefaultValueProps.props,
  virtualScroll: TransferDefaultValueProps.virtualScroll,
  itemSize: TransferDefaultValueProps.itemSize,
} as const)

export const transferPanelEmits = {
  [CHECKED_CHANGE_EVENT]: transferCheckedChangeFn,
}
export type TransferPanelEmits = typeof transferPanelEmits

export type TransferPanelInstance = ComponentInstance<typeof TransferPanel> &
  ComponentExposed<typeof TransferPanel>
