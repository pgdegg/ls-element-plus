import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { expect, it, vi } from 'vitest'
import Select from '../src/select.vue'

it('notifies a query once even when there are no options', async () => {
  const onQueryChange = vi.fn()
  const wrapper = mount(Select, { props: { filterable: true, onQueryChange } })
  await wrapper.find('input').trigger('click')
  await nextTick()
  expect(onQueryChange.mock.calls).toEqual([['']])
  await wrapper.find('input').setValue('patient')
  await vi.waitFor(() => {
    expect(onQueryChange.mock.calls).toEqual([[''], ['patient']])
  })
  wrapper.unmount()
})
