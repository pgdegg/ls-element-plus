import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { ElSplitter, ElSplitterPanel } from '../index'
import { useElementSize } from './__mocks__/vueuse'

// jsdom 不支持 useElementSize 和 useResizeObserver，因此进行 mock
vi.mock('@vueuse/core', () => {
  return import('./__mocks__/vueuse')
})

describe('Splitter', () => {
  const mockResizeObserver = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))

  beforeAll(() => {
    window.ResizeObserver = mockResizeObserver
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('should render correctly', () => {
    const wrapper = mount(() => (
      <ElSplitter>
        <ElSplitterPanel>Left Panel</ElSplitterPanel>
        <ElSplitterPanel>Right Panel</ElSplitterPanel>
      </ElSplitter>
    ))

    expect(wrapper.find('.el-splitter').exists()).toBe(true)
    expect(wrapper.findAll('.el-splitter-panel')).toHaveLength(2)
  })

  it('should render with vertical layout', () => {
    const wrapper = mount(() => (
      <ElSplitter layout="vertical">
        <ElSplitterPanel>Top Panel</ElSplitterPanel>
        <ElSplitterPanel>Bottom Panel</ElSplitterPanel>
      </ElSplitter>
    ))

    expect(wrapper.find('.el-splitter__vertical').exists()).toBe(true)
  })

  it('should keep panels size consistent with props.size when containerSize is 0.', async () => {
    const splitterWidth = ref(100)
    const size = ref('30%')
    const mockSize = useElementSize.mockReturnValue({
      width: splitterWidth,
      height: ref(400),
    })

    const wrapper = mount(() => (
      <div style={{ width: splitterWidth.value, height: '400px' }}>
        <ElSplitter>
          <ElSplitterPanel>
            <div class="demo-panel">1</div>
          </ElSplitterPanel>
          <ElSplitterPanel size={size.value}>
            <div class="demo-panel">2</div>
          </ElSplitterPanel>
        </ElSplitter>
      </div>
    ))

    await nextTick()
    const panels = wrapper.findAll('.el-splitter-panel')

    // 默认尺寸
    expect(panels[0].attributes('style')).toContain('flex-basis: 70px;')
    expect(panels[1].attributes('style')).toContain('flex-basis: 30px;')

    splitterWidth.value = 0
    size.value = '80%'

    await nextTick()

    // 默认尺寸
    expect(panels[0].attributes('style')).toContain('flex-basis: 0px;')
    expect(panels[1].attributes('style')).toContain('flex-basis: 0px;')

    const panelComps = wrapper.findComponent({ name: 'ElSplitter' }).vm.panels

    expect(panelComps[0].size).toBeUndefined()
    expect(panelComps[1].size).toBe('80%')

    mockSize.mockRestore()
  })

  it('should respect min and max size constraints', async () => {
    const wrapper = mount(() => (
      <div style={{ width: '400px', height: '400px' }}>
        <ElSplitter>
          <ElSplitterPanel size={150} min={100} max={200}>
            Left Panel
          </ElSplitterPanel>
          <ElSplitterPanel>Right Panel</ElSplitterPanel>
        </ElSplitter>
      </div>
    ))
    await nextTick()
    const panels = wrapper.findAll('.el-splitter-panel')

    // 默认尺寸
    expect(panels[0].attributes('style')).toContain('flex-basis: 150px;')

    // mock 鼠标事件
    const simulateDrag = async (startPos: number, endPos: number) => {
      const splitBar = wrapper.find('.el-splitter-bar__dragger')

      // 模拟鼠标按下
      const mousedown = new MouseEvent('mousedown', { bubbles: true })
      Object.defineProperty(mousedown, 'pageX', { value: startPos })
      splitBar.element.dispatchEvent(mousedown)

      // 模拟鼠标移动
      const mousemove = new MouseEvent('mousemove', { bubbles: true })
      Object.defineProperty(mousemove, 'pageX', { value: endPos })
      window.dispatchEvent(mousemove)

      // 模拟鼠标抬起
      const mouseup = new MouseEvent('mouseup', { bubbles: true })
      Object.defineProperty(mouseup, 'pageX', { value: endPos })
      window.dispatchEvent(mouseup)

      await nextTick()
    }

    // 测试最小尺寸约束：向左拖动到最小值 100px
    await simulateDrag(150, 50)
    expect(panels[0].attributes('style')).toContain('flex-basis: 100px;')

    // 测试最大尺寸约束：向右拖动到最大值 200px
    await simulateDrag(50, 150)
    expect(panels[0].attributes('style')).toContain('flex-basis: 200px;')
  })

  it('should handle collapse', async () => {
    const wrapper = mount(() => (
      <div style={{ width: '400px', height: '400px' }}>
        <ElSplitter>
          <ElSplitterPanel size={150} collapsible>
            Left Panel
          </ElSplitterPanel>
          <ElSplitterPanel collapsible>Right Panel</ElSplitterPanel>
        </ElSplitter>
      </div>
    ))
    await nextTick()

    const panels = wrapper.findAll('.el-splitter-panel')
    const startCollapseButton = wrapper.find(
      '.el-splitter-bar__horizontal-collapse-icon-start'
    )
    const endCollapseButton = wrapper.find(
      '.el-splitter-bar__horizontal-collapse-icon-end'
    )

    // 默认尺寸
    expect(panels[0].attributes('style')).toContain('flex-basis: 150px;')

    // 点击折叠按钮
    await startCollapseButton.trigger('click')
    await nextTick()

    // 面板应折叠（size = 0）
    expect(panels[0].attributes('style')).toContain('flex-basis: 0px;')

    // 点击折叠按钮以展开
    await endCollapseButton.trigger('click')
    await nextTick()

    // 面板应恢复为原始尺寸
    expect(panels[0].attributes('style')).toContain('flex-basis: 150px;')
  })

  it('should emit resize events', async () => {
    const onResizeStart = vi.fn()
    const onResize = vi.fn()
    const onResizeEnd = vi.fn()

    const wrapper = mount(() => (
      <div style={{ width: '400px', height: '400px' }}>
        <ElSplitter
          onResizeStart={onResizeStart}
          onResize={onResize}
          onResizeEnd={onResizeEnd}
        >
          <ElSplitterPanel>Left Panel</ElSplitterPanel>
          <ElSplitterPanel>Right Panel</ElSplitterPanel>
        </ElSplitter>
      </div>
    ))
    await nextTick()

    // mock 鼠标事件
    const simulateDrag = async (startPos: number, endPos: number) => {
      const splitBar = wrapper.find('.el-splitter-bar__dragger')

      // 模拟鼠标按下
      const mousedown = new MouseEvent('mousedown', { bubbles: true })
      Object.defineProperty(mousedown, 'pageX', { value: startPos })
      splitBar.element.dispatchEvent(mousedown)
      await nextTick()

      // 模拟鼠标移动
      const mousemove = new MouseEvent('mousemove', { bubbles: true })
      Object.defineProperty(mousemove, 'pageX', { value: endPos })
      window.dispatchEvent(mousemove)

      // 再次移动
      await nextTick()
      window.dispatchEvent(mousemove)

      // 模拟鼠标抬起
      const mouseup = new MouseEvent('mouseup', { bubbles: true })
      Object.defineProperty(mouseup, 'pageX', { value: endPos })
      window.dispatchEvent(mouseup)

      await nextTick()
    }

    await simulateDrag(200, 100)

    expect(onResizeStart).toHaveBeenCalledWith(0, [200, 200])
    expect(onResize).toHaveBeenCalledTimes(2)
    expect(onResize.mock.calls[0]).toEqual([0, [200, 200]])
    expect(onResize.mock.calls[1]).toEqual([0, [100, 300]])
    expect(onResizeEnd).toHaveBeenCalledWith(0, [100, 300])
  })

  it('should emit collapse event', async () => {
    const onCollapse = vi.fn()
    const wrapper = mount(() => (
      <div style={{ width: '400px', height: '400px' }}>
        <ElSplitter onCollapse={onCollapse}>
          <ElSplitterPanel collapsible>Left Panel</ElSplitterPanel>
          <ElSplitterPanel collapsible>Right Panel</ElSplitterPanel>
        </ElSplitter>
      </div>
    ))
    await nextTick()

    const startCollapseButton = wrapper.find(
      '.el-splitter-bar__horizontal-collapse-icon-start'
    )
    const endCollapseButton = wrapper.find(
      '.el-splitter-bar__horizontal-collapse-icon-end'
    )

    // 点击折叠按钮
    await startCollapseButton.trigger('click')
    await nextTick()
    expect(onCollapse).toHaveBeenCalledWith(0, 'start', [0, 400])

    // 点击折叠按钮以展开
    await endCollapseButton.trigger('click')
    await nextTick()
    expect(onCollapse).toHaveBeenCalledWith(0, 'end', [200, 200])
  })

  it('should collapse normally when size is two-way bound and min & max is set', async () => {
    const size = ref(150)
    const wrapper = mount(() => (
      <div style={{ width: '400px', height: '400px' }}>
        <ElSplitter>
          <ElSplitterPanel
            v-model:size={size.value}
            collapsible
            min={50}
            max={200}
          >
            Left Panel
          </ElSplitterPanel>
          <ElSplitterPanel collapsible>Right Panel</ElSplitterPanel>
        </ElSplitter>
      </div>
    ))
    await nextTick()

    const panels = wrapper.findAll('.el-splitter-panel')
    const startCollapseButton = wrapper.find(
      '.el-splitter-bar__horizontal-collapse-icon-start'
    )
    const endCollapseButton = wrapper.find(
      '.el-splitter-bar__horizontal-collapse-icon-end'
    )

    // 默认尺寸
    expect(panels[0].attributes('style')).toContain('flex-basis: 150px;')

    // 点击折叠按钮
    await startCollapseButton.trigger('click')
    await nextTick()

    // 面板应折叠（size = 0）
    expect(panels[0].attributes('style')).toContain('flex-basis: 0px;')

    // 点击折叠按钮以展开
    await endCollapseButton.trigger('click')
    await nextTick()

    // 面板应恢复为原始尺寸
    expect(panels[0].attributes('style')).toContain('flex-basis: 150px;')

    // 点击折叠按钮以展开
    await endCollapseButton.trigger('click')
    await nextTick()

    // 面板应折叠（size = 400）
    expect(panels[0].attributes('style')).toContain('flex-basis: 400px;')
  })

  it('should expand a collapsible panel whose initial size is 0 to its min size', async () => {
    const size = ref(0)
    const wrapper = mount(() => (
      <ElSplitter>
        <ElSplitterPanel v-model:size={size.value} min={100} collapsible>
          Left Panel
        </ElSplitterPanel>
        <ElSplitterPanel min={200}>Right Panel</ElSplitterPanel>
      </ElSplitter>
    ))
    await nextTick()

    const panels = wrapper.findAll('.el-splitter-panel')
    const endCollapseButton = wrapper.find(
      '.el-splitter-bar__horizontal-collapse-icon-end'
    )

    expect(panels[0].attributes('style')).toContain('flex-basis: 0px;')

    await endCollapseButton.trigger('click')
    await nextTick()

    expect(panels[0].attributes('style')).toContain('flex-basis: 100px;')
    expect(size.value).toBe(100)
  })

  it('should not update panel size until drag ends when lazy is true', async () => {
    const wrapper = mount(() => (
      <div style={{ width: '400px', height: '400px' }}>
        <ElSplitter lazy>
          <ElSplitterPanel>Left Panel</ElSplitterPanel>
          <ElSplitterPanel>Right Panel</ElSplitterPanel>
        </ElSplitter>
      </div>
    ))
    await nextTick()
    const panels = wrapper.findAll('.el-splitter-panel')
    const splitBar = wrapper.find('.el-splitter-bar__dragger')

    const mousedown = new MouseEvent('mousedown', { bubbles: true })
    Object.defineProperty(mousedown, 'pageX', { value: 200 })
    splitBar.element.dispatchEvent(mousedown)

    const mousemove = new MouseEvent('mousemove', { bubbles: true })
    Object.defineProperty(mousemove, 'pageX', { value: 100 })
    window.dispatchEvent(mousemove)
    await nextTick()
    expect(panels[0].attributes('style')).toContain('flex-basis: 200px;')

    const mouseup = new MouseEvent('mouseup', { bubbles: true })
    Object.defineProperty(mouseup, 'pageX', { value: 100 })
    window.dispatchEvent(mouseup)
    await nextTick()
    expect(panels[0].attributes('style')).toContain('flex-basis: 100px;')
  })

  it('should update panel size immediately when lazy is false', async () => {
    const wrapper = mount(() => (
      <div style={{ width: '400px', height: '400px' }}>
        <ElSplitter>
          <ElSplitterPanel>Left Panel</ElSplitterPanel>
          <ElSplitterPanel>Right Panel</ElSplitterPanel>
        </ElSplitter>
      </div>
    ))
    await nextTick()
    const panels = wrapper.findAll('.el-splitter-panel')
    const splitBar = wrapper.find('.el-splitter-bar__dragger')

    const mousedown = new MouseEvent('mousedown', { bubbles: true })
    Object.defineProperty(mousedown, 'pageX', { value: 200 })
    splitBar.element.dispatchEvent(mousedown)

    const mousemove = new MouseEvent('mousemove', { bubbles: true })
    Object.defineProperty(mousemove, 'pageX', { value: 100 })
    window.dispatchEvent(mousemove)
    await nextTick()
    expect(panels[0].attributes('style')).toContain('flex-basis: 100px;')

    const mouseup = new MouseEvent('mouseup', { bubbles: true })
    Object.defineProperty(mouseup, 'pageX', { value: 100 })
    window.dispatchEvent(mouseup)
    await nextTick()
    expect(panels[0].attributes('style')).toContain('flex-basis: 100px;')
  })

  it('should emit resizeEnd with latest sizes data in lazy mode', async () => {
    const onResizeEnd = vi.fn()
    const wrapper = mount(() => (
      <div style={{ width: '400px', height: '400px' }}>
        <ElSplitter lazy onResizeEnd={onResizeEnd}>
          <ElSplitterPanel>Left Panel</ElSplitterPanel>
          <ElSplitterPanel>Right Panel</ElSplitterPanel>
        </ElSplitter>
      </div>
    ))
    await nextTick()

    const splitBar = wrapper.find('.el-splitter-bar__dragger')

    const mousedown = new MouseEvent('mousedown', { bubbles: true })
    Object.defineProperty(mousedown, 'pageX', { value: 200 })
    splitBar.element.dispatchEvent(mousedown)
    await nextTick()

    const mousemove = new MouseEvent('mousemove', { bubbles: true })
    Object.defineProperty(mousemove, 'pageX', { value: 150 })
    window.dispatchEvent(mousemove)
    await nextTick()

    const mouseup = new MouseEvent('mouseup', { bubbles: true })
    Object.defineProperty(mouseup, 'pageX', { value: 150 })
    window.dispatchEvent(mouseup)
    await nextTick()

    expect(onResizeEnd).toHaveBeenCalledWith(0, [150, 250])

    const panels = wrapper.findAll('.el-splitter-panel')
    expect(panels[0].attributes('style')).toContain('flex-basis: 150px;')
    expect(panels[1].attributes('style')).toContain('flex-basis: 250px;')
  })

  it('should not still display the mask after the panel updates', async () => {
    const show = ref(true)
    const wrapper = mount(() => (
      <ElSplitter onResizeStart={() => (show.value = false)}>
        {show.value ? (
          <ElSplitterPanel v-if={show.value}>Left Panel</ElSplitterPanel>
        ) : null}
        <ElSplitterPanel>Right Panel</ElSplitterPanel>
      </ElSplitter>
    ))
    await nextTick()

    expect(wrapper.find('.el-splitter__mask').exists()).toBeFalsy()

    const splitBar = wrapper.find('.el-splitter-bar__dragger')
    const mousedown = new MouseEvent('mousedown', { bubbles: true })
    Object.defineProperty(mousedown, 'pageX', { value: 200 })
    splitBar.element.dispatchEvent(mousedown)
    await nextTick()
    expect(wrapper.find('.el-splitter__mask').exists()).toBeFalsy()
  })
})
