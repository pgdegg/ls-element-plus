// @ts-nocheck
import { nextTick } from 'vue'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import makeMount from '@element-plus/test-utils/make-mount'
import makeScroll from '@element-plus/test-utils/make-scroll'
import { rAF } from '@element-plus/test-utils/tick'
import {
  CENTERED_ALIGNMENT,
  END_ALIGNMENT,
  HORIZONTAL,
  RTL,
  SMART_ALIGNMENT,
  START_ALIGNMENT,
} from '../src/defaults'
import { FixedSizeList } from '..'
import setupMock from './setup-mock'

import type { SpyInstance } from 'vitest'
import type { ListExposes } from '../src/types'

type ListRef = ListExposes

const onItemRendered = vi.fn()
const WINDOW_KLS = 'window'
const WINDOW_SELECTOR = `.${WINDOW_KLS}`
const ITEM_KLS = 'item'
const ITEM_SELECTOR = `.${ITEM_KLS}`
const mount = makeMount(
  {
    template: `<fixed-size-list v-bind="$attrs" ref="listRef">
    <template #default="{index, style}">
      <div class="${ITEM_KLS}" :style="style">item {{ index }}</div>
    </template>
  </fixed-size-list>`,
    components: {
      FixedSizeList,
    },
  },
  {
    props: {
      cache: 3,
      className: WINDOW_KLS,
      height: 100,
      total: 100,
      itemSize: 25,
      width: 50,
      onItemRendered,
    },
  }
)

let cleanup: () => void

describe('<fixed-size-list />', () => {
  beforeAll(() => {
    cleanup = setupMock()
  })

  afterAll(() => {
    cleanup()
  })

  it('should render correctly', async () => {
    const wrapper = mount()

    await nextTick()

    // 由于默认布局为纵向，因此使用 height 计算
    // 因为高度为 100，项尺寸为 25，所以可见
    // item 4
    // 然后添加 3 个缓存（因为当前在顶部
    // 意味着项之前没有缓存）
    // 因此有 3 个缓存
    // the total of items should be 4 + 3 = 7
    expect(wrapper.findAll(`.${ITEM_KLS}`)).toHaveLength(7)
    expect(
      wrapper
        .find(WINDOW_SELECTOR)
        .element.firstElementChild.getAttribute('style')
    ).toBe('height: 2500px; width: 100%; margin: 0px; box-sizing: border-box;')
    expect(onItemRendered).toHaveBeenCalledTimes(1)
  })

  it('should render 0 item when total is 0', async () => {
    const wrapper = mount({
      props: {
        total: 0,
      },
    })
    await nextTick()
    expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(0)
  })

  it('should early terminate scroll handler when the scrollTo equals to current offset', async () => {
    const wrapper = mount()

    await nextTick()

    expect(wrapper.find(ITEM_SELECTOR).text()).toContain(0)

    await makeScroll(
      (wrapper.vm.$refs.listRef as ListRef).windowRef,
      'scrollTop',
      0
    )
    expect(wrapper.find(ITEM_SELECTOR).text()).toContain(0)

    await wrapper.setProps({
      layout: HORIZONTAL,
    })

    await makeScroll(
      (wrapper.vm.$refs.listRef as ListRef).windowRef,
      'scrollLeft',
      0
    )

    expect(wrapper.find(ITEM_SELECTOR).text()).toContain(0)
  })

  it('should render correct items to the dom', async () => {
    const wrapper = mount()

    await nextTick()

    // window ref 有 onScroll 处理函数，因此在 windowRef 上触发滚动

    const { windowRef } = wrapper.vm.$refs.listRef as ListRef

    expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(7)
    expect(onItemRendered).toHaveBeenCalledTimes(1)

    makeScroll(windowRef, 'scrollTop', 100)
    await nextTick()
    // from index 3(item 4) + 4 visible items + 3 cache items = index 10
    // the total items rendered is 3 + 4 + 1 (index 3) inclusive
    // so the total number is 10
    expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(8)
  })

  it('should emit end-reached when wheel scrolling reaches bottom', async () => {
    const onEndReached = vi.fn()
    const wrapper = mount({
      props: {
        onEndReached,
      },
    })

    await nextTick()

    const { windowRef } = wrapper.vm.$refs.listRef as ListRef
    windowRef.dispatchEvent(
      new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        deltaY: 3000,
      })
    )

    await rAF()
    await nextTick()

    expect(onEndReached).toHaveBeenNthCalledWith(1, 'bottom')
    expect(onEndReached).toHaveBeenCalledOnce()
  })

  it('should not double-emit end-reached when browser clamps scrollTop below maxOffset (DPR mismatch)', async () => {
    const onEndReached = vi.fn()
    const wrapper = mount({
      props: {
        onEndReached,
      },
    })

    await nextTick()

    const { windowRef } = wrapper.vm.$refs.listRef as ListRef

    // 第 1 步：滚轮滚动到底部（内部使用 maxOffset）。
    windowRef.dispatchEvent(
      new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        deltaY: 3000,
      })
    )
    await rAF()
    await nextTick()

    expect(onEndReached).toHaveBeenCalledOnce()

    // 第 2 步：模拟 onUpdated 触发的原生滚动事件，
    // 但 scrollTop 略低于 maxOffset，就像使用
    // 小数 DPR（如 1.25）的浏览器在钳制到自身
    // scrollHeight clientHeight 时的行为。
    // maxOffset = 100*25 − 100 = 2400; sub-pixel clamped value = 2399.6
    await makeScroll(windowRef, 'scrollTop', 2399.6)
    await nextTick()

    // 第 3 步：又一个滚轮事件尝试继续向下滚动。
    windowRef.dispatchEvent(
      new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        deltaY: 100,
      })
    )
    await rAF()
    await nextTick()

    // end-reached 仍必须只被调用一次。
    expect(onEndReached).toHaveBeenCalledOnce()
  })

  it('should emit end-reached when native scrolling reaches bottom', async () => {
    const onEndReached = vi.fn()
    const wrapper = mount({
      props: {
        onEndReached,
      },
    })

    await nextTick()

    const { windowRef } = wrapper.vm.$refs.listRef as ListRef

    await makeScroll(windowRef, 'scrollTop', 2400)
    await nextTick()

    expect(onEndReached).toHaveBeenNthCalledWith(1, 'bottom')
    expect(onEndReached).toHaveBeenCalledOnce()
  })

  it('should emit end-reached when clicking scrollbar track to bottom', async () => {
    const onEndReached = vi.fn()
    const wrapper = mount({
      props: {
        onEndReached,
      },
    })

    await nextTick()

    const track = wrapper.find('.el-virtual-scrollbar').element

    // stub 掉 getBoundingClientRect，使 clickTrackHandler 确定性地解析点击
    // 位置，而不依赖 jsdom 默认的零值。
    const trackTop = 10
    const trackHeight = 98 // clientSize(100) - GAP(2)
    vi.spyOn(track, 'getBoundingClientRect').mockReturnValue({
      top: trackTop,
      left: 0,
      bottom: trackTop + trackHeight,
      right: 6,
      width: 6,
      height: trackHeight,
      x: 0,
      y: trackTop,
      toJSON: () => ({}),
    })

    // clientY 位于轨道底边，使点击映射超过
    // totalSteps 并钳制到最大滚动偏移。
    const event = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      clientY: trackTop + trackHeight,
    })
    track.dispatchEvent(event)

    await nextTick()

    // maxOffset = estimatedTotalSize - clientSize = 100*25 - 100 = 2400
    const listRef = wrapper.vm.$refs.listRef as ListRef
    expect(listRef.states.scrollOffset).toBe(2400)

    expect(onEndReached).toHaveBeenNthCalledWith(1, 'bottom')
    expect(onEndReached).toHaveBeenCalledOnce()
  })

  it('should emit rtl horizontal end-reached payloads based on visual direction', async () => {
    const onEndReached = vi.fn()
    const wrapper = mount({
      props: {
        direction: RTL,
        layout: HORIZONTAL,
        onEndReached,
      },
    })

    await nextTick()

    const listRef = wrapper.vm.$refs.listRef as ListRef

    listRef.scrollTo(2450)
    await nextTick()

    expect(onEndReached).toHaveBeenNthCalledWith(1, 'left')

    listRef.scrollTo(0)
    await nextTick()

    expect(onEndReached).toHaveBeenNthCalledWith(2, 'right')
    expect(onEndReached).toHaveBeenCalledTimes(2)
  })

  it('should set initial offset', async () => {
    const wrapper = mount({
      props: {
        initScrollOffset: 100,
      },
    })

    await nextTick()

    // 10 items = 3 backward invisible items + 4 visible items + 3 forward invisible items
    expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(10)
    expect(onItemRendered).toHaveBeenLastCalledWith(1, 10, 4, 7)
  })

  it('should render horizontal list', async () => {
    const wrapper = mount({
      props: {
        layout: HORIZONTAL,
      },
    })
    await nextTick()
    expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(5)
    expect(
      wrapper
        .find(WINDOW_SELECTOR)
        .element.firstElementChild.getAttribute('style')
    ).toBe('height: 100%; width: 2500px; margin: 0px; box-sizing: border-box;')
  })

  it('should handle horizontal scroll correctly', async () => {
    const wrapper = mount({
      props: {
        layout: HORIZONTAL,
      },
    })

    await nextTick()
    expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(5)

    const { windowRef } = wrapper.vm.$refs.listRef as ListRef
    makeScroll(windowRef, 'scrollLeft', 100)
    await nextTick()
    expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(6)
    expect(wrapper.find(ITEM_SELECTOR).text()).toContain(3)
  })

  it('should render rtl direction', async () => {
    const wrapper = mount({
      props: {
        direction: RTL,
      },
    })

    await nextTick()
    expect(
      wrapper
        .find(WINDOW_SELECTOR)
        .element.getAttribute('style')
        .includes(`direction: ${RTL}`)
    ).toBe(true)
    const style = wrapper.find(ITEM_SELECTOR).element.getAttribute('style')
    expect(style).toContain('right')
    expect(style).not.toContain('left')
  })

  it('should update rendered items when cache changes', async () => {
    const wrapper = mount()
    await nextTick()
    expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(7)

    await wrapper.setProps({
      cache: 4,
    })

    expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(8)
  })

  it('should update rendered items when item size changed', async () => {
    const wrapper = mount()
    await nextTick()
    expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(7)

    await wrapper.setProps({
      itemSize: 50,
    })

    expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(5)
  })

  describe('scrollTo', () => {
    it('should correctly scroll vertically', async () => {
      const wrapper = mount()

      await nextTick()

      const listRef = wrapper.vm.$refs.listRef as ListExposes

      expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(7)

      listRef.scrollTo(100)
      await nextTick()

      expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(10)

      listRef.scrollTo(200)

      expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(10)
    })

    it('should correctly scroll horizontally', async () => {
      const wrapper = mount({
        props: {
          layout: HORIZONTAL,
        },
      })

      await nextTick()

      const listRef = wrapper.vm.$refs.listRef as ListExposes

      expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(5)

      listRef.scrollTo(100)
      await nextTick()

      expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(8)

      listRef.scrollTo(200)

      expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(8)
    })

    it('should not scroll out of the boundary', async () => {
      const wrapper = mount({
        props: {
          total: 10,
        },
      })

      await nextTick()

      const listRef = wrapper.vm.$refs.listRef as ListExposes

      expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(7)

      // item size is 25 total number is 10 so the boundary is offset 250
      listRef.scrollTo(275)
      await nextTick()

      // 到达边界时，应只渲染可见项。
      expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(4)
    })

    it('should emit end-reached again after total increases and bottom is reached again', async () => {
      const onEndReached = vi.fn()
      const wrapper = mount({
        props: {
          onEndReached,
        },
      })

      await nextTick()

      const listRef = wrapper.vm.$refs.listRef as ListExposes

      listRef.scrollTo(2400)
      await nextTick()

      expect(onEndReached).toHaveBeenNthCalledWith(1, 'bottom')

      await wrapper.setProps({
        total: 200,
      })

      listRef.scrollTo(4900)
      await nextTick()

      expect(onEndReached).toHaveBeenNthCalledWith(2, 'bottom')
      expect(onEndReached).toHaveBeenCalledTimes(2)
    })
  })

  describe('scrollToItem', () => {
    it('should scrollToItem correctly', async () => {
      // 自动对齐
      const wrapper = mount()

      await nextTick()

      expect(wrapper.findAll(ITEM_SELECTOR)).toHaveLength(7)

      const listRef = wrapper.vm.$refs.listRef as ListExposes

      listRef.scrollToItem(10)

      await nextTick()

      expect(wrapper.find(ITEM_SELECTOR).text()).toContain(4)

      listRef.scrollToItem(20)
      await nextTick()
      expect(wrapper.find(ITEM_SELECTOR).text()).toContain(14)
      // 越界
      listRef.scrollToItem(101)
      await nextTick()
      expect(wrapper.find(ITEM_SELECTOR).text()).toContain(93)

      // 起始对齐
      listRef.scrollToItem(10, START_ALIGNMENT)
      await nextTick()
      // 10 - 3 (cache)
      expect(wrapper.find(ITEM_SELECTOR).text()).toContain(7)

      // 居中对齐
      listRef.scrollToItem(10, CENTERED_ALIGNMENT)
      await nextTick()
      // 第 10 项应位于中间，即位置 3
      // 因此视口中还剩 2 项
      // 另外有 3 个缓存项。
      // so that we get the first item: 10 - 2 - 3 = 5th item
      expect(wrapper.find(ITEM_SELECTOR).text()).toContain(5)
      // 接近左边界时的居中对齐
      listRef.scrollToItem(1, CENTERED_ALIGNMENT)
      await nextTick()
      // 接近右边界时的居中对齐
      listRef.scrollToItem(101, CENTERED_ALIGNMENT)
      await nextTick()
      expect(wrapper.find(ITEM_SELECTOR).text()).toContain(93)

      // 末尾对齐
      listRef.scrollToItem(10, END_ALIGNMENT)
      await nextTick()
      // 第 10 项应位于视口末尾
      // 视口尺寸为 4，因此还剩 3 项
      // 且有 3 个缓存，因此第一项应为
      // 10 - 3 - 3 = 4th item
      expect(wrapper.find(ITEM_SELECTOR).text()).toContain(4)

      // 智能对齐
      listRef.scrollToItem(10, SMART_ALIGNMENT)
      await nextTick()
      expect(wrapper.find(ITEM_SELECTOR).text()).toContain(4)

      listRef.scrollToItem(100, SMART_ALIGNMENT)
      await nextTick()
      expect(wrapper.find(ITEM_SELECTOR).text()).toContain(93)
    })
  })

  describe('to throw', () => {
    it('should throw when layout is invalid', () => {
      vi.spyOn(console, 'warn').mockImplementation(() => vi.fn)

      try {
        const wrapper = mount({
          props: {
            width: '100',
            height: '100',
          },
        })
        ;(wrapper.vm.$refs.listRef as ListRef).scrollToItem(10)
      } catch (e) {
        expect(e).toBeInstanceOf(Error)
      }

      expect(console.warn).toHaveBeenCalled()
      ;(console.warn as any as SpyInstance).mockRestore()
    })
  })
})
