import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input from '../input'
import InputNumber from '../input-number'
import InputTag from '../input-tag'
import Autocomplete from '../autocomplete'
import Mention from '../mention'
import Select from '../select'
import SelectV2 from '../select-v2'
import TreeSelect from '../tree-select'
import Cascader from '../cascader'
import DatePicker from '../date-picker'
import TimePicker from '../time-picker'
import TimeSelect from '../time-select'

const options = [
  { value: 0, label: '零值对应的完整标签' },
  { value: 1, label: '另一个完整标签' },
]

describe('控件的原生完整内容提示', () => {
  for (const type of ['text', 'textarea']) {
    it(`${type} 输入框显示完整内容并随修改、清空更新`, async () => {
      const wrapper = mount(Input, {
        props: { type, modelValue: '完整输入内容' },
      })
      try {
        const input = wrapper.get(type === 'textarea' ? 'textarea' : 'input')
        expect(wrapper.attributes('title')).toBe('完整输入内容')
        expect(input.attributes('title')).toBe('完整输入内容')
        await wrapper.setProps({
          modelValue: '更新后的完整内容',
          disabled: true,
        })
        expect(input.attributes('title')).toBe('更新后的完整内容')
        await wrapper.setProps({ modelValue: '' })
        expect(input.attributes('title')).toBeUndefined()
        expect(wrapper.attributes('title')).toBeUndefined()
      } finally {
        wrapper.unmount()
      }
    })
  }

  it('输入框使用格式化后的文字并尊重显式 title 和空 title', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 0,
        readonly: true,
        formatter: (value) => `金额：${value}`,
      },
    })
    try {
      expect(wrapper.get('input').attributes('title')).toBe('金额：0')
      await wrapper.setProps({ ...{ title: '自定义提示' }, modelValue: 0 })
      expect(wrapper.get('input').attributes('title')).toBe('自定义提示')
      await wrapper.setProps({ ...{ title: '' }, modelValue: 0 })
      expect(wrapper.get('input').attributes('title')).toBe('')
    } finally {
      wrapper.unmount()
    }
  })

  for (const props of [{ type: 'password' }, { showPassword: true }]) {
    it('密码输入框不会将密码写入自动提示', () => {
      const wrapper = mount(Input, {
        props: { ...props, modelValue: '密码内容' },
      })
      try {
        expect(wrapper.attributes('title')).toBeUndefined()
        expect(wrapper.get('input').attributes('title')).toBeUndefined()
      } finally {
        wrapper.unmount()
      }
    })
  }

  it('数字输入框保留零值提示', () => {
    const wrapper = mount(InputNumber, {
      props: { modelValue: 0, disabled: true },
    })
    try {
      expect(wrapper.get('input').attributes('title')).toBe('0')
    } finally {
      wrapper.unmount()
    }
  })

  for (const Component of [Autocomplete, Mention]) {
    it(`${Component.name} 输入内容使用共用输入框的完整提示`, async () => {
      const wrapper = mount(Component, {
        props: { modelValue: '完整输入内容' },
      })
      try {
        expect(wrapper.get('input').attributes('title')).toBe('完整输入内容')
        await wrapper.setProps({ modelValue: '更新内容' })
        expect(wrapper.get('input').attributes('title')).toBe('更新内容')
      } finally {
        wrapper.unmount()
      }
    })
  }

  it('标签输入框包含被折叠的标签和正在输入的文字', async () => {
    const wrapper = mount(InputTag, {
      props: { modelValue: ['完整标签一', '完整标签二'], collapseTags: true },
    })
    try {
      expect(wrapper.attributes('title')).toBe('完整标签一\n完整标签二')
      await wrapper.get('input').setValue('正在输入')
      expect(wrapper.get('input').attributes('title')).toBe(
        '完整标签一\n完整标签二\n正在输入'
      )
      await wrapper.setProps({ modelValue: [] })
      await wrapper.get('input').setValue('')
      expect(wrapper.attributes('title')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })

  for (const Component of [Select, SelectV2]) {
    describe(`${Component.name} 的选中项提示`, () => {
      it('尚未选择时提示筛选框内的完整输入内容', async () => {
        const wrapper = mount(Component, {
          props: { options, filterable: true },
        })
        try {
          await wrapper.get('input').setValue('完整的筛选输入内容')
          expect(wrapper.attributes('title')).toBe('完整的筛选输入内容')
          await wrapper.get('input').setValue('')
          expect(wrapper.attributes('title')).toBeUndefined()
        } finally {
          wrapper.unmount()
        }
      })

      it('下拉选项通过原生提示保留完整标签', async () => {
        const wrapper = mount(Component, {
          props: { options, teleported: false },
        })
        try {
          await wrapper.get('.el-select__wrapper').trigger('click')
          await nextTick()
          expect(wrapper.get('[role="option"]').attributes('title')).toBe(
            options[0].label
          )
        } finally {
          wrapper.unmount()
        }
      })

      it('默认显示完整标签，开关仅改变提示并保留零值', async () => {
        const wrapper = mount(Component, { props: { modelValue: 0, options } })
        try {
          await nextTick()
          expect(wrapper.attributes('title')).toBe(options[0].label)
          await wrapper.setProps({ showValueInTitle: true })
          expect(wrapper.attributes('title')).toBe(`0「${options[0].label}」`)
          expect(wrapper.get('.el-select__placeholder').text()).toBe(
            options[0].label
          )
          await wrapper.setProps({ modelValue: 1, disabled: true })
          expect(wrapper.attributes('title')).toBe(`1「${options[1].label}」`)
          await wrapper.setProps({ modelValue: undefined })
          expect(wrapper.attributes('title')).toBeUndefined()
        } finally {
          wrapper.unmount()
        }
      })

      it('多选提示包含折叠标签并兼容分隔符绑定', async () => {
        const wrapper = mount(Component, {
          props: {
            modelValue: '甲,乙',
            multiple: true,
            separator: ',',
            collapseTags: true,
            options: [
              { value: '甲', label: '完整标签甲' },
              { value: '乙', label: '完整标签乙' },
            ],
          },
        })
        try {
          await nextTick()
          expect(wrapper.attributes('title')).toBe('完整标签甲\n完整标签乙')
          await wrapper.setProps({ showValueInTitle: true })
          expect(wrapper.attributes('title')).toBe(
            '甲「完整标签甲」\n乙「完整标签乙」'
          )
          await wrapper.setProps({ modelValue: '乙' })
          expect(wrapper.attributes('title')).toBe('乙「完整标签乙」')
          await wrapper.setProps({ modelValue: '' })
          expect(wrapper.attributes('title')).toBeUndefined()
        } finally {
          wrapper.unmount()
        }
      })

      it('对象值使用 valueKey，标签变化后及时更新，显式 title 优先', async () => {
        const value = { id: { code: 0 } }
        const wrapper = mount(Component, {
          props: {
            modelValue: value,
            valueKey: 'id.code',
            options: [{ value, label: '对象标签' }],
            showValueInTitle: true,
          },
        })
        try {
          await nextTick()
          expect(wrapper.attributes('title')).toBe('0「对象标签」')
          await wrapper.setProps({
            options: [{ value, label: '新的对象标签' }],
          })
          await nextTick()
          expect(wrapper.attributes('title')).toBe('0「新的对象标签」')
          await wrapper.setProps({ ...{ title: '' }, modelValue: value })
          expect(wrapper.attributes('title')).toBe('')
        } finally {
          wrapper.unmount()
        }
      })

      it('布尔选项保留 false 值', async () => {
        const wrapper = mount(Component, {
          props: {
            modelValue: false,
            options: [{ value: false, label: '否的完整标签' }],
            showValueInTitle: true,
          },
        })
        try {
          await nextTick()
          expect(wrapper.attributes('title')).toBe('false「否的完整标签」')
        } finally {
          wrapper.unmount()
        }
      })
    })
  }

  it('树选择器继承提示属性并支持自定义字段及折叠多选', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        nodeKey: 'id',
        props: { label: 'name', children: 'nodes' },
        data: [
          { id: 0, name: '树标签零' },
          { id: 1, name: '树标签一' },
        ],
        modelValue: [0, 1],
        multiple: true,
        showCheckbox: true,
        collapseTags: true,
      },
    })
    try {
      await nextTick()
      expect(wrapper.attributes('title')).toBe('树标签零\n树标签一')
      await wrapper.setProps({ showValueInTitle: true })
      expect(wrapper.attributes('title')).toBe('0「树标签零」\n1「树标签一」')
      await wrapper.setProps({ modelValue: [] })
      expect(wrapper.attributes('title')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })

  it('树选择器使用懒加载缓存标签生成原生提示', async () => {
    const wrapper = mount(TreeSelect, {
      props: {
        lazy: true,
        data: [],
        cacheData: [{ value: 0, label: '缓存中的完整标签' }],
        modelValue: 0,
        showValueInTitle: true,
      },
    })
    try {
      await nextTick()
      await nextTick()
      expect(wrapper.attributes('title')).toBe('0「缓存中的完整标签」')
    } finally {
      wrapper.unmount()
    }
  })

  const cascaderOptions = [
    { value: 0, label: '父级完整标签', children: options },
  ]

  it('级联提示展示完整路径，尊重路径配置并保持控件文字不变', async () => {
    const wrapper = mount(Cascader, {
      props: { options: cascaderOptions, modelValue: [0, 1] },
    })
    try {
      await nextTick()
      const input = wrapper.get<HTMLInputElement>('input')
      expect(input.attributes('title')).toBe('父级完整标签 / 另一个完整标签')
      const text = input.element.value
      await wrapper.setProps({ showValueInTitle: true })
      expect(input.attributes('title')).toBe(
        '0 / 1「父级完整标签 / 另一个完整标签」'
      )
      expect(input.element.value).toBe(text)
      await wrapper.setProps({ showAllLevels: false })
      expect(input.attributes('title')).toBe('0 / 1「另一个完整标签」')
      await wrapper.setProps({ modelValue: null })
      expect(input.attributes('title')).toBeUndefined()
    } finally {
      wrapper.unmount()
    }
  })

  it('级联多选提示包含折叠项并支持仅绑定叶子值', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options: cascaderOptions,
        modelValue: [0, 1],
        props: { multiple: true, emitPath: false },
        collapseTags: true,
        showValueInTitle: true,
      },
    })
    try {
      await nextTick()
      expect(wrapper.get('input').attributes('title')).toBe(
        '0「父级完整标签 / 零值对应的完整标签」\n1「父级完整标签 / 另一个完整标签」'
      )
      await wrapper.setProps({
        ...{ title: '自定义级联提示' },
        modelValue: [0, 1],
      })
      expect(wrapper.get('input').attributes('title')).toBe('自定义级联提示')
    } finally {
      wrapper.unmount()
    }
  })

  for (const Component of [DatePicker, TimePicker]) {
    it(`${Component.name} 的单值输入框提示格式化内容`, async () => {
      const wrapper = mount(Component, {
        props: { modelValue: new Date(2026, 10, 5, 9, 30), disabled: true },
      })
      try {
        await nextTick()
        const input = wrapper.get<HTMLInputElement>('input')
        expect(input.element.value).not.toBe('')
        expect(input.attributes('title')).toBe(input.element.value)
      } finally {
        wrapper.unmount()
      }
    })

    it(`${Component.name} 的范围输入框和整个控件均提示完整范围`, async () => {
      const isDate = Component === DatePicker
      const wrapper = mount(Component, {
        props: {
          modelValue: [
            new Date(2026, 10, 5, 9, 30),
            new Date(2026, 10, 6, 18, 30),
          ],
          ...(isDate ? { type: 'daterange' as const } : { isRange: true }),
        },
      })
      try {
        await nextTick()
        const inputs = wrapper.findAll<HTMLInputElement>('input')
        const title = inputs.map((input) => input.element.value).join(' - ')
        expect(title).not.toBe(' - ')
        expect(inputs[0].attributes('title')).toBe(title)
        expect(inputs[1].attributes('title')).toBe(title)
        expect(wrapper.get('.el-date-editor').attributes('title')).toBe(title)
        await wrapper.setProps({
          ...{ title: '' },
          modelValue: [
            new Date(2026, 10, 5, 9, 30),
            new Date(2026, 10, 6, 18, 30),
          ],
        })
        expect(inputs[0].attributes('title')).toBe('')
      } finally {
        wrapper.unmount()
      }
    })
  }

  it('时间选择器透传同时展示值和标签的配置', async () => {
    const wrapper = mount(TimeSelect, { props: { modelValue: '09:00' } })
    try {
      await nextTick()
      expect(wrapper.attributes('title')).toBe('09:00')
      await wrapper.setProps({ showValueInTitle: true })
      expect(wrapper.attributes('title')).toBe('09:00「09:00」')
    } finally {
      wrapper.unmount()
    }
  })
})
