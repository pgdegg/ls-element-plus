import { createVNode, defineComponent, h, renderSlot } from 'vue'
import { PatchFlags, buildProps, definePropType } from '@element-plus/utils'
import { useNamespace, useSameTarget } from '@element-plus/hooks'

import type {
  CSSProperties,
  ExtractPropTypes,
  ExtractPublicPropTypes,
} from 'vue'
import type { ClassValue, ZIndexType } from '@element-plus/utils'

export const overlayProps = buildProps({
  mask: {
    type: Boolean,
    default: true,
  },
  customMaskEvent: Boolean,
  overlayClass: {
    type: definePropType<ClassValue>([String, Array, Object, Boolean]),
    default: undefined,
  },
  zIndex: {
    type: definePropType<ZIndexType>([String, Number]),
  },
} as const)
export type OverlayProps = ExtractPropTypes<typeof overlayProps>
export type OverlayPropsPublic = ExtractPublicPropTypes<typeof overlayProps>

export const overlayEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type OverlayEmits = typeof overlayEmits

const BLOCK = 'overlay'

export default defineComponent({
  name: 'ElOverlay',

  props: overlayProps,
  emits: overlayEmits,

  setup(props, { slots, emit }) {
    // 此 prop 无需响应式，因为当它与全局
    // 组件一起渲染时，这将是一个恒定标志。
    const ns = useNamespace(BLOCK)

    const onMaskClick = (e: MouseEvent) => {
      emit('click', e)
    }

    const { onClick, onMousedown, onMouseup } = useSameTarget(
      props.customMaskEvent ? undefined : onMaskClick
    )

    // 在此初始化
    return () => {
      // 当 vnode 遇到相同结构但变化触发方式不同时
      // 它不会自动更新，因此我们直接使用 h 函数来管理更新
      return props.mask
        ? createVNode(
            'div',
            {
              class: [ns.b(), props.overlayClass],
              style: {
                zIndex: props.zIndex,
              },
              onClick,
              onMousedown,
              onMouseup,
            },
            [renderSlot(slots, 'default')],
            PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS,
            ['onClick', 'onMouseup', 'onMousedown']
          )
        : h(
            'div',
            {
              class: props.overlayClass,
              style: {
                zIndex: props.zIndex,
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              } as CSSProperties,
            },
            [renderSlot(slots, 'default')]
          )
    }
  },
})
