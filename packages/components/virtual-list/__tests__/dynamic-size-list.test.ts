// @ts-nocheck
import { nextTick } from 'vue'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import makeMount from '@element-plus/test-utils/make-mount'
import makeScroll from '@element-plus/test-utils/make-scroll'
import { rAF } from '@element-plus/test-utils/tick'
import {
  END_ALIGNMENT,
  HORIZONTAL,
  SMART_ALIGNMENT,
  START_ALIGNMENT,
} from '../src/defaults'
import { DynamicSizeList } from '..'
import setupMock from './setup-mock'

import type { ListExposes } from '../src/types'

type ListRef = ListExposes

const onItemRendered = vi.fn()
const WINDOW_KLS = 'window'
const ITEM_KLS = 'item'
const ITEM_SELECTOR = `.${ITEM_KLS}`
const BASE_SIZE = 25 * 100 // base size * total

const widths = Array.from({ length: 100 }).map(
  () => 25 + Math.floor(Math.random() * 5) + 1
) // 大于 26 且小于等于 30

const mount = makeMount(
  {
    template: `<dynamic-size-list v-bind="$attrs" ref="listRef">
    <template #default="{index, style}">
      <div class="${ITEM_KLS}" :style="style">{{ index }}</div>
    </template>
  </dynamic-size-list>`,
    components: {
      DynamicSizeList,
    },
  },
  {
    props: {
      cache: 3,
      className: WINDOW_KLS,
      estimatedItemSize: 25,
      height: 100,
      total: 100,
      itemSize: (idx: number) => widths[idx],
      width: 50,
      onItemRendered,
    },
  }
)

let cleanup: () => void

describe('<dynamic-size-list />', () => {
  beforeAll(() => {
    cleanup = setupMock()
  })

  afterAll(() => {
    cleanup()
  })

  describe('render testing', () => {
    it('should render vertical list correctly', async () => {
      const wrapper = mount()
      // 由于宽度可变，因此只能推断
      // 基于最小宽度 26 得出一个相对数值
      //（项宽度大于等于 26）
      expect(wrapper.findAll(ITEM_SELECTOR).length).toBeLessThanOrEqual(7)
    })

    it('should render horizontal list correctly', async () => {
      const wrapper = mount({
        props: {
          layout: HORIZONTAL,
        },
      })
      await nextTick()
      // 与纵向一致，因为窗口尺寸为 50，项尺寸 >= 26
      // 含缓存项时，总尺寸不能大于 5
      expect(wrapper.findAll(ITEM_SELECTOR).length).toBeLessThanOrEqual(5)
    })
  })

  describe('scroll functionality', () => {
    it("should update inner container's height after scroll dispatched", async () => {
      const wrapper = mount()
      const listRef = wrapper.vm.$refs.listRef as ListRef
      await nextTick()
      const estimatedTotalSize = Number.parseInt(listRef.innerRef.style.height)
      // 尺寸全为 26 时，应有 7 项：4 可见 + 3 缓存
      // 因此尺寸必须大于等于 BASE_SIZE + 1 * 7，必须大于
      // 即大于 BASE_SIZE + 1 * 6
      expect(estimatedTotalSize).toBeGreaterThan(BASE_SIZE + 1 * 6)
      // 尺寸全为 30 时，最多应有 6 项：3 可见 3 缓存。
      // 因为窗口尺寸为 100，100 / 30 = 3.333 小于 3.5，因此只能
      // 向可见列表放入 3 项。
      // so it must be less than 5(30 - 25) * 7 (6 + 1 items)
      expect(estimatedTotalSize).toBeLessThan(BASE_SIZE + 5 * 7)

      // 滚动 200px 大约跨越 ~7（尺寸 30px）到 ~8（尺寸 26px）项。
      listRef.scrollTo(200)
      await nextTick()
      expect(Number.parseInt(listRef.innerRef.style.height)).toBeGreaterThan(
        estimatedTotalSize
      )

      // 使用 scrollTo 方法时，列表由
      // 3 cached items + (3 ~ 4) visible items + 3 cached items
      // 滚动 7 ~ 8 项后，DOM 中的第一项应为
      // (7 | 8) - 3 = (4 | 5) cached items
      // 接着是 (7 | 8) 个可见项
      // 末尾为 (10 | 11) 个缓存项
      // 基本情况是窗口高度至少更新了 10 次
      // 高度最多更新 5（最大尺寸）* 11 次
      expect(Number.parseInt(listRef.innerRef.style.height)).toBeGreaterThan(
        BASE_SIZE + 1 * 10
      )

      expect(Number.parseInt(listRef.innerRef.style.height)).toBeLessThan(
        BASE_SIZE + 5 * 12
      )

      expect(wrapper.findAll(ITEM_SELECTOR).length).toBeGreaterThan(8)
      expect(wrapper.findAll(ITEM_SELECTOR).length).toBeLessThanOrEqual(11)
    })

    it('should scroll correctly in horizontal mode', async () => {
      const wrapper = mount({
        props: {
          layout: HORIZONTAL,
        },
      })

      const listRef = wrapper.vm.$refs.listRef as ListRef
      await nextTick()
      const estimatedTotalSize = Number.parseInt(listRef.innerRef.style.width)
      // 尺寸全为 26 时，应有 7 项：2 可见 + 3 缓存
      // 因此尺寸必须大于等于 BASE_SIZE + 1 * 5，必须大于
      // 即大于 BASE_SIZE + 1 * 4
      expect(estimatedTotalSize).toBeGreaterThan(BASE_SIZE + 1 * 4)
      // 尺寸全为 30 时，最多应有 5 项：2 可见 3 缓存。
      // 因为窗口尺寸为 100，50 / 30 = 1.66 大于 1.5，因此只能
      // 向可见列表放入 2 项。
      // so it must be less than 5(30 - 25) * 6 (5 + 1 items)
      expect(estimatedTotalSize).toBeLessThan(BASE_SIZE + 5 * 6)

      // 滚动 200px 大约跨越 ~7（尺寸 30px）到 ~8（尺寸 26px）项。
      listRef.scrollTo(200)
      await nextTick()
      expect(Number.parseInt(listRef.innerRef.style.width)).toBeGreaterThan(
        estimatedTotalSize
      )

      // 使用 scrollTo 方法时，列表由
      // 3 cached items + 2 visible items + 3 cached items
      // 滚动 7 ~ 8 项后，DOM 中的第一项应为
      // (7 | 8) - 3 = (4 | 5) cached items
      // 接着是 (6 | 7) 个可见项
      // 末尾为 (9 | 10) 个缓存项
      // 基本情况是窗口宽度至少更新了 10 次
      // 宽度最多更新 5（最大尺寸）* 11 次
      expect(Number.parseInt(listRef.innerRef.style.width)).toBeGreaterThan(
        BASE_SIZE + 1 * 9
      )

      expect(Number.parseInt(listRef.innerRef.style.width)).toBeLessThan(
        BASE_SIZE + 5 * 11
      )
      expect(wrapper.findAll(ITEM_SELECTOR).length).toBeLessThanOrEqual(9)
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

      expect(onEndReached).toHaveBeenCalledWith('bottom')
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

      const { innerRef, windowRef } = wrapper.vm.$refs.listRef as ListRef
      const bottomOffset = Number.parseInt(innerRef.style.height, 10) - 100

      await makeScroll(windowRef, 'scrollTop', bottomOffset)
      await nextTick()

      expect(onEndReached).toHaveBeenCalledWith('bottom')
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
      const event = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        clientY: 100,
      })
      track.dispatchEvent(event)

      await nextTick()

      expect(onEndReached).toHaveBeenCalledWith('bottom')
      expect(onEndReached).toHaveBeenCalledOnce()
    })

    it('should emit end-reached again after total increases and bottom is reached again', async () => {
      const onEndReached = vi.fn()
      const wrapper = mount({
        props: {
          total: 50,
          onEndReached,
        },
      })

      await nextTick()

      const listRef = wrapper.vm.$refs.listRef as ListRef
      const getBottomOffset = () =>
        Number.parseInt(listRef.innerRef.style.height, 10) - 100

      listRef.scrollTo(getBottomOffset())
      await nextTick()

      expect(onEndReached).toHaveBeenNthCalledWith(1, 'bottom')

      await wrapper.setProps({
        total: 100,
      })

      listRef.scrollTo(getBottomOffset())
      await nextTick()

      expect(onEndReached).toHaveBeenNthCalledWith(2, 'bottom')
      expect(onEndReached).toHaveBeenCalledTimes(2)
    })

    // 确保滚动范围在 [0, 30) 内，这样就不会出现偏移问题，因为
    // 大于 30 的项索引可能在测试中产生不必要的偏移问题。
    it('should scrollToItem correctly', async () => {
      const wrapper = mount()

      const listRef = wrapper.vm.$refs.listRef as ListRef
      // 自动对齐
      listRef.scrollToItem(10)
      await nextTick()
      // 滚动到第 10 项时，估算偏移应为 250
      // 原始网格位置为 0，因此应返回 200（偏移 250 - 尺寸 50）
      // 交由 scrollTo 方法处理，此时 scrollTo 的项应放置在
      // 列表底部，因为最多显示 4 个可见项。
      // 减去缓存数 3，第一项应为第 4 项。
      expect(
        Number.parseInt(wrapper.find(ITEM_SELECTOR).text())
      ).toBeLessThanOrEqual(4)
      // 智能对齐
      listRef.scrollToItem(20, SMART_ALIGNMENT)
      await nextTick()
      expect(
        Number.parseInt(wrapper.find(ITEM_SELECTOR).text())
      ).toBeLessThanOrEqual(15)

      listRef.scrollToItem(21, SMART_ALIGNMENT)
      await nextTick()
      expect(
        Number.parseInt(wrapper.find(ITEM_SELECTOR).text())
      ).toBeLessThanOrEqual(15)

      listRef.scrollToItem(10, START_ALIGNMENT)
      await nextTick()
      expect(
        Number.parseInt(wrapper.find(ITEM_SELECTOR).text())
      ).toBeLessThanOrEqual(7)

      listRef.scrollToItem(20, END_ALIGNMENT)
      await nextTick()
      expect(
        Number.parseInt(wrapper.find(ITEM_SELECTOR).text())
      ).toBeLessThanOrEqual(14)

      listRef.scrollTo(200)
      await nextTick()
      listRef.scrollToItem(5)
      expect(
        Number.parseInt(wrapper.find(ITEM_SELECTOR).text())
      ).toBeLessThanOrEqual(4)
    })
  })

  describe('to throw', () => {
    it('should throw when item-size is not function', () => {
      const errorHandler = vi.fn()
      try {
        mount({
          props: {
            itemSize: 1,
          },
          global: {
            config: {
              errorHandler,
              warnHandler() {
                // 抑制警告
              },
            },
          },
        })
      } catch (e) {
        expect(errorHandler).toHaveBeenCalled()
        expect(e).toBeInstanceOf(Error)
        expect(e.message).toContain('itemSize is required as function')
      }
    })
  })
})
