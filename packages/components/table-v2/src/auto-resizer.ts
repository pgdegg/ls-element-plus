import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'

type AutoResizeHandler = (event: { height: number; width: number }) => void

export const AutoResizerDefaultValueProps = buildProps({
  disableWidth: Boolean,
  disableHeight: Boolean,
  onResize: {
    type: definePropType<AutoResizeHandler>(Function),
  },
} as const)

export type AutoResizerProps = ExtractPropTypes<
  typeof AutoResizerDefaultValueProps
>
export type AutoResizerPropsPublic = ExtractPublicPropTypes<
  typeof AutoResizerDefaultValueProps
>
