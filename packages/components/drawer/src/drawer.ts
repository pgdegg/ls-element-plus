import {
  buildProps,
  definePropType,
  isBoolean,
  isNumber,
  isString,
} from '@element-plus/utils'
import { dialogEmits } from '@element-plus/components/dialog'
import { dialogPropDefs } from '@element-plus/components/dialog/src/dialog'

import type Drawer from './drawer.vue'
import type { DialogProps } from '@element-plus/components/dialog'

export interface DrawerResizableOptions {
  minSize?: number | string
  maxSize?: number | string
}

export interface DrawerProps extends DialogProps {
  /**
   * @description 设置 Drawer 的打开方向
   */
  direction?: 'ltr' | 'rtl' | 'ttb' | 'btt'
  /**
   * @description 是否启用抽屉尺寸调整；对象形式可配置最小和最大尺寸。
   */
  resizable?: boolean | DrawerResizableOptions
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

/** @internal Runtime prop definitions; use the public props interface for types. */
export const drawerPropDefs = buildProps({
  ...dialogPropDefs,
  direction: {
    type: String,
    default: 'rtl',
    values: ['ltr', 'rtl', 'ttb', 'btt'],
  },
  resizable: {
    type: definePropType<boolean | DrawerResizableOptions>([Boolean, Object]),
    default: false,
    validator: (val: boolean | DrawerResizableOptions) => {
      if (isBoolean(val)) return true
      return (
        (val.minSize === undefined ||
          isNumber(val.minSize) ||
          isString(val.minSize)) &&
        (val.maxSize === undefined ||
          isNumber(val.maxSize) ||
          isString(val.maxSize))
      )
    },
  },
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
