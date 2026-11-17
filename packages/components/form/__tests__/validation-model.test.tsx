import { reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Form from '../src/form.vue'
import FormItem from '../src/form-item.vue'

import type { RuleItem } from 'async-validator'

describe('表单完整模型校验', () => {
  test('自定义校验器取得当前完整模型并保留字段校验结果', async () => {
    const model = reactive({
      password: '123',
      confirm: '123',
      nested: { value: 1 },
    })
    const validator = vi.fn<NonNullable<RuleItem['validator']>>(
      (_rule, value, callback, _source, options) => {
        const data = Reflect.get(options, 'data') as typeof model
        callback(value === data.password ? undefined : new Error('密码不一致'))
      }
    )
    const wrapper = mount(() => (
      <Form model={model}>
        <FormItem prop="confirm" rules={[{ validator }]} />
      </Form>
    ))
    const form = wrapper.findComponent(Form)
    expect(await form.vm.validate()).toBe(true)
    expect(Reflect.get(validator.mock.calls[0][4], 'data')).toBe(model)
    expect(Reflect.get(validator.mock.calls[0][4], 'data').nested.value).toBe(1)
    model.password = '456'
    await expect(form.vm.validate()).rejects.toHaveProperty('confirm')
    wrapper.unmount()
  })
})
