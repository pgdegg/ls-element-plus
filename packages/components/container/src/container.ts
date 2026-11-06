import type { PropType } from 'vue'

export interface ContainerProps {
  /**
   * @description 子元素的布局方向
   */
  direction?: 'horizontal' | 'vertical'
}

export const ContainerDefaultValueProps = {
  direction: { type: String as PropType<ContainerProps['direction']> },
} as const
