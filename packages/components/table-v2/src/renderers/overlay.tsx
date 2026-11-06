import type { CSSProperties, PropType } from 'vue'
import type { SimpleFunctionalComponent } from '../types'

export const TableV2OverlayDefaultValueProps = {
  class: {
    type: [String, Array, Object] as PropType<JSX.IntrinsicAttributes['class']>,
  },
  style: { type: [String, Array, Object, Boolean] as PropType<CSSProperties> },
} as const

const Overlay: SimpleFunctionalComponent = (props, { slots }) => {
  return (
    <div class={props.class} style={props.style}>
      {slots.default?.()}
    </div>
  )
}

Overlay.displayName = 'ElTableV2Overlay'

Overlay.props = TableV2OverlayDefaultValueProps

export default Overlay
