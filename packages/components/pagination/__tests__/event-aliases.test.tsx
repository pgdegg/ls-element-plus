import { h, toHandlers } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Pagination from '../src/pagination'

import type { PaginationEmits } from '../src/pagination'

describe('pagination event aliases', () => {
  it.each(['size-change', 'sizeChange'] as const)(
    'accepts %s listeners without duplicate callbacks',
    (event) => {
      const listener = vi.fn()
      const events: Partial<Record<keyof PaginationEmits, typeof listener>> = {
        [event]: listener,
      }
      const wrapper = mount(() =>
        h(Pagination, { total: 100, ...toHandlers(events) })
      )
      wrapper.findComponent(Pagination).vm.$emit('size-change', 20)
      expect(listener).toHaveBeenCalledExactlyOnceWith(20)
      wrapper.unmount()
    }
  )
  it.each([
    'current-change',
    'currentChange',
    'prev-click',
    'prevClick',
    'next-click',
    'nextClick',
  ] as const)('accepts %s listeners', (event) => {
    const listener = vi.fn()
    const events: Partial<Record<keyof PaginationEmits, typeof listener>> = {
      [event]: listener,
    }
    const wrapper = mount(() =>
      h(Pagination, { total: 100, ...toHandlers(events) })
    )
    const canonical = event.replace(
      /[A-Z]/g,
      (letter) => `-${letter.toLowerCase()}`
    ) as 'current-change' | 'prev-click' | 'next-click'
    wrapper.findComponent(Pagination).vm.$emit(canonical, 2)
    expect(listener).toHaveBeenCalledExactlyOnceWith(2)
    wrapper.unmount()
  })
})
