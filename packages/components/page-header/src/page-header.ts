import { buildProps, iconPropType } from '@element-plus/utils'
import { Back } from '@element-plus/icons-vue'

import type { IconPropType } from '@element-plus/utils'
import type PageHeader from './page-header.vue'

export interface PageHeaderProps {
  /**
   * @description 页头的图标组件
   */
  icon?: IconPropType
  /**
   * @description 页头的主标题
   */
  title?: string
  /**
   * @description 页头的内容
   */
  content?: string
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const pageHeaderPropDefs = buildProps({
  /**
   * @description 页头的图标组件
   */
  icon: {
    type: iconPropType,
    default: () => Back,
  },
  /**
   * @description 页头的主标题
   */
  title: String,
  /**
   * @description 页头的内容
   */
  content: {
    type: String,
    default: '',
  },
} as const)

export const pageHeaderEmits = {
  back: () => true,
}
export type PageHeaderEmits = typeof pageHeaderEmits

export type PageHeaderInstance = InstanceType<typeof PageHeader> & unknown
