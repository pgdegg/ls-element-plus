import { buildProps, definePropType } from '@element-plus/utils'
import { useEmptyValuesProps, useSizeProp } from '@element-plus/hooks'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type { Language } from '@element-plus/locale'
import type { ButtonConfigContext } from '@element-plus/components/button'
import type { CardConfigContext } from '@element-plus/components/card'
import type { DialogConfigContext } from '@element-plus/components/dialog'
import type { MessageConfigContext } from '@element-plus/components/message'
import type { LinkConfigContext } from '@element-plus/components/link'
import type { TableConfigContext } from '@element-plus/components/table'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type ExperimentalFeatures = {
  // TO BE Defined
}

export const configProviderProps = buildProps({
  /**
   * @description 控制用户是否需要无障碍（a11y）功能
   */
  a11y: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 语言环境对象
   */
  locale: {
    type: definePropType<Language>(Object),
  },
  /**
   * @description 全局组件尺寸
   */
  size: useSizeProp,
  /**
   * @description button 相关配置，[见下表](https://element-plus.org/en-US/component/config-provider.html#button-attribute)
   */
  button: {
    type: definePropType<ButtonConfigContext>(Object),
  },
  /**
   * @description card 相关配置，[见下表](https://element-plus.org/en-US/component/config-provider.html#card-attribute)
   */
  card: {
    type: definePropType<CardConfigContext>(Object),
  },
  /**
   * @description dialog 相关配置，[见下表](https://element-plus.org/en-US/component/config-provider.html#dialog-attribute)
   */
  dialog: {
    type: definePropType<DialogConfigContext>(Object),
  },
  /**
   * @description link 相关配置，[见下表](https://element-plus.org/en-US/component/config-provider.html#link-attribute)
   */
  link: {
    type: definePropType<LinkConfigContext>(Object),
  },
  /**
   * @description 待加入的实验阶段功能，所有功能默认设为 false，[见下表](https://element-plus.org/en-US/component/config-provider.html#experimental-features)                                                                            | ^[object]
   */
  experimentalFeatures: {
    type: definePropType<ExperimentalFeatures>(Object),
  },
  /**
   * @description 控制是否处理键盘导航
   */
  keyboardNavigation: {
    type: Boolean,
    default: true,
  },
  /**
   * @description message 相关配置，[见下表](https://element-plus.org/en-US/component/config-provider.html#message-attribute)
   */
  message: {
    type: definePropType<MessageConfigContext>(Object),
  },
  /**
   * @description 全局初始 zIndex
   */
  zIndex: Number,
  /**
   * @description 全局组件 className 前缀（配合 [$namespace](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/mixins/config.scss#L1)）| ^[string]
   */
  namespace: {
    type: String,
    default: 'el',
  },
  /**
   * @description table 相关配置，[见下表](https://element-plus.org/en-US/component/config-provider.html#table-attribute)
   */
  table: {
    type: definePropType<TableConfigContext>(Object),
  },
  ...useEmptyValuesProps,
} as const)
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>
export type ConfigProviderPropsPublic = ExtractPublicPropTypes<
  typeof configProviderProps
>
