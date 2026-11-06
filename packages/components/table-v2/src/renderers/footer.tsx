import type { CSSProperties, FunctionalComponent, PropType } from 'vue'

type FooterRendererProps = {
  class?: JSX.IntrinsicAttributes['class']
  style: CSSProperties
}

export const TableV2FooterRendererDefaultValueProps = {
  class: {
    type: [String, Boolean, Object, Array] as PropType<
      FooterRendererProps['class']
    >,
    default: undefined,
  },
  style: {
    type: [String, Array, Object, Boolean] as PropType<
      FooterRendererProps['style']
    >,
    required: true,
  },
} as const

const Footer: FunctionalComponent<FooterRendererProps> = (props, { slots }) => {
  return (
    <div class={props.class} style={props.style}>
      {slots.default?.()}
    </div>
  )
}

Footer.displayName = 'ElTableV2Footer'

Footer.props = TableV2FooterRendererDefaultValueProps

export default Footer
