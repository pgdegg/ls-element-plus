import { buildProps } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type Splitter from './splitter.vue'
import type { Layout } from './type'

export interface SplitterProps {
  layout?: Layout
  lazy?: boolean
}

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `SplitterProps`。
 */
export const splitterProps = buildProps({
  layout: {
    type: String,
    default: 'horizontal',
    values: ['horizontal', 'vertical'] as const,
  },
  lazy: Boolean,
} as const)

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `SplitterProps`。
 */
export type SplitterPropsPublic = ExtractPublicPropTypes<typeof splitterProps>
export type SplitterInstance = InstanceType<typeof Splitter> & unknown

/* eslint-disable @typescript-eslint/no-unused-vars */
export const splitterEmits = {
  resizeStart: (index: number, sizes: number[]) => true,
  resize: (index: number, sizes: number[]) => true,
  resizeEnd: (index: number, sizes: number[]) => true,
  collapse: (index: number, type: 'start' | 'end', sizes: number[]) => true,
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export type SplitterEmits = typeof splitterEmits
