import { defineComponent } from 'vue'
import { useNamespace } from '@element-plus/hooks'
import { AutoResizerDefaultValueProps } from '../auto-resizer'
import { useAutoResize } from '../composables'

const AutoResizer = defineComponent({
  name: 'ElAutoResizer',
  props: AutoResizerDefaultValueProps,
  setup(props, { slots }) {
    const ns = useNamespace('auto-resizer')
    const { height, width, sizer } = useAutoResize(props)
    const style = {
      width: '100%',
      height: '100%',
    }

    return () => {
      return (
        <div ref={sizer} class={ns.b()} style={style}>
          {slots.default?.({
            height: height.value,
            width: width.value,
          })}
        </div>
      )
    }
  },
})

export default AutoResizer
