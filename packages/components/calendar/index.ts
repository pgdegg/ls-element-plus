import { withInstall } from '@element-plus/utils'
import Calendar from './src/calendar.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElCalendar: SFCWithInstall<typeof Calendar> = withInstall(Calendar)
export default ElCalendar

export { calendarEmits } from './src/calendar'
export type {
  CalendarDateType,
  CalendarProps,
  CalendarEmits,
} from './src/calendar'
export type {
  CalendarDateTableInstance,
  DateTableInstance,
  CalendarInstance,
} from './src/instance'
