import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Icon from '../src/icon.vue'

describe('sprite icon', () => {
  test('re-resolves async symbols and prefix changes', async () => {
    const wrapper = mount(Icon, {
      props: { symbol: 'test', prefix: ['missing', 'app'] },
    })
    expect(wrapper.find('svg').exists()).toBe(false)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.innerHTML = '<symbol id="app-test" name="test icon"><path /></symbol>'
    document.body.append(svg)
    await wrapper.setProps({ symbolVersion: 1 })
    await nextTick()
    expect(wrapper.find('use').attributes('href')).toBe('#app-test')
    expect(wrapper.attributes('title')).toBe('test icon')
    await wrapper.setProps({ symbol: 'other' })
    expect(wrapper.find('svg').exists()).toBe(false)
    wrapper.unmount()
    svg.remove()
  })
})
