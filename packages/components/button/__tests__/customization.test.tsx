import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Button from '../src/button.vue'
import ButtonGroup from '../src/button-group.vue'

describe('button group customization', () => {
  test('group appearance and disabling react with explicit disabled exceptions', async () => {
    const wrapper = mount(ButtonGroup, {
      props: { disabled: true, plain: true },
      slots: {
        default: () => [
          <Button text>normal</Button>,
          <Button ignoreGroupDisabled>exception</Button>,
        ],
      },
    })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('disabled')).toBeDefined()
    expect(buttons[1].attributes('disabled')).toBeUndefined()
    expect(buttons[0].classes()).toContain('is-plain')
    await wrapper.setProps({ disabled: false, plain: false, link: true })
    expect(buttons[0].attributes('disabled')).toBeUndefined()
    expect(buttons[0].classes()).not.toContain('is-plain')
    expect(buttons[0].classes()).toContain('is-link')
    wrapper.unmount()
  })
})
