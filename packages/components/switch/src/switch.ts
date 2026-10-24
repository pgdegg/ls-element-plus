import {
  buildProps,
  definePropType,
  iconPropType,
  isBoolean,
  isNumber,
  isString,
  isValidComponentSize,
} from '@element-plus/utils'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '@element-plus/constants'
import { useAriaProps } from '@element-plus/hooks'

import type { ComponentSize } from '@element-plus/constants'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { IconPropType } from '@element-plus/utils'
import type Switch from './switch.vue'

export interface SwitchProps {
  /** 使用方形开关轨道与滑钮。 */
  square?: boolean
  /**
   * @description 绑定值，应等于 `active-value` 或 `inactive-value`，默认为 `boolean` 类型
   */
  modelValue?: boolean | string | number
  /**
   * @description Switch 是否禁用
   */
  disabled?: boolean
  /**
   * @description Switch 是否处于加载状态
   */
  loading?: boolean
  /**
   * @description Switch 的尺寸
   */
  size?: ComponentSize
  /**
   * @description Switch 的宽度
   */
  width?: string | number
  /**
   * @description 是否在圆点内显示图标或文字；文字仅渲染第一个字符
   */
  inlinePrompt?: boolean
  /**
   * @description `off` 状态下滑钮中显示的图标组件
   */
  inactiveActionIcon?: IconPropType
  /**
   * @description `on` 状态下滑钮中显示的图标组件
   */
  activeActionIcon?: IconPropType
  /**
   * @description `on` 状态时显示的图标组件，覆盖 `active-text`
   */
  activeIcon?: IconPropType
  /**
   * @description `off` 状态时显示的图标组件，覆盖 `inactive-text`
   */
  inactiveIcon?: IconPropType
  /**
   * @description `on` 状态时显示的文字
   */
  activeText?: string
  /**
   * @description `off` 状态时显示的文字
   */
  inactiveText?: string
  /**
   * @description `on` 状态时的开关值
   */
  activeValue?: boolean | string | number
  /**
   * @description `off` 状态时的开关值
   */
  inactiveValue?: boolean | string | number
  /**
   * @description Switch 的 input name
   */
  name?: string
  /**
   * @description 是否触发表单校验
   */
  validateEvent?: boolean
  /**
   * @description 开关状态切换前的 before-change 钩子。返回 `false`，或返回 `Promise` 且被拒绝时，将阻止切换
   */
  beforeChange?: () => Promise<boolean> | boolean
  /**
   * @description input 的 id
   */
  id?: string
  /**
   * @description input 的 tabindex
   */
  tabindex?: string | number
  /**
   * @description 原生 `aria-label` 属性
   */
  ariaLabel?: string
}

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `SwitchProps`。
 */
export const switchProps = buildProps({
  square: Boolean,
  /**
   * @description 绑定值，应等于 `active-value` 或 `inactive-value`，默认为 `boolean` 类型
   */
  modelValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  /**
   * @description Switch 是否禁用
   */
  disabled: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description Switch 是否处于加载状态
   */
  loading: Boolean,
  /**
   * @description Switch 的尺寸
   */
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  /**
   * @description Switch 的宽度
   */
  width: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description 是否在圆点内显示图标或文字；文字仅渲染第一个字符
   */
  inlinePrompt: Boolean,
  /**
   * @description `off` 状态下滑钮中显示的图标组件
   */
  inactiveActionIcon: {
    type: iconPropType,
  },
  /**
   * @description `on` 状态下滑钮中显示的图标组件
   */
  activeActionIcon: {
    type: iconPropType,
  },
  /**
   * @description `on` 状态时显示的图标组件，覆盖 `active-text`
   */
  activeIcon: {
    type: iconPropType,
  },
  /**
   * @description `off` 状态时显示的图标组件，覆盖 `inactive-text`
   */
  inactiveIcon: {
    type: iconPropType,
  },
  /**
   * @description `on` 状态时显示的文字
   */
  activeText: {
    type: String,
    default: '',
  },
  /**
   * @description `off` 状态时显示的文字
   */
  inactiveText: {
    type: String,
    default: '',
  },
  /**
   * @description `on` 状态时的开关值
   */
  activeValue: {
    type: [Boolean, String, Number],
    default: true,
  },
  /**
   * @description `off` 状态时的开关值
   */
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false,
  },
  /**
   * @description Switch 的 input name
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * @description 是否触发表单校验
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 开关状态切换前的 before-change 钩子。返回 `false`，或返回 `Promise` 且被拒绝时，将阻止切换
   */
  beforeChange: {
    type: definePropType<() => Promise<boolean> | boolean>(Function),
  },
  /**
   * @description input 的 id
   */
  id: String,
  /**
   * @description input 的 tabindex
   */
  tabindex: {
    type: [String, Number],
  },
  ...useAriaProps(['ariaLabel']),
} as const)

/**
 * @deprecated 将于 3.0.0 之后移除，请改用 `SwitchProps`。
 */
export type SwitchPropsPublic = ExtractPublicPropTypes<typeof switchProps>

export const switchEmits = {
  [UPDATE_MODEL_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
  [CHANGE_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
  [INPUT_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
}
export type SwitchEmits = typeof switchEmits

export type SwitchInstance = InstanceType<typeof Switch> & unknown
