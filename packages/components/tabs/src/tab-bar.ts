import { buildProps, definePropType, mutable } from '@element-plus/utils'

import type { TabPaneName, TabsPaneContext } from './constants'
import type TabBar from './tab-bar.vue'

/** @internal Runtime prop definitions; use the public props interface for types. */
export const tabBarPropDefs = buildProps({
  active: {
    type: Boolean,
    default: true,
  },
  tabs: {
    type: definePropType<TabsPaneContext[]>(Array),
    default: () => mutable([] as const),
  },
  tabRefs: {
    type: definePropType<{ [key: TabPaneName]: HTMLDivElement }>(Object),
    default: () => mutable({} as const),
  },
} as const)

export type TabBarProps = {
  active?: boolean
  tabs?: TabsPaneContext[]
  tabRefs?: { [key: TabPaneName]: HTMLDivElement }
}
export type TabBarInstance = InstanceType<typeof TabBar> & unknown
