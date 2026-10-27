import { defineComponent, nextTick, provide, reactive, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input from '@element-plus/components/input'
import InputNumber from '@element-plus/components/input-number'
import InputTag from '@element-plus/components/input-tag'
import Autocomplete from '@element-plus/components/autocomplete'
import Mention from '@element-plus/components/mention'
import Select from '@element-plus/components/select'
import SelectV2 from '@element-plus/components/select-v2'
import TreeSelect from '@element-plus/components/tree-select'
import Cascader from '@element-plus/components/cascader'
import DatePicker from '@element-plus/components/date-picker'
import TimePicker from '@element-plus/components/time-picker'
import TimeSelect from '@element-plus/components/time-select'
import Form from '../src/form.vue'
import { componentDisabledContextKey } from '../src/constants'

import type { VNode } from 'vue'
import type { VueWrapper } from '@vue/test-utils'

interface PlaceholderProps {
  placeholder: string
  hidePlaceholder?: boolean
}

const controls: {
  name: string
  render: (props: PlaceholderProps) => VNode
  selector: string
}[] = [
  { name: 'Input', render: (props) => <Input {...props} />, selector: 'input' },
  {
    name: 'Textarea',
    render: (props) => <Input {...props} type="textarea" />,
    selector: 'textarea',
  },
  {
    name: 'InputNumber',
    render: (props) => <InputNumber {...props} />,
    selector: 'input',
  },
  {
    name: 'InputTag',
    render: (props) => <InputTag {...props} />,
    selector: 'input',
  },
  {
    name: 'Autocomplete',
    render: (props) => <Autocomplete {...props} />,
    selector: 'input',
  },
  {
    name: 'Mention',
    render: (props) => <Mention {...props} />,
    selector: 'input',
  },
  {
    name: 'Select',
    render: (props) => <Select {...props} />,
    selector: '.el-select__placeholder',
  },
  {
    name: 'SelectV2',
    render: (props) => <SelectV2 {...props} options={[]} />,
    selector: '.el-select__placeholder',
  },
  {
    name: 'TreeSelect',
    render: (props) => <TreeSelect {...props} data={[]} />,
    selector: '.el-select__placeholder',
  },
  {
    name: 'Cascader',
    render: (props) => <Cascader {...props} />,
    selector: 'input',
  },
  {
    name: 'DatePicker',
    render: (props) => <DatePicker {...props} />,
    selector: 'input',
  },
  {
    name: 'TimePicker',
    render: (props) => <TimePicker {...props} />,
    selector: 'input',
  },
  {
    name: 'TimeSelect',
    render: (props) => <TimeSelect {...props} />,
    selector: '.el-select__placeholder',
  },
]

function placeholder(wrapper: VueWrapper, selector: string) {
  const element = wrapper.get(selector)
  return selector.startsWith('.')
    ? element.text()
    : element.attributes('placeholder')
}

describe('inactive control placeholders', () => {
  it.each(controls)(
    '$name follows reactive form state and explicit overrides',
    async ({ render, selector }) => {
      const state = reactive({
        disabled: false,
        readonly: false,
        readonlyRaw: false,
        hide: undefined as boolean | undefined,
      })
      const wrapper = mount(() => (
        <Form
          disabled={state.disabled}
          readonly={state.readonly}
          readonlyRaw={state.readonlyRaw}
        >
          {render({
            placeholder: 'Choose a value',
            hidePlaceholder: state.hide,
          })}
        </Form>
      ))
      try {
        expect(placeholder(wrapper, selector)).toBe('Choose a value')
        for (const field of ['disabled', 'readonly', 'readonlyRaw'] as const) {
          state[field] = true
          await nextTick()
          expect(placeholder(wrapper, selector)).toBe('')
          state.hide = false
          await nextTick()
          expect(placeholder(wrapper, selector)).toBe('Choose a value')
          state.hide = undefined
          state[field] = false
          await nextTick()
          expect(placeholder(wrapper, selector)).toBe('Choose a value')
        }
        state.hide = true
        await nextTick()
        expect(placeholder(wrapper, selector)).toBe('')
      } finally {
        wrapper.unmount()
      }
    }
  )

  it('respects local readonly, container disabled, and form hiding exceptions', async () => {
    const disabled = ref(false)
    const wrapper = mount(
      defineComponent({
        setup() {
          provide(componentDisabledContextKey, disabled)
          return () => (
            <Form hidePlaceholder>
              <Input
                placeholder="Hidden"
                ignoreParentHidePlaceholder="form"
                readonly
              />
              <Input placeholder="Visible" hidePlaceholder={false} readonly />
              <Input
                placeholder="Editable"
                ignoreParentHidePlaceholder="form"
              />
            </Form>
          )
        },
      })
    )
    try {
      const inputs = wrapper.findAll('input')
      expect(inputs.map((input) => input.attributes('placeholder'))).toEqual([
        '',
        'Visible',
        'Editable',
      ])
      disabled.value = true
      await nextTick()
      expect(inputs.map((input) => input.attributes('placeholder'))).toEqual([
        '',
        'Visible',
        '',
      ])
    } finally {
      wrapper.unmount()
    }
  })

  it.each(['daterange', 'datetimerange'] as const)(
    'clears both %s placeholders and permits explicit display',
    async (type) => {
      const wrapper = mount(DatePicker, {
        props: {
          type,
          disabled: true,
          startPlaceholder: 'Start',
          endPlaceholder: 'End',
        },
      })
      try {
        expect(
          wrapper
            .findAll('input')
            .map((input) => input.attributes('placeholder'))
        ).toEqual(['', ''])
        await wrapper.setProps({ hidePlaceholder: false })
        expect(
          wrapper
            .findAll('input')
            .map((input) => input.attributes('placeholder'))
        ).toEqual(['Start', 'End'])
      } finally {
        wrapper.unmount()
      }
    }
  )

  it('retains selected labels when disabled', async () => {
    const wrapper = mount(() => (
      <Form disabled>
        <SelectV2 modelValue={1} options={[{ value: 1, label: 'Selected' }]} />
        <Input modelValue="Existing text" placeholder="Hidden" />
      </Form>
    ))
    try {
      await nextTick()
      expect(wrapper.get('.el-select__placeholder').text()).toBe('Selected')
      expect(
        wrapper.get<HTMLInputElement>('input.el-input__inner').element.value
      ).toBe('Existing text')
    } finally {
      wrapper.unmount()
    }
  })
})
