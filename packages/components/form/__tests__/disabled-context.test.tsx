import { defineComponent, nextTick, provide, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Input from '@element-plus/components/input'
import Switch from '@element-plus/components/switch'
import Button, {
  ElButtonGroup as ButtonGroup,
} from '@element-plus/components/button'
import Form from '../src/form.vue'
import { componentDisabledContextKey } from '../src/constants'

describe('container disabled context', () => {
  it('reactively disables native controls despite explicit local false', async () => {
    const disabled = ref(false)
    const wrapper = mount(
      defineComponent({
        setup() {
          provide(componentDisabledContextKey, disabled)
          return () => (
            <div>
              <Input disabled={false} />
              <Switch disabled={false} />
              <ButtonGroup>
                <Button disabled={false}>Action</Button>
              </ButtonGroup>
            </div>
          )
        },
      })
    )
    expect(wrapper.find('input').attributes('disabled')).toBeUndefined()
    disabled.value = true
    await nextTick()
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.el-switch').classes()).toContain('is-disabled')
    disabled.value = false
    await nextTick()
    expect(wrapper.find('input').attributes('disabled')).toBeUndefined()
    expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    wrapper.unmount()
  })

  it('preserves local overrides of form disabled when the container is enabled', () => {
    const wrapper = mount(
      defineComponent({
        setup() {
          provide(componentDisabledContextKey, false)
          return () => (
            <Form disabled>
              <Input disabled={false} />
            </Form>
          )
        },
      })
    )
    expect(wrapper.find('input').attributes('disabled')).toBeUndefined()
    wrapper.unmount()
  })
})
