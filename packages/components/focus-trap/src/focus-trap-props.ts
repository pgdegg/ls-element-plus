import type { PropType } from 'vue'

export const FocusTrapDefaultValueProps = {
  loop: Boolean,
  trapped: Boolean,
  focusTrapEl: Object as PropType<HTMLElement>,
  focusStartEl: {
    type: [Object, String] as PropType<'container' | 'first' | HTMLElement>,
    default: 'first',
  },
} as const
