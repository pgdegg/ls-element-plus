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

/** @internal Runtime prop definitions; use the public props interface for types. */
export const ariaPropDefs = buildProps({
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

export const useAriaProps = <T extends keyof typeof ariaPropDefs>(
  arias: Array<T>
) => {
  return pick<typeof ariaPropDefs, T>(ariaPropDefs, arias)
}
