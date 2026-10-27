import { buildProps, definePropType } from '@element-plus/utils'

import type { SVGAttributes } from 'vue'
import type Progress from './progress.vue'

export type ProgressColor = { color: string; percentage: number }
export type ProgressFn = (percentage: number) => string

export interface ProgressProps {
  /**
   * @description 进度条类型
   */
  type?: 'line' | 'circle' | 'dashboard'
  /**
   * @description 百分比，必填
   */
  percentage?: number
  /**
   * @description 进度条当前状态
   */
  status?: '' | 'success' | 'exception' | 'warning'
  /**
   * @description 设置为不确定进度
   */
  indeterminate?: boolean
  /**
   * @description 控制不确定进度或条纹流动进度的动画时长
   */
  duration?: number
  /**
   * @description 进度条宽度
   */
  strokeWidth?: number
  /**
   * @description 路径末端的形状，可选 butt/circle/dashboard 类型
   */
  strokeLinecap?: NonNullable<SVGAttributes['stroke-linecap']>
  /**
   * @description 是否将百分比显示在进度条内部，仅在 `type` 为 'line' 时生效
   */
  textInside?: boolean
  /**
   * @description 圆形进度条的画布宽度
   */
  width?: number
  /**
   * @description 是否显示百分比
   */
  showText?: boolean
  /**
   * @description 进度条背景色，会覆盖 `status` prop
   */
  color?: string | ProgressColor[] | ProgressFn
  /**
   * @description 在进度条颜色上叠加条纹
   */
  striped?: boolean
  /**
   * @description 使条纹流动
   */
  stripedFlow?: boolean
  /**
   * @description 自定义文本格式
   */
  format?: ProgressFn
}

/** @internal Runtime prop definitions; use the public props interface for types. */
export const progressPropDefs = buildProps({
  /**
   * @description 进度条类型
   */
  type: {
    type: String,
    default: 'line',
    values: ['line', 'circle', 'dashboard'],
  },
  /**
   * @description 百分比，必填
   */
  percentage: {
    type: Number,
    default: 0,
    validator: (val: number): boolean => val >= 0 && val <= 100,
  },
  /**
   * @description 进度条当前状态
   */
  status: {
    type: String,
    default: '',
    values: ['', 'success', 'exception', 'warning'],
  },
  /**
   * @description 设置为不确定进度
   */
  indeterminate: Boolean,
  /**
   * @description 控制不确定进度或条纹流动进度的动画时长
   */
  duration: {
    type: Number,
    default: 3,
  },
  /**
   * @description 进度条宽度
   */
  strokeWidth: {
    type: Number,
    default: 6,
  },
  /**
   * @description 路径末端的形状，可选 butt/circle/dashboard 类型
   */
  strokeLinecap: {
    type: definePropType<NonNullable<SVGAttributes['stroke-linecap']>>(String),
    default: 'round',
  },
  /**
   * @description 是否将百分比显示在进度条内部，仅在 `type` 为 'line' 时生效
   */
  textInside: Boolean,
  /**
   * @description 圆形进度条的画布宽度
   */
  width: {
    type: Number,
    default: 126,
  },
  /**
   * @description 是否显示百分比
   */
  showText: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 进度条背景色，会覆盖 `status` prop
   */
  color: {
    type: definePropType<string | ProgressColor[] | ProgressFn>([
      String,
      Array,
      Function,
    ]),
    default: '',
  },
  /**
   * @description 在进度条颜色上叠加条纹
   */
  striped: Boolean,
  /**
   * @description 使条纹流动
   */
  stripedFlow: Boolean,
  /**
   * @description 自定义文本格式
   */
  format: {
    type: definePropType<ProgressFn>(Function),
    default: (percentage: number): string => `${percentage}%`,
  },
} as const)
export type ProgressInstance = InstanceType<typeof Progress> & unknown
