import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Autocomplete from '../src/autocomplete.vue'

describe('autocomplete request lifecycle', () => {
  test('outdated callbacks cannot overwrite newer suggestions or revive unmounted state', async () => {
    const callbacks: ((items: { value: string }[]) => void)[] = []
    const fetch = vi.fn(
      (_query: string, cb: (items: { value: string }[]) => void) => {
        callbacks.push(cb)
      }
    )
    const wrapper = mount(Autocomplete, { props: { fetchSuggestions: fetch } })
    await wrapper.vm.getData('old')
    await wrapper.vm.getData('new')
    callbacks[1]([{ value: 'new' }])
    callbacks[0]([{ value: 'old' }])
    await flushPromises()
    expect(wrapper.vm.suggestions).toEqual([{ value: 'new' }])
    const getData = wrapper.vm.getData
    wrapper.unmount()
    await getData('after-unmount')
    expect(fetch).toHaveBeenCalledTimes(2)
  })
})
