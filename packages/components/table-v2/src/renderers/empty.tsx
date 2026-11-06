import { renderSlot } from 'vue'
import ElEmpty from '@element-plus/components/empty'

import type { CSSProperties, FunctionalComponent, PropType } from 'vue'

type EmptyRendererProps = {
  class?: JSX.IntrinsicAttributes['class']
  style?: CSSProperties
}

export const TableV2EmptyRendererDefaultValueProps = {
  class: {
    type: [String, Boolean, Object, Array] as PropType<
      EmptyRendererProps['class']
    >,
    default: undefined,
  },
  style: {
    type: [String, Array, Object, Boolean] as PropType<
      EmptyRendererProps['style']
    >,
  },
} as const

const Footer: FunctionalComponent<EmptyRendererProps> = (props, { slots }) => {
  const defaultSlot = renderSlot(slots, 'default', {}, () => [<ElEmpty />])
  return (
    <div class={props.class} style={props.style}>
      {defaultSlot}
    </div>
  )
}

Footer.displayName = 'ElTableV2Empty'

Footer.props = TableV2EmptyRendererDefaultValueProps

export default Footer
