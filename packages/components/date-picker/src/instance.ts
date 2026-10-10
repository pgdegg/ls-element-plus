import type DatePicker from './date-picker'

export type DatePickerInstance = InstanceType<typeof DatePicker> &
  DatePickerExpose

export type DatePickerExpose = {
  readonly inputElement: HTMLInputElement | undefined
  focus: () => void
  blur: () => void
  handleOpen: () => void
  handleClose: () => void
}
