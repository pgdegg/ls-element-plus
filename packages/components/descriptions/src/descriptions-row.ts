import { buildProps, definePropType } from '@element-plus/utils'

import type { DescriptionItemVNode } from './description-item'

export interface DescriptionsRowProps {
  row?: DescriptionItemVNode[]
}

/**
 * @deprecated 3.0.0 后移除，请改用 `DescriptionsRowProps`。
 */
export const descriptionsRowProps = buildProps({
  row: {
    type: definePropType<DescriptionItemVNode[]>(Array),
    default: () => [],
  },
} as const)
