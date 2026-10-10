import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { parseQuickInput } from '../src/quick-input'
import TimePicker from '../src/time-picker'
import DatePicker from '../../date-picker/src/date-picker'

describe('quick input', () => {
  test.each([
    ['20261009', 'date', 'min', '2026-10-09 00:00:00'],
    ['2026/2', 'date', 'max', '2026-02-28 23:59:59'],
    ['2024', 'date', 'max', '2024-12-31 23:59:59'],
    ['202610091230', 'date-time', 'min', '2026-10-09 12:30:00'],
  ] as const)('parses %s', (input, type, defaultToExtreme, expected) => {
    expect(
      parseQuickInput(input, { type, defaultToExtreme })?.format(
        'YYYY-MM-DD HH:mm:ss'
      )
    ).toBe(expected)
  })

  test('parses time without moving it to a different calendar day', () => {
    const date = new Date()
    const result = parseQuickInput('1230', { type: 'time' })!
    expect(result.format('HH:mm:ss')).toBe('12:30:00')
    expect(result.date()).toBe(date.getDate())
    expect(result.month()).toBe(date.getMonth())
    expect(
      parseQuickInput('12', { type: 'time', defaultToExtreme: 'max' })?.format(
        'HH:mm:ss'
      )
    ).toBe('12:59:59')
  })

  test.each(['20260230', '20261301', 'garbage'])(
    'rejects invalid date %s',
    (input) => {
      expect(parseQuickInput(input, { type: 'date' })).toBeUndefined()
    }
  )

  test('native time input emits the configured value format', async () => {
    const wrapper = mount(TimePicker, {
      props: { quickInput: true, valueFormat: 'HH:mm:ss' },
      attachTo: document.body,
    })
    const input = wrapper.find('input')
    await input.setValue('1230')
    await input.trigger('keydown', { code: 'Enter' })
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('12:30:00')
    wrapper.unmount()
  })

  test('range start Enter focuses the end without emitting a partial model', async () => {
    const wrapper = mount(DatePicker, {
      props: { quickInput: true, type: 'daterange', valueFormat: 'YYYY-MM-DD' },
      attachTo: document.body,
    })
    const [start, end] = wrapper.findAll('input')
    await start.setValue('2026/2')
    await start.trigger('keydown', { code: 'Enter' })
    expect(document.activeElement).toBe(end.element)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await end.setValue('2026/2')
    await end.trigger('keydown', { code: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toEqual([
      '2026-02-01',
      '2026-02-28',
    ])
    wrapper.unmount()
  })
  test('quick entry honors readonly and disabled date constraints', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        quickInput: true,
        readonly: true,
        valueFormat: 'YYYY-MM-DD',
        disabledDate: (date: Date) => date.getFullYear() === 2026,
      },
    })
    const input = wrapper.find('input')
    await input.setValue('20261009')
    await input.trigger('keydown', { code: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await wrapper.setProps({ readonly: false })
    await input.trigger('keydown', { code: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    await input.setValue('20251009')
    await input.trigger('keydown', { code: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('2025-10-09')
    wrapper.unmount()
  })
})
