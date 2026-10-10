import { defineComponent, nextTick, provide, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { inputElementRegistrationKey } from '@element-plus/hooks'
import Input from '../src/input.vue'
import InputNumber from '../../input-number/src/input-number.vue'
import Form from '../../form/src/form.vue'
import CheckboxGroup from '../../checkbox/src/checkbox-group.vue'

describe('input customization', () => {
  test('keeps filters retained characters and escapes literal brackets', async () => {
    const value = ref('')
    const wrapper = mount(() => (
      <Input keeps="0-9" ignorekeeps="[]" v-model={value.value} />
    ))
    await wrapper.find('input').setValue('abc[12]')
    expect(value.value).toBe('[12]')
    wrapper.unmount()
  })

  test('registers the native number input once and releases it on unmount', async () => {
    const cleanup = vi.fn()
    const register = vi.fn(() => cleanup)
    const wrapper = mount(
      defineComponent({
        setup() {
          provide(inputElementRegistrationKey, register)
          return () => <InputNumber />
        },
      })
    )
    await nextTick()
    expect(register).toHaveBeenCalledTimes(1)
    expect(register).toHaveBeenCalledWith(wrapper.find('input').element)
    wrapper.unmount()
    expect(cleanup).toHaveBeenCalledTimes(1)
  })
  test('form readonly reacts and prevents number stepping', async () => {
    const readonly = ref(true)
    const value = ref(1)
    const wrapper = mount(() => (
      <Form readonly={readonly.value}>
        <InputNumber v-model={value.value} />
      </Form>
    ))
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
    await wrapper.find('.el-input-number__increase').trigger('mousedown')
    await wrapper.find('.el-input-number__increase').trigger('mouseup')
    expect(value.value).toBe(1)
    readonly.value = false
    await nextTick()
    await wrapper.find('input').trigger('keydown', { key: 'ArrowUp' })
    expect(value.value).toBe(2)
    wrapper.unmount()
  })

  test('number precision caps values and connected slots keep the actual input', async () => {
    const onPrecision = vi.fn()
    const value = ref(1.234)
    const wrapper = mount(() => (
      <InputNumber
        v-model={value.value}
        maxPrecision={2}
        onPrecision-exceed={onPrecision}
        v-slots={{ prepend: () => 'price', append: () => 'yuan' }}
      />
    ))
    await nextTick()
    expect(value.value).toBe(1.23)
    expect(onPrecision).toHaveBeenCalledWith(1.234, 2)
    expect(wrapper.find('.el-input-group__prepend').text()).toBe('price')
    expect(wrapper.find('input').exists()).toBe(true)
    wrapper.unmount()
  })
  test('explicit inheritance overrides remain reactive', async () => {
    const hide = ref<boolean | undefined>(undefined)
    const wrapper = mount(() => (
      <Form readonly hidePlaceholder>
        <Input
          hidePlaceholder={hide.value}
          ignoreParentReadonly
          placeholder="type here"
        />
      </Form>
    ))
    expect(wrapper.find('input').attributes('placeholder')).toBe('')
    expect(wrapper.find('input').attributes('readonly')).toBeUndefined()
    hide.value = false
    await nextTick()
    expect(wrapper.find('input').attributes('placeholder')).toBe('type here')
    wrapper.unmount()
  })
  test('registration follows the first enabled option when options change', async () => {
    const cleanup = vi.fn()
    const register = vi.fn(() => cleanup)
    const disabled = ref(false)
    const wrapper = mount(
      defineComponent({
        setup() {
          provide(inputElementRegistrationKey, register)
          return () => (
            <CheckboxGroup
              options={[
                { value: 'a', disabled: disabled.value },
                { value: 'b' },
              ]}
            />
          )
        },
      })
    )
    await nextTick()
    expect(register).toHaveBeenLastCalledWith(
      wrapper.findAll('input')[0].element
    )
    disabled.value = true
    await nextTick()
    expect(register).toHaveBeenLastCalledWith(
      wrapper.findAll('input')[1].element
    )
    expect(cleanup).toHaveBeenCalledTimes(1)
    wrapper.unmount()
    expect(cleanup).toHaveBeenCalledTimes(2)
  })

  test('delayed autofocus is cancelled on unmount', () => {
    vi.useFakeTimers()
    const wrapper = mount(Input, {
      props: { autofocus: true, focusDelay: 200 },
    })
    const focus = vi.spyOn(wrapper.find('input').element, 'focus')
    expect(wrapper.find('input').attributes('autofocus')).toBeUndefined()
    wrapper.unmount()
    vi.runAllTimers()
    expect(focus).not.toHaveBeenCalled()
    vi.useRealTimers()
  })
})
