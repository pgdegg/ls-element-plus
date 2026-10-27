import { buildProps, definePropType, iconPropType } from '@element-plus/utils'
import { ArrowRight } from '@element-plus/icons-vue'

import type { IconPropType } from '@element-plus/utils'
import type { CollapseActiveName } from './collapse'

export interface CollapseItemProps {
  /**
   * @description 面板标题
   */
  title?: string
  /**
   * @description 面板的唯一标识
   */
  name?: CollapseActiveName
  /**
   * @description 折叠项图标
   */
  icon?: IconPropType
  /**
   * @description 禁用折叠项
   */
  disabled?: boolean
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const collapseItemPropDefs = buildProps({
  /**
   * @description 面板标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 面板的唯一标识
   */
  name: {
    type: definePropType<CollapseActiveName>([String, Number]),
    default: undefined,
  },
  /**
   * @description 折叠项图标
   */
  icon: {
    type: iconPropType,
    default: ArrowRight,
  },
  /**
   * @description 禁用折叠项
   */
  disabled: Boolean,
} as const)
