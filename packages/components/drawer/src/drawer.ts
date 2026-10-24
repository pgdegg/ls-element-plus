import { buildProps } from '@element-plus/utils'
import { dialogEmits, dialogProps } from '@element-plus/components/dialog'

import type { ExtractPublicPropTypes } from 'vue'
import type Drawer from './drawer.vue'
import type { DialogProps } from '@element-plus/components/dialog'

export interface DrawerProps extends DialogProps {
  /**
   * @description 设置 Drawer 的打开方向
   */
  direction?: 'ltr' | 'rtl' | 'ttb' | 'btt'
  /**
   * @description 是否为抽屉启用可调大小功能
   */
  resizable?: boolean
  /**
   * @description Drawer 尺寸；使用 number 类型时以像素为单位，使用 string 类型时请传入 'x%'；否则将被解释为 number 类型
   */
  size?: string | number
  /**
   * @description 可以移除抽屉的标题，让抽屉在屏幕上拥有更多空间。若希望可被访问，必须设置 title 属性。
   */
  withHeader?: boolean
  /**
   * @description 遮罩层的淡入淡出动画开关
   */
  modalFade?: boolean
  /**
   * @description 帮助屏幕阅读器等辅助技术识别内容层级
   */
  headerAriaLevel?: string
}

/**
 * @deprecated 3.0.0 后移除，请改用 `DrawerProps`。
 */
export const drawerProps = buildProps({
  ...dialogProps,
  direction: {
    type: String,
    default: 'rtl',
    values: ['ltr', 'rtl', 'ttb', 'btt'],
  },
  resizable: Boolean,
  size: {
    type: [String, Number],
    default: '30%',
  },
  withHeader: {
    type: Boolean,
    default: true,
  },
  modalFade: {
    type: Boolean,
    default: true,
  },
  headerAriaLevel: {
    type: String,
    default: '2',
  },
} as const)

/**
 * @deprecated 3.0.0 后移除，请改用 `DrawerProps`。
 */
export type DrawerPropsPublic = ExtractPublicPropTypes<typeof drawerProps>

export const drawerEmits = {
  ...dialogEmits,
  'resize-start': (evt: MouseEvent, size: number) =>
    evt instanceof MouseEvent && typeof size === 'number',
  resize: (evt: MouseEvent, size: number) =>
    evt instanceof MouseEvent && typeof size === 'number',
  'resize-end': (evt: MouseEvent, size: number) =>
    evt instanceof MouseEvent && typeof size === 'number',
}

export type DrawerEmits = typeof drawerEmits

export type DrawerInstance = InstanceType<typeof Drawer> & unknown
