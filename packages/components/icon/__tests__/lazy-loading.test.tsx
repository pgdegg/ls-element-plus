import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import Icon from '../src/icon.vue'

vi.mock('@vueuse/core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vueuse/core')>()),
  useIntersectionObserver: vi.fn((_target, callback) => {
    callback([{ isIntersecting: true }])
    return { stop: vi.fn() }
  }),
}))

describe('dynamic lazy icon loading', () => {
  afterEach(() => {
    document
      .querySelectorAll('[data-lazy-sprite]')
      .forEach((node) => node.remove())
    vi.unstubAllGlobals()
  })
  test('resolves a sprite inserted after mounting without an explicit version update', async () => {
    const wrapper = mount(Icon, { props: { symbol: 'dynamic', prefix: 'app' } })
    expect(wrapper.find('.el-icon__placeholder').exists()).toBe(true)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.dataset.lazySprite = ''
    svg.innerHTML = '<symbol id="app-dynamic" name="Dynamic"><path /></symbol>'
    document.body.append(svg)
    await flushPromises()
    expect(wrapper.find('use').attributes('href')).toBe('#app-dynamic')
    expect(wrapper.attributes('title')).toBe('Dynamic')
    wrapper.unmount()
  })
  test('finishes loading even if the unreferenced SVG image never emits a load event', async () => {
    const preloaders: EventTarget[] = []
    class ImageLoader extends EventTarget {
      src = ''
      constructor() {
        super()
        preloaders.push(this)
      }
    }
    vi.stubGlobal('Image', ImageLoader)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.dataset.lazySprite = ''
    svg.innerHTML =
      '<symbol id="app-photo"><image data-src="photo.png" /></symbol>'
    document.body.append(svg)
    const wrapper = mount(Icon, { props: { symbol: 'photo', prefix: 'app' } })
    expect(wrapper.find('use').exists()).toBe(false)
    preloaders[0].dispatchEvent(new Event('load'))
    await flushPromises()
    expect(wrapper.find('use').attributes('href')).toBe('#app-photo')
    svg.querySelector('image')!.dataset.src = 'replacement.png'
    await flushPromises()
    expect(wrapper.find('.el-icon__placeholder').exists()).toBe(true)
    preloaders[1].dispatchEvent(new Event('load'))
    await flushPromises()
    expect(wrapper.find('use').exists()).toBe(true)
    wrapper.unmount()
  })
})
