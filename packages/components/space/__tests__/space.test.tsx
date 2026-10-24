import { createSSRApp, h, nextTick, ref } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Space from '../src/space'

const AXIOM = 'Rem is the best girl'

describe('Space.vue', () => {
  it('render test', async () => {
    const wrapper = mount(<Space>{AXIOM}</Space>)

    expect(wrapper.text()).toEqual(AXIOM)

    await wrapper.setProps({
      direction: 'vertical',
      wrap: true,
    })

    expect(wrapper.find('.el-space--vertical').exists()).toBe(true)
    expect(wrapper.find('.el-space').attributes('style')).toContain(
      'flex-wrap: wrap'
    )
  })

  it('sizes', async () => {
    const warnHandler = vi.fn()
    const wrapper = mount(
      <Space size="large">
        {Array.from({ length: 2 }).map((_, idx) => {
          return `test${idx}`
        })}
      </Space>,
      {
        global: {
          config: {
            warnHandler,
          },
        },
      }
    )

    await nextTick()
    expect(wrapper.find('.el-space').attributes('style')).toContain('gap: 16px')

    await wrapper.setProps({
      size: 30,
    })

    await nextTick()
    expect(wrapper.find('.el-space').attributes('style')).toContain('gap: 30px')

    await wrapper.setProps({
      size: [10, 20],
    })

    expect(wrapper.find('.el-space').attributes('style')).toContain(
      'column-gap: 10px'
    )
    expect(wrapper.find('.el-space').attributes('style')).toContain(
      'row-gap: 20px'
    )
    await wrapper.setProps({
      size: 'unknown',
    })

    expect(warnHandler).toHaveBeenCalled()

    expect(wrapper.find('.el-space').attributes('style')).toContain('gap: 8px')
  })

  it('should render with spacer', async () => {
    const stringSpacer = '|'
    const wrapper = mount(
      <Space size="large" spacer={stringSpacer}>
        {Array.from({ length: 2 }).map((_, idx) => {
          return `test${idx}`
        })}
      </Space>
    )

    await nextTick()
    expect(wrapper.element.children).toHaveLength(3)

    expect(wrapper.text()).toContain(stringSpacer)

    // 2 个元素，预期仅 1 个间隔符
    expect(wrapper.text().split(stringSpacer)).toHaveLength(2)
    const testSpacerCls = 'test-spacer-cls'

    // vnode 类型的间隔符
    await wrapper.setProps({
      spacer: <div class={testSpacerCls} />,
    })

    expect(wrapper.findAll(`.${testSpacerCls}`)).toHaveLength(1)
    expect(wrapper.element.children).toHaveLength(3)
  })

  it('should render every component vnode spacer after hydration', async () => {
    const showSpace = ref(false)
    const spacer = h(() => h('i', { class: 'test-spacer' }))
    const App = () =>
      showSpace.value
        ? h(Space, { spacer }, () => [1, 2, 3].map((item) => h('div', item)))
        : null
    const container = document.createElement('div')
    container.innerHTML = await renderToString(h(App))
    const app = createSSRApp(App)

    app.mount(container)
    showSpace.value = true
    await nextTick()

    expect(container.querySelectorAll('.test-spacer')).toHaveLength(2)
    app.unmount()
  })

  it('fill', async () => {
    const wrapper = mount(
      <Space fill>
        {Array.from({ length: 2 }).map((_, idx) => {
          return `test${idx}`
        })}
      </Space>
    )

    await nextTick()
    expect(wrapper.find('.el-space').attributes('style')).toContain(
      'flex-wrap: wrap'
    )
    expect(wrapper.find('.el-space__item').attributes('style')).toContain(
      'flex-grow: 1'
    )
    expect(wrapper.find('.el-space__item').attributes('style')).toContain(
      'min-width: 100%'
    )

    // 自定义填充比例
    await wrapper.setProps({
      fillRatio: 50,
    })

    await nextTick()
    expect(wrapper.find('.el-space__item').attributes('style')).toContain(
      'min-width: 50%'
    )
  })

  it('should handle empty conditional templates correctly', async () => {
    // 使用一个通过 v-if 模拟空模板的组件进行测试
    const TestComponent = {
      template: `
        <el-space spacer="|">
          <span>Item 1</span>
          <template v-if="false"></template>
          <span>Item 2</span>
          <template v-if="false"></template>
        </el-space>
      `,
      components: {
        'el-space': Space,
      },
    }

    const wrapper = mount(TestComponent)
    await nextTick()

    expect(wrapper.text()).toBe('Item 1|Item 2')

    const spacerElements = wrapper
      .findAll('span')
      .filter((el) => el.text() === '|')
    expect(spacerElements.length).toBe(1)

    const spaceChildren = wrapper.find('.el-space').element.children
    expect(spaceChildren.length).toBe(3)
  })
})
