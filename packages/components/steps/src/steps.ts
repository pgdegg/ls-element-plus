import { CHANGE_EVENT } from '@element-plus/constants'
import { buildProps, isNumber } from '@element-plus/utils'

import type Steps from './steps.vue'
import type { ExtractPublicPropTypes } from 'vue'

export type StepsStatus = 'wait' | 'process' | 'finish' | 'error' | 'success'

export interface StepsProps {
  /**
   * @description 每个步骤的间距，省略时为响应式。支持百分比。
   * @default ''
   */
  space?: number | string
  /**
   * @description 当前激活步骤
   * @default 0
   */
  active?: number
  /**
   * @description 展示方向
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * @description 标题与描述居中
   */
  alignCenter?: boolean
  /**
   * @description 是否应用简洁主题
   */
  simple?: boolean
  /**
   * @description 末步状态
   * @default 'finish'
   */
  finishStatus?: StepsStatus
  /**
   * @description 当前步骤状态
   * @default 'process'
   */
  processStatus?: StepsStatus
}

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `StepsProps`。
 */
export const stepsProps = buildProps({
  /**
   * @description 每个步骤的间距，省略时为响应式。支持百分比。
   */
  space: {
    type: [Number, String],
    default: '',
  },
  /**
   * @description 当前激活步骤
   */
  active: {
    type: Number,
    default: 0,
  },
  /**
   * @description 展示方向
   */
  direction: {
    type: String,
    default: 'horizontal',
    values: ['horizontal', 'vertical'],
  },
  /**
   * @description 标题与描述居中
   */
  alignCenter: {
    type: Boolean,
  },
  /**
   * @description 是否应用简洁主题
   */
  simple: {
    type: Boolean,
  },
  /**
   * @description 末步状态
   */
  finishStatus: {
    type: String,
    values: ['wait', 'process', 'finish', 'error', 'success'],
    default: 'finish',
  },
  /**
   * @description 当前步骤状态
   */
  processStatus: {
    type: String,
    values: ['wait', 'process', 'finish', 'error', 'success'],
    default: 'process',
  },
} as const)

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `StepsProps`。
 */
export type StepsPropsPublic = ExtractPublicPropTypes<typeof stepsProps>

export const stepsEmits = {
  [CHANGE_EVENT]: (newVal: number, oldVal: number) =>
    [newVal, oldVal].every(isNumber),
}
export type StepsEmits = typeof stepsEmits

export type StepsInstance = InstanceType<typeof Steps> & unknown
