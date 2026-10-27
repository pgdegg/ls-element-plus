import { buildProps } from '@element-plus/utils'

import type SplitterPanel from './split-panel.vue'

export interface SplitterPanelProps {
  min?: string | number
  max?: string | number
  size?: string | number
  resizable?: boolean
  collapsible?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const splitterPanelPropDefs = buildProps({
  min: {
    type: [String, Number],
  },
  max: {
    type: [String, Number],
  },
  size: {
    type: [String, Number],
  },
  resizable: {
    type: Boolean,
    default: true,
  },
  collapsible: Boolean,
} as const)
export type SplitterPanelInstance = InstanceType<typeof SplitterPanel> & unknown

export const splitterPanelEmits = {
  'update:size': (value: number | string) =>
    typeof value === 'number' || typeof value === 'string',
}

export type SplitterPanelEmits = typeof splitterPanelEmits
