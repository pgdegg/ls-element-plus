import { withInstallFunction } from '@element-plus/utils'
import Message from './src/method'

export const ElMessage = withInstallFunction(Message, '$message')
export default ElMessage

export {
  messageTypes,
  messagePlacement,
  MESSAGE_DEFAULT_PLACEMENT,
  messageDefaults,
  messageEmits,
} from './src/message'
export type {
  MessageProps,
  MessageType,
  MessagePlacement,
  MessageConfigContext,
  MessageEmits,
  MessageInstance,
  MessageOptions,
  MessageParams,
  MessageParamsNormalized,
  MessageOptionsWithType,
  MessageParamsWithType,
  MessageHandler,
  MessageFn,
  MessageTypedFn,
  Message,
} from './src/message'
