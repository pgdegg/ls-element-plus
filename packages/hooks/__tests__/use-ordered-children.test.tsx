import { defineComponent, getCurrentInstance, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { useOrderedChildren } from '../use-ordered-children'

const mountChildren = (
  options: { render?: boolean; removeBeforeMount?: boolean } = {}
) => {
  const vnode = h('div')
  const child = { uid: 1, getVnode: () => vnode }
  const render = vi.fn(() => (options.render === false ? [] : [vnode]))
  let ordered!: ReturnType<typeof useOrderedChildren<typeof child>>
  const wrapper = mount(
    defineComponent({
      setup() {
        ordered = useOrderedChildren(getCurrentInstance()!, 'Child')
        ordered.addChild(child)
        if (options.removeBeforeMount) ordered.removeChild(child)
        return () =>
          h('div', [h(ordered.ChildrenSorter, null, { default: render })])
      },
    })
  )
  return { wrapper, ordered, child, vnode, render }
}

describe('useOrderedChildren', () => {
  it.each(['moved', 'detached', 'unchanged'])(
    'unregisters a %s node and clears its original registration',
    async (state) => {
      const { wrapper, ordered, child, vnode, render } = mountChildren()
      const parent = wrapper.element
      const node = vnode.el as Node
      if (state === 'moved') document.createElement('div').appendChild(node)
      if (state === 'detached') parent.removeChild(node)

      expect(() => ordered.removeChild(child)).not.toThrow()
      expect(() => ordered.removeChild(child)).not.toThrow()

      // A removed node must no longer invalidate ordering in its original parent.
      await nextTick()
      render.mockClear()
      parent.insertBefore(node, null)
      await nextTick()
      expect(render).not.toHaveBeenCalled()
      wrapper.unmount()
    }
  )

  it('unregisters a child whose vnode has no element', () => {
    const { wrapper, ordered, child } = mountChildren({ render: false })
    expect(() => ordered.removeChild(child)).not.toThrow()
    wrapper.unmount()
  })

  it('does not register a child removed before mounting', async () => {
    const { wrapper, ordered, child, vnode, render } = mountChildren({
      removeBeforeMount: true,
    })
    await nextTick()
    render.mockClear()
    wrapper.element.insertBefore(vnode.el as Node, null)
    await nextTick()
    expect(render).not.toHaveBeenCalled()
    expect(() => ordered.removeChild(child)).not.toThrow()
    wrapper.unmount()
  })
})
