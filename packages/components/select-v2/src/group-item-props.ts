import type { CSSProperties, PropType } from 'vue'

export const SelectV2GroupItemDefaultValueProps = {
  item: {
    type: Object,
    required: true,
  },
  style: {
    type: Object as PropType<CSSProperties>,
  },
  height: Number,
} as const
