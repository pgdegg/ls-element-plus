import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Select from '../src/select.vue'
import SelectV2 from '../../select-v2/src/select.vue'
import CheckboxGroup from '../../checkbox/src/checkbox-group.vue'

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
]
describe('selection customization', () => {
  for (const Component of [Select, SelectV2]) {
    test(`${Component.name} decodes delimited values and synchronizes actual labels`, async () => {
      const wrapper = mount(Component, {
        props: { multiple: true, separator: ',', modelValue: 'a,b', options },
      })
      await nextTick()
      expect(wrapper.vm.selectedLabel).toEqual(['Alpha', 'Beta'])
      expect(wrapper.emitted('update:label')?.at(-1)).toEqual(['Alpha,Beta'])
      await wrapper.setProps({ modelValue: '' })
      expect(wrapper.vm.selectedLabel).toEqual([])
      expect(wrapper.emitted('update:label')?.at(-1)).toEqual([''])
      wrapper.unmount()
    })
  }
  test('bulk checkbox changes preserve disabled values and respect bounds', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: {
        modelValue: ['locked'],
        options: [
          { value: 'locked', disabled: true },
          { value: 0 },
          { value: 'hidden', visible: false },
          { value: 'a' },
        ],
      },
    })
    wrapper.vm.toggleAll(true)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([
      ['locked', 0, 'a'],
    ])
    await wrapper.setProps({ modelValue: ['locked', 0, 'a'] })
    expect(wrapper.vm.allChecked).toBe(true)
    wrapper.vm.toggleAll(false)
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['locked']])
    await wrapper.setProps({ modelValue: ['locked'], max: 2 })
    const count = wrapper.emitted('update:modelValue')?.length
    wrapper.vm.toggleAll(true)
    expect(wrapper.emitted('update:modelValue')?.length).toBe(count)
    wrapper.unmount()
  })
})
