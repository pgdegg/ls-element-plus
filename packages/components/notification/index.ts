import { withInstallFunction } from '@element-plus/utils'
import Notify from './src/notify'

export const ElNotification = withInstallFunction(Notify, '$notify')
export default ElNotification

export { notificationTypes, notificationEmits } from './src/notification'
export type {
  NotificationType,
  NotificationPosition,
  NotificationProgress,
  NotificationProps,
  NotificationEmits,
  NotificationInstance,
  NotificationExposed,
  NotificationOptions,
  NotificationOptionsTyped,
  NotificationHandle,
  NotificationParams,
  NotificationParamsTyped,
  NotifyFn,
  NotifyTypedFn,
  Notify,
  NotificationQueueItem,
  NotificationQueue,
} from './src/notification'
