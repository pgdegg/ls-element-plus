import { KeepAlive, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Scrollbar from '../src/scrollbar.vue'
import Thumb from '../src/thumb.vue'

const setSize = (element: Element, horizontal = false, overflow = true) => {
  Object.defineProperties(element, {
    clientHeight: { configurable: true, value: 100 },
    clientWidth: { configurable: true, value: 100 },
    scrollHeight: {
      configurable: true,
      value: overflow && !horizontal ? 300 : 100,
    },
    scrollWidth: {
      configurable: true,
      value: overflow && horizontal ? 300 : 100,
    },
  })
}

describe('嵌套滚动条显示归属', () => {
  const create = async () => {
    const wrapper = mount(
      () => (
        <Scrollbar always>
          <Scrollbar>
            <span class="content" />
          </Scrollbar>
        </Scrollbar>
      ),
      { global: { stubs: { transition: true } } }
    )
    await nextTick()
    const [outer, inner] = wrapper.findAllComponents(Scrollbar)
    setSize(outer.vm.wrapRef!)
    setSize(inner.vm.wrapRef!)
    const bars = (component: typeof inner) =>
      component
        .findAllComponents(Thumb)
        .slice(-2)
        .map((thumb) => thumb.find('.el-scrollbar__bar'))
    return { wrapper, outer, inner, bars }
  }

  test('移入内层优先显示内层，边界交给外层且不阻止原生滚动', async () => {
    const { wrapper, outer, inner, bars } = await create()
    await inner.find('.content').trigger('mouseover')
    expect(bars(inner)[0].isVisible()).toBe(true)
    expect(
      outer
        .findAllComponents(Thumb)
        .slice(-2)
        .map((thumb) => thumb.find('.el-scrollbar__bar'))[0]
        .isVisible()
    ).toBe(false)

    inner.vm.wrapRef!.scrollTop = 200
    const wheel = new WheelEvent('wheel', {
      bubbles: true,
      cancelable: true,
      deltaY: 10,
    })
    inner.vm.wrapRef!.dispatchEvent(wheel)
    await nextTick()
    expect(wheel.defaultPrevented).toBe(false)
    expect(bars(inner)[0].isVisible()).toBe(false)
    expect(
      outer
        .findAllComponents(Thumb)
        .slice(-2)
        .map((thumb) => thumb.find('.el-scrollbar__bar'))[0]
        .isVisible()
    ).toBe(true)
    await inner
      .find('.content')
      .trigger('mouseover', { relatedTarget: inner.vm.wrapRef })
    expect(bars(inner)[0].isVisible()).toBe(false)

    await inner.find('.content').trigger('wheel', { deltaY: -10 })
    expect(bars(inner)[0].isVisible()).toBe(true)
    await inner.trigger('mouseleave')
    await outer.trigger('mouseleave')
    expect(
      outer
        .findAllComponents(Thumb)
        .slice(-2)
        .map((thumb) => thumb.find('.el-scrollbar__bar'))[0]
        .isVisible()
    ).toBe(true)
    expect(bars(inner)[0].isVisible()).toBe(false)
    wrapper.unmount()
  })

  test('支持横向与 Shift 滚轮，并在实际滚动时校准显示归属', async () => {
    const { wrapper, outer, inner, bars } = await create()
    setSize(outer.vm.wrapRef!, true)
    setSize(inner.vm.wrapRef!, true)
    await inner.trigger('wheel', { deltaX: 10 })
    expect(bars(inner)[0].isVisible()).toBe(true)
    inner.vm.wrapRef!.scrollLeft = 200
    inner.element.dispatchEvent(
      new WheelEvent('wheel', { bubbles: true, deltaY: 10, shiftKey: true })
    )
    await nextTick()
    expect(bars(inner)[0].isVisible()).toBe(false)
    await inner.find('.el-scrollbar__wrap').trigger('scroll')
    expect(bars(inner)[0].isVisible()).toBe(true)
    wrapper.unmount()
  })

  test('无溢出的内层交给外层，程序滚动不使未移入的滚动条常显', async () => {
    const { wrapper, outer, inner, bars } = await create()
    setSize(inner.vm.wrapRef!, false, false)
    await inner.find('.el-scrollbar__wrap').trigger('scroll')
    expect(bars(inner)[0].isVisible()).toBe(false)
    await inner.trigger('mouseover')
    expect(bars(inner)[0].isVisible()).toBe(false)
    expect(
      outer
        .findAllComponents(Thumb)
        .slice(-2)
        .map((thumb) => thumb.find('.el-scrollbar__bar'))[0]
        .isVisible()
    ).toBe(true)
    wrapper.unmount()
  })

  test('缓存停用后释放归属，恢复后仍可交互且不影响独立滚动树', async () => {
    const show = ref(true)
    const wrapper = mount(() => (
      <div>
        <Scrollbar always>
          <KeepAlive>
            {show.value ? (
              <Scrollbar>
                <span class="content" />
              </Scrollbar>
            ) : null}
          </KeepAlive>
        </Scrollbar>
        <Scrollbar always />
      </div>
    ))
    await nextTick()
    const [outer, inner, independent] = wrapper.findAllComponents(Scrollbar)
    setSize(outer.vm.wrapRef!)
    setSize(inner.vm.wrapRef!)
    await inner.trigger('mouseover')
    expect(
      outer
        .findAllComponents(Thumb)
        .slice(-2)
        .map((thumb) => thumb.find('.el-scrollbar__bar'))[0]
        .isVisible()
    ).toBe(false)
    expect(independent.find('.el-scrollbar__bar').isVisible()).toBe(true)
    show.value = false
    await nextTick()
    expect(
      outer
        .findAllComponents(Thumb)
        .slice(-2)
        .map((thumb) => thumb.find('.el-scrollbar__bar'))[0]
        .isVisible()
    ).toBe(true)
    show.value = true
    await nextTick()
    await inner.trigger('mouseover')
    expect(
      outer
        .findAllComponents(Thumb)
        .slice(-2)
        .map((thumb) => thumb.find('.el-scrollbar__bar'))[0]
        .isVisible()
    ).toBe(false)
    wrapper.unmount()
  })

  test('内层卸载后恢复外层原有的常显状态', async () => {
    const show = ref(true)
    const wrapper = mount(() => (
      <Scrollbar always>{show.value ? <Scrollbar /> : null}</Scrollbar>
    ))
    await nextTick()
    const [outer, inner] = wrapper.findAllComponents(Scrollbar)
    setSize(outer.vm.wrapRef!)
    setSize(inner.vm.wrapRef!)
    await inner.trigger('mouseover')
    expect(
      outer
        .findAllComponents(Thumb)
        .slice(-2)[0]
        .find('.el-scrollbar__bar')
        .isVisible()
    ).toBe(false)
    show.value = false
    await nextTick()
    expect(outer.find('.el-scrollbar__bar').isVisible()).toBe(true)
    wrapper.unmount()
  })
})
