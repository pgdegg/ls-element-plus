import { isValidComponentSize } from '@element-plus/utils'

import type { PropType } from 'vue'
import type { ComponentSize } from '@element-plus/constants'
import type { MessageBoxType } from './message-box.type'

export const MessageBoxDefaultValueProps = {
  buttonSize: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  modal: {
    type: Boolean,
    default: true,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  closeOnHashChange: {
    type: Boolean,
    default: true,
  },
  center: Boolean,
  draggable: Boolean,
  overflow: Boolean,
  roundButton: Boolean,
  container: {
    type: String, // 默认追加到 body
    default: 'body',
  },
  boxType: {
    type: String as PropType<MessageBoxType>,
    default: '',
  },
} as const
