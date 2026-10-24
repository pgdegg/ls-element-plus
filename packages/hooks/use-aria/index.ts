import { pick } from 'lodash-unified'
import { buildProps } from '@element-plus/utils'

export interface AriaProps {
  /**
   * @description 原生 `aria-label` 属性
   */
  ariaLabel?: string
  /**
   * @description 原生 `aria-orientation` 属性
   */
  ariaOrientation?: 'horizontal' | 'vertical' | 'undefined'
  /**
   * @description 原生 `aria-controls` 属性
   */
  ariaControls?: string
}

/**
 * @deprecated 自 3.0.0 后移除，请使用 `AriaProps`。
 */
export const ariaProps = buildProps({
  /**
   * @description 原生 `aria-label` 属性
   */
  ariaLabel: String,
  /**
   * @description 原生 `aria-orientation` 属性
   */
  ariaOrientation: {
    type: String,
    values: ['horizontal', 'vertical', 'undefined'],
  },
  /**
   * @description 原生 `aria-controls` 属性
   */
  ariaControls: String,
})

export const useAriaProps = <T extends keyof typeof ariaProps>(
  arias: Array<T>
) => {
  return pick<typeof ariaProps, T>(ariaProps, arias)
}
