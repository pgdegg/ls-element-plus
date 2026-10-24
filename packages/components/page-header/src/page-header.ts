import { buildProps, iconPropType } from '@element-plus/utils'
import { Back } from '@element-plus/icons-vue'

import type { ExtractPublicPropTypes } from 'vue'
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

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `PageHeaderProps`。
 */
export const pageHeaderProps = buildProps({
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

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `PageHeaderProps`。
 */
export type PageHeaderPropsPublic = ExtractPublicPropTypes<
  typeof pageHeaderProps
>

export const pageHeaderEmits = {
  back: () => true,
}
export type PageHeaderEmits = typeof pageHeaderEmits

export type PageHeaderInstance = InstanceType<typeof PageHeader> & unknown
