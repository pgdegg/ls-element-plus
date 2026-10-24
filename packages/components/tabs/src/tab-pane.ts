import { buildProps } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type TabPane from './tab-pane.vue'

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TabPaneProps`。
 */
export const tabPaneProps = buildProps({
  /**
   * @description tab 的标题
   */
  label: {
    type: String,
    default: '',
  },
  /**
   * @description 与 Tabs 的 name 对应的标识符，即 tab-pane 的别名；默认为 tab-pane 在序列中的序号，例如第一个 tab-pane 为 '0'
   */
  name: {
    type: [String, Number],
  },
  /**
   * @description Tab 是否可关闭
   */
  closable: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description Tab 是否禁用
   */
  disabled: Boolean,
  /**
   * @description 将 tab 固定在导航区域的开头或末尾
   */
  fixed: {
    type: String,
    values: ['left', 'right'],
  },
  /**
   * @description Tab 是否懒渲染
   */
  lazy: Boolean,
} as const)

export type TabPaneProps = {
  /**
   * @description tab 的标题
   */
  label?: string
  /**
   * @description 与 Tabs 的 name 对应的标识符，即 tab-pane 的别名；默认为 tab-pane 在序列中的序号，例如第一个 tab-pane 为 '0'
   */
  name?: string | number
  /**
   * @description Tab 是否可关闭
   */
  closable?: boolean
  /**
   * @description Tab 是否禁用
   */
  disabled?: boolean
  /**
   * @description 将 tab 固定在导航区域的开头或末尾
   */
  fixed?: 'left' | 'right'
  /**
   * @description Tab 是否懒渲染
   */
  lazy?: boolean
}

/**
 * @deprecated 已在 3.0.0 版本后移除，请使用 `TabPaneProps`。
 */
export type TabPanePropsPublic = ExtractPublicPropTypes<typeof tabPaneProps>

export type TabPaneInstance = InstanceType<typeof TabPane> & unknown
