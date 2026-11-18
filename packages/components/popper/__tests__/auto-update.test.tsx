import { computed, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { autoUpdate } from '@floating-ui/dom'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { POPPER_INJECTION_KEY } from '../src/constants'
import Content from '../src/content.vue'

vi.mock('@floating-ui/dom', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@floating-ui/dom')>()),
  autoUpdate: vi.fn(() => vi.fn()),
}))

describe('悬浮定位监听生命周期', () => {
  afterEach(() => vi.clearAllMocks())

  test('初始显示、触发元素替换和隐藏时正确建立及清理布局监听', async () => {
    const triggerRef = ref(document.createElement('button'))
    const wrapper = mount(Content, {
      props: { visible: true },
      global: {
        provide: {
          [POPPER_INJECTION_KEY as symbol]: {
            triggerRef,
            popperInstanceRef: ref(),
            contentRef: ref(),
            role: computed(() => 'tooltip'),
          },
        },
      },
    })
    try {
      await nextTick()
      expect(autoUpdate).toHaveBeenCalledWith(
        triggerRef.value,
        wrapper.element,
        expect.any(Function),
        { ancestorScroll: false, ancestorResize: false }
      )
      const firstCleanup = vi.mocked(autoUpdate).mock.results[0].value
      triggerRef.value = document.createElement('button')
      await nextTick()
      expect(firstCleanup).toHaveBeenCalledOnce()
      expect(autoUpdate).toHaveBeenCalledTimes(2)
      const secondCleanup = vi.mocked(autoUpdate).mock.results[1].value
      await wrapper.setProps({ visible: false })
      expect(secondCleanup).toHaveBeenCalledOnce()
      await wrapper.setProps({ visible: true })
      expect(autoUpdate).toHaveBeenCalledTimes(3)
    } finally {
      wrapper.unmount()
    }
    expect(vi.mocked(autoUpdate).mock.results[2].value).toHaveBeenCalledOnce()
  })
})
