import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ElCheckbox, ElCheckboxGroup } from '../checkbox'
import { ElRadio, ElRadioGroup } from '../radio'
import TreeSelect from '../tree-select'

describe('current selection APIs', () => {
  it('keeps checkbox labels as display text without using them as group values', () => {
    const wrapper = mount(() => (
      <ElCheckboxGroup modelValue={['Display label']}>
        <ElCheckbox label="Display label" />
      </ElCheckboxGroup>
    ))
    try {
      expect(wrapper.text()).toBe('Display label')
      expect(wrapper.get<HTMLInputElement>('input').element.checked).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })

  it('keeps radio labels as display text without using them as values', () => {
    const wrapper = mount(() => (
      <ElRadioGroup modelValue="Display label">
        <ElRadio label="Display label" />
      </ElRadioGroup>
    ))
    try {
      expect(wrapper.text()).toBe('Display label')
      expect(wrapper.get<HTMLInputElement>('input').element.checked).toBe(false)
    } finally {
      wrapper.unmount()
    }
  })

  it('supports zero for the checked value through trueValue', async () => {
    const value = ref(1)
    const wrapper = mount(() => (
      <ElCheckbox v-model={value.value} trueValue={0} falseValue={1}>
        Current value
      </ElCheckbox>
    ))
    try {
      await wrapper.get('input').setValue(true)
      expect(value.value).toBe(0)
      await wrapper.get('input').setValue(false)
      expect(value.value).toBe(1)
    } finally {
      wrapper.unmount()
    }
  })

  it('exposes nested TreeSelect refs without forwarding the retired methods', () => {
    const wrapper = mount(TreeSelect, { props: { data: [] } })
    try {
      const exposed = wrapper.vm.$.exposed
      expect(exposed).toHaveProperty('treeRef')
      expect(exposed).toHaveProperty('selectRef')
      expect(exposed).not.toHaveProperty('getCheckedKeys')
      expect(exposed).not.toHaveProperty('focus')
    } finally {
      wrapper.unmount()
    }
  })
})
