import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPropTypes, ExtractPublicPropTypes } from 'vue'
import type {
  GetDisabledHours,
  GetDisabledMinutes,
  GetDisabledSeconds,
} from '../common/props'

export const disabledTimeListsProps = buildProps({
  /**
   * @description 指定不可选择的小时数组
   */
  disabledHours: {
    type: definePropType<GetDisabledHours>(Function),
  },
  /**
   * @description 指定不可选择的分钟数组
   */
  disabledMinutes: {
    type: definePropType<GetDisabledMinutes>(Function),
  },
  /**
   * @description 指定不可选择的秒数组
   */
  disabledSeconds: {
    type: definePropType<GetDisabledSeconds>(Function),
  },
} as const)

export type DisabledTimeListsProps = ExtractPropTypes<
  typeof disabledTimeListsProps
>
export type DisabledTimeListsPropsPublic = ExtractPublicPropTypes<
  typeof disabledTimeListsProps
>

export const timePanelSharedProps = buildProps({
  visible: Boolean,
  actualVisible: {
    type: Boolean,
    default: undefined,
  },
  format: {
    type: String,
    default: '',
  },
} as const)

export type TimePanelSharedProps = ExtractPropTypes<typeof timePanelSharedProps>
export type TimePanelSharedPropsPublic = ExtractPublicPropTypes<
  typeof timePanelSharedProps
>
