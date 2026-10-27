import { buildProps, definePropType } from '@element-plus/utils'

import type { DescriptionItemVNode } from './description-item'

export interface DescriptionsRowProps {
  row?: DescriptionItemVNode[]
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const descriptionsRowPropDefs = buildProps({
  row: {
    type: definePropType<DescriptionItemVNode[]>(Array),
    default: () => [],
  },
} as const)
