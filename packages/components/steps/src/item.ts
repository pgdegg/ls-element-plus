import { buildProps, iconPropType } from '@element-plus/utils'

import type { IconPropType } from '@element-plus/utils'
import type Step from './item.vue'

export interface StepProps {
  /**
   * @description 步骤标题
   */
  title?: string
  /**
   * @description 步骤自定义图标。图标也可通过具名插槽传入
   */
  icon?: IconPropType
  /**
   * @description 步骤描述
   * @default ''
   */
  description?: string
  /**
   * @description 当前状态。未配置时由 Steps 自动设置。
   * @default ''
   */
  status?: '' | 'wait' | 'process' | 'finish' | 'error' | 'success'
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const stepPropDefs = buildProps({
  /**
   * @description 步骤标题
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 步骤自定义图标。图标也可通过具名插槽传入
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description 步骤描述
   */
  description: {
    type: String,
    default: '',
  },
  /**
   * @description 当前状态。未配置时由 Steps 自动设置。
   */
  status: {
    type: String,
    values: ['', 'wait', 'process', 'finish', 'error', 'success'],
    default: '',
  },
} as const)

export type StepInstance = InstanceType<typeof Step> & unknown
