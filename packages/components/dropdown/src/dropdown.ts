import { buildProps, definePropType, iconPropType } from '@element-plus/utils'
import { EVENT_CODE } from '@element-plus/constants'
import { tooltipContentPropDefs } from '@element-plus/components/tooltip/src/content'
import { tooltipTriggerPropDefs } from '@element-plus/components/tooltip/src/trigger'
import { roleTypes } from '@element-plus/components/popper'

import type { TooltipTriggerType } from '@element-plus/components/tooltip'
import type { Placement } from '@element-plus/components/popper'
import type { Options } from '@popperjs/core'
import type { ButtonProps, ButtonType } from '@element-plus/components/button'
import type { ComponentInternalInstance, ComputedRef } from 'vue'
import type { Arrayable } from '@element-plus/utils'

export interface IElDropdownInstance {
  instance?: ComponentInternalInstance
  dropdownSize?: ComputedRef<string>
  handleClick?: () => void
  commandHandler?: (...arg: any[]) => void
  show?: () => void
  hide?: () => void
  trigger?: ComputedRef<string>
  hideOnClick?: ComputedRef<boolean>
  triggerElm?: ComputedRef<HTMLButtonElement | null>
}

export const dropdownProps = buildProps({
  /**
   * @description 触发方式
   */
  trigger: {
    ...tooltipTriggerPropDefs.trigger,
    type: definePropType<Arrayable<Exclude<TooltipTriggerType, 'focus'>>>([
      String,
      Array,
    ]),
  },
  triggerKeys: {
    type: definePropType<string[]>(Array),
    default: () => [
      EVENT_CODE.enter,
      EVENT_CODE.numpadEnter,
      EVENT_CODE.space,
      EVENT_CODE.down,
    ],
  },
  /**
   * @description 是否启用虚拟触发
   */
  virtualTriggering: tooltipTriggerPropDefs.virtualTriggering,
  /**
   * @description 下拉菜单所依附的参考元素
   */
  virtualRef: tooltipTriggerPropDefs.virtualRef,
  /**
   * @description Tooltip 主题，内置主题：`dark` / `light`
   */
  effect: {
    ...tooltipContentPropDefs.effect,
    default: 'light',
  },
  /**
   * @description 菜单按钮类型，参考 `Button` 组件，仅在 `split-button` 为 true 时生效
   */
  type: {
    type: definePropType<ButtonType>(String),
  },
  /**
   * @description 弹出菜单的位置
   */
  placement: {
    type: definePropType<Placement>(String),
    default: 'bottom',
  },
  /**
   * @description [popper.js](https://popper.js.org/docs/v2/) 参数
   */
  popperOptions: {
    type: definePropType<Partial<Options>>(Object),
    default: () => ({}),
  },
  id: String,
  /**
   * @description 菜单尺寸，同样作用于 split 按钮
   */
  size: {
    type: String,
    default: '',
  },
  /**
   * @description 是否显示按钮组
   */
  splitButton: Boolean,
  /**
   * @description 点击菜单项后是否隐藏菜单
   */
  hideOnClick: {
    type: Boolean,
    default: true,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  /**
   * @description tooltip 内容是否带箭头
   */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 显示下拉菜单前的延迟时间（仅在 trigger 为 `hover` 时生效）
   */
  showTimeout: {
    type: Number,
    default: 150,
  },
  /**
   * @description 隐藏下拉菜单前的延迟时间（仅在 trigger 为 `hover` 时生效）
   */
  hideTimeout: {
    type: Number,
    default: 150,
  },
  /**
   * @description Dropdown 的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
   */
  tabindex: {
    type: definePropType<number | string>([Number, String]),
    default: 0,
  },
  /**
   * @description 菜单最大高度
   */
  maxHeight: {
    type: definePropType<number | string>([Number, String]),
    default: '',
  },
  /**
   * @description Dropdown 下拉菜单的自定义类名
   */
  popperClass: tooltipContentPropDefs.popperClass,
  /**
   * @description Dropdown 下拉菜单的自定义样式
   */
  popperStyle: tooltipContentPropDefs.popperStyle,
  /**
   * @description 是否禁用
   */
  disabled: Boolean,
  /**
   * @description 下拉菜单的 ARIA role 属性。根据使用场景，你可能希望将其改为 'navigation'
   */
  role: {
    type: String,
    values: roleTypes,
    default: 'menu',
  },
  buttonProps: {
    type: definePropType<Partial<ButtonProps>>(Object),
  },
  /**
   * @description 下拉弹层是否传送到 body
   */
  teleported: tooltipContentPropDefs.teleported,
  /**
   * @description 下拉内容追加到哪个元素
   */
  appendTo: tooltipContentPropDefs.appendTo,
  /**
   * @description 当下拉菜单未激活且 `persistent` 为 `false` 时，菜单将被销毁
   */
  persistent: {
    type: Boolean,
    default: true,
  },
} as const)

export const dropdownItemProps = buildProps({
  /**
   * @description 派发给 Dropdown `command` 回调的命令
   */
  command: {
    type: [Object, String, Number],
    default: () => ({}),
  },
  /**
   * @description 该项是否禁用
   */
  disabled: Boolean,
  /**
   * @description 是否显示分割线
   */
  divided: Boolean,
  textValue: String,
  /**
   * @description 自定义图标
   */
  icon: {
    type: iconPropType,
  },
} as const)

export const dropdownMenuProps = buildProps({
  onKeydown: { type: definePropType<(e: KeyboardEvent) => void>(Function) },
})

export const FIRST_KEYS = [
  EVENT_CODE.down,
  EVENT_CODE.pageDown,
  EVENT_CODE.home,
]

export const LAST_KEYS = [EVENT_CODE.up, EVENT_CODE.pageUp, EVENT_CODE.end]

export const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS]
