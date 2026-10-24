import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Icon from '../src/icon.vue'

const { intersect } = vi.hoisted(() => ({
  intersect: {
    callback: undefined as
      undefined | ((entries: { isIntersecting: boolean }[]) => void),
  },
}))
vi.mock('@vueuse/core', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@vueuse/core')>()),
  useIntersectionObserver: vi.fn((_target, callback) => {
    intersect.callback = callback
    return { stop: vi.fn() }
  }),
}))

describe('sprite icon', () => {
  test('re-resolves async symbols and prefix changes', async () => {
    const wrapper = mount(Icon, {
      props: { symbol: 'test', prefix: ['missing', 'app'] },
    })
    expect(wrapper.find('.el-icon__placeholder').exists()).toBe(true)
    expect(wrapper.find('use').exists()).toBe(false)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.innerHTML = '<symbol id="app-test" name="test icon"><path /></symbol>'
    document.body.append(svg)
    await wrapper.setProps({ symbolVersion: 1 })
    await nextTick()
    expect(wrapper.find('use').attributes('href')).toBe('#app-test')
    expect(wrapper.attributes('title')).toBe('test icon')
    await wrapper.setProps({ symbol: 'other' })
    expect(wrapper.find('.el-icon__placeholder').exists()).toBe(true)
    wrapper.unmount()
    svg.remove()
  })

  test('keeps an inline placeholder until all lazy images load', async () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.innerHTML =
      '<symbol id="image-test"><image data-src="first.png" /><image data-src="second.png" /></symbol>'
    document.body.append(svg)
    const images = svg.querySelectorAll('image')
    const wrapper = mount(Icon, {
      props: { symbol: 'test', prefix: 'image', size: 24, color: 'red' },
    })
    expect(wrapper.find('.el-icon__placeholder').attributes('viewBox')).toBe(
      '0 0 24 24'
    )
    expect(images[0].hasAttribute('href')).toBe(false)
    intersect.callback!([{ isIntersecting: true }])
    expect(images[0].getAttribute('href')).toBe('first.png')
    images[0].dispatchEvent(new Event('load'))
    await flushPromises()
    expect(wrapper.find('.el-icon__placeholder').exists()).toBe(true)
    images[1].dispatchEvent(new Event('load'))
    await flushPromises()
    expect(wrapper.find('.el-icon__placeholder').exists()).toBe(false)
    expect(wrapper.find('use').attributes('href')).toBe('#image-test')

    const second = mount(Icon, { props: { symbol: 'test', prefix: 'image' } })
    intersect.callback!([{ isIntersecting: true }])
    await flushPromises()
    expect(second.find('use').attributes('href')).toBe('#image-test')
    wrapper.unmount()
    second.unmount()
    svg.remove()
  })

  test('retains the placeholder on failure and ignores an old image after switching symbols', async () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.innerHTML =
      '<symbol id="image-old"><image data-src="old.png" /></symbol><symbol id="image-new"><image data-src="new.png" /></symbol>'
    document.body.append(svg)
    const images = svg.querySelectorAll('image')
    const wrapper = mount(Icon, { props: { symbol: 'old', prefix: 'image' } })
    intersect.callback!([{ isIntersecting: true }])
    await wrapper.setProps({ symbol: 'new' })
    images[0].dispatchEvent(new Event('load'))
    await flushPromises()
    expect(wrapper.find('.el-icon__placeholder').exists()).toBe(true)
    images[1].dispatchEvent(new Event('error'))
    await flushPromises()
    expect(wrapper.find('.el-icon__placeholder').exists()).toBe(true)
    expect(wrapper.find('use').exists()).toBe(false)
    await wrapper.setProps({ symbol: undefined })
    expect(wrapper.find('.el-icon__placeholder').exists()).toBe(false)
    wrapper.unmount()
    svg.remove()
  })

  test('preserves ordinary icon slots', () => {
    const wrapper = mount(Icon, {
      slots: { default: '<svg class="slot-icon"><path /></svg>' },
    })
    expect(wrapper.find('.slot-icon').exists()).toBe(true)
    expect(wrapper.find('.el-icon__placeholder').exists()).toBe(false)
    wrapper.unmount()
  })
})
