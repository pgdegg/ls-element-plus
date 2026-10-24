import { cloneVNode, defineComponent, h } from 'vue'
import { useNamespace } from '@element-plus/hooks/use-namespace'

import type { Slots } from 'vue'

/** 为原生 input 位于触发器内部的控件提供共享组布局。 */
export function createInputGroup(slots: Slots, className: string) {
  return defineComponent({
    inheritAttrs: false,
    setup(_, context) {
      const ns = useNamespace('input')
      return () => {
        const content = context.slots.default?.()
        if (!slots.prepend && !slots.append) {
          return content?.length === 1
            ? cloneVNode(content[0], context.attrs)
            : content
        }
        return h(
          'div',
          {
            ...context.attrs,
            class: [
              context.attrs.class,
              className,
              ns.b(),
              ns.b('group'),
              {
                [ns.bm('group', 'prepend')]: !!slots.prepend,
                [ns.bm('group', 'append')]: !!slots.append,
              },
            ],
          },
          [
            slots.prepend &&
              h('div', { class: ns.be('group', 'prepend') }, slots.prepend()),
            content,
            slots.append &&
              h('div', { class: ns.be('group', 'append') }, slots.append()),
          ]
        )
      }
    },
  })
}
