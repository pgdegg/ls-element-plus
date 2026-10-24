import { buildProps, definePropType, mutable } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type { TabPaneName, TabsPaneContext } from './constants'
import type TabBar from './tab-bar.vue'

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TabBarProps`。
 */
export const tabBarProps = buildProps({
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

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TabBarProps`。
 */
export type TabBarPropsPublic = ExtractPublicPropTypes<typeof tabBarProps>
export type TabBarInstance = InstanceType<typeof TabBar> & unknown
