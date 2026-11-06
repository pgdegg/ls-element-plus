import { computed, defineComponent, h } from 'vue'
import { buildProps, definePropType, isString } from '@element-plus/utils'
import { useNamespace } from '@element-plus/hooks'

import type {
  CSSProperties,
  ExtractPropTypes,
  ExtractPublicPropTypes,
} from 'vue'

export const SliderMarkerDefaultValueProps = buildProps({
  mark: {
    type: definePropType<
      | string
      | {
          style: CSSProperties
          label: any
        }
    >([String, Object]),
    default: undefined,
  },
} as const)
export type SliderMarkerProps = ExtractPropTypes<
  typeof SliderMarkerDefaultValueProps
>
export type SliderMarkerPropsPublic = ExtractPublicPropTypes<
  typeof SliderMarkerDefaultValueProps
>

export default defineComponent({
  name: 'ElSliderMarker',
  props: SliderMarkerDefaultValueProps,
  setup(props) {
    const ns = useNamespace('slider')
    const label = computed(() => {
      return isString(props.mark) ? props.mark : props.mark!.label
    })
    const style = computed(() =>
      isString(props.mark) ? undefined : props.mark!.style
    )

    return () =>
      h(
        'div',
        {
          class: ns.e('marks-text'),
          style: style.value,
        },
        label.value
      )
  },
})
