import { withInstall } from '@element-plus/utils'
import DatePickerPanel from './src/date-picker-panel'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElDatePickerPanel: SFCWithInstall<typeof DatePickerPanel> =
  withInstall(DatePickerPanel)

export default ElDatePickerPanel
export * from './src/constants'
export * from './src/props/date-picker-panel'
export * from './src/types'
export type { DatePickerPanelInstance } from './src/instance'

export { BasicCellDefaultValueProps } from './src/props/basic-cell'

export { BasicDateTableDefaultValueProps } from './src/props/basic-date-table'

export { BasicMonthTableDefaultValueProps } from './src/props/basic-month-table'

export { BasicQuarterTableDefaultValueProps } from './src/props/basic-quarter-table'

export { BasicYearTableDefaultValueProps } from './src/props/basic-year-table'

export { PanelDatePickDefaultValueProps } from './src/props/panel-date-pick'

export { PanelDateRangeDefaultValueProps } from './src/props/panel-date-range'

export { PanelMonthRangeDefaultValueProps } from './src/props/panel-month-range'

export { PanelQuarterRangeDefaultValueProps } from './src/props/panel-quarter-range'

export { PanelYearRangeDefaultValueProps } from './src/props/panel-year-range'

export {
  DatePickerSharedDefaultValueProps,
  PanelSharedDefaultValueProps,
  PanelRangeSharedDefaultValueProps,
} from './src/props/shared'
