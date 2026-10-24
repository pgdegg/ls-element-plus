import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useThrottleRender } from '../use-throttle-render'

const Comp = defineComponent({
  setup() {
    const loading = ref(false)
    const throttled = useThrottleRender(loading, 1000)
    // 清晰地测试 settimeout 分支：先触发 watch 记录 settimeout，再在挂载时再次记录 settimeout。
    loading.value = true

    return () => <div class="test-dom">{throttled.value.toString()}</div>
  },
})

describe.concurrent('useThrottleRender', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should throttle rendering when loading is true', async () => {
    const wrapper = mount(Comp)
    await nextTick()
    expect(wrapper.find('.test-dom').text()).toBe('false') // 初始为 false

    vi.advanceTimersByTime(1000)
    await nextTick()

    expect(wrapper.find('.test-dom').text()).toBe('true') // 节流时间后应为 true
    wrapper.unmount()
  })

  it('should return false immediately when loading is false', () => {
    const loading = ref(false)
    const throttled = useThrottleRender(loading, 1000)
    expect(throttled.value).toBe(false)
  })

  it('should return the same value immediately when throttle is 0', () => {
    const loading = ref(true)
    const throttled = useThrottleRender(loading, 0)
    expect(throttled.value).toBe(true) // 应与 loading 相同
  })

  it('should throttle rendering and update when loading changes', async () => {
    const loading = ref(true)
    const throttled = useThrottleRender(loading, 1000)
    expect(throttled.value).toBe(false) // 初始为 false
    loading.value = false
    expect(throttled.value).toBe(false) // 应立即保持 false

    vi.advanceTimersByTime(250)
    await nextTick()

    loading.value = true
    expect(throttled.value).toBe(false) // 节流时间后仍应为 false
  })

  it('should use `initVal` as initial value when pass `{ initVal: true/false }`', async () => {
    const loading = ref(false)
    const throttled = useThrottleRender(loading, { initVal: true })
    expect(throttled.value).toBe(true)
    const throttled2 = useThrottleRender(loading, { initVal: false })
    expect(throttled2.value).toBe(false)
  })

  it('should throttle on display and disappear when pass `{ leading: xxx, trailing: xxx }`', async () => {
    const loading = ref(false)
    const throttled = useThrottleRender(loading, {
      leading: 200,
      trailing: 200,
    })
    expect(throttled.value).toBe(false) // 未传入 initVal 时初始为 false
    loading.value = true
    await nextTick()
    expect(throttled.value).toBe(false) // 在节流时间到来前应保持 false

    vi.advanceTimersByTime(250)
    await nextTick()

    expect(throttled.value).toBe(true) // leading 时间后应为 true
    loading.value = false
    await nextTick()
    expect(throttled.value).toBe(true) // 在 trailing 时间到来前应保持 true

    vi.advanceTimersByTime(250)
    await nextTick()

    expect(throttled.value).toBe(false) // trailing 时间后应为 false
  })
})
