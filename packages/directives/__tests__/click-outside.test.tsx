import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ClickOutside from '../click-outside'

const AXIOM = 'Rem is the best girl'
const TRIGGER = 'trigger'
const OTHER_CLASS = 'other-class'

// 初始化一些局部变量
let mousedownObject: MouseEvent | null
let mouseupObject: MouseEvent | null
// 使用带实现的 mock handler，为上面注册的局部变量赋值。
const handler = vi.fn((eMouseup, eMousedown) => {
  mouseupObject = eMouseup
  mousedownObject = eMousedown
})

const _mount = () =>
  mount(
    {
      setup() {
        return () => (
          <div>
            <div class={OTHER_CLASS}>Hello</div>
            <div class={TRIGGER} v-click-outside={handler}>
              {AXIOM}
            </div>
          </div>
        )
      },
    },
    {
      global: {
        directives: {
          ClickOutside,
        },
      },
    }
  )

const triggerDocumentClickEvent = () => {
  const mousedown = new MouseEvent('mousedown', {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
  })
  document.dispatchEvent(mousedown)

  const mouseup = new MouseEvent('mouseup', {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
  })
  document.dispatchEvent(mouseup)
}

describe('Directives.vue', () => {
  beforeEach(() => {
    // 清除之前赋值的事件对象
    mousedownObject = null
    mouseupObject = null
  })
  it('render test', () => {
    const wrapper = _mount()
    expect(wrapper.text()).toContain(AXIOM)
    expect(handler).toHaveBeenCalledTimes(0)

    wrapper.unmount()
  })

  it('should trigger handler', async () => {
    const wrapper = _mount()
    await wrapper.find(`.${TRIGGER}`).trigger('mousedown')
    await wrapper.find(`.${TRIGGER}`).trigger('mouseup')
    expect(handler).toHaveBeenCalledTimes(0)

    triggerDocumentClickEvent()

    // 这里是不同之处
    // 我们测试该局部变量是否存在。
    expect(mousedownObject).toBeDefined()
    expect(mouseupObject).toBeDefined()
  })
})

describe('Multiple click-outside directives', () => {
  const firstHandler = vi.fn()
  const secondHandler = vi.fn()

  it('should support for multiple directives', async () => {
    const wrapper = mount(
      {
        setup() {
          return () => (
            <div class={OTHER_CLASS} v-click-outside={secondHandler}>
              <div class={TRIGGER} v-click-outside={firstHandler}>
                {AXIOM}
              </div>
            </div>
          )
        },
      },
      {
        global: {
          directives: {
            ClickOutside,
          },
        },
      }
    )

    // 点击 trigger 元素内部
    await wrapper.find(`.${TRIGGER}`).trigger('mousedown')
    await wrapper.find(`.${TRIGGER}`).trigger('mouseup')
    expect(firstHandler).toHaveBeenCalledTimes(0)
    expect(secondHandler).toHaveBeenCalledTimes(0)

    // 点击 trigger 元素外部
    triggerDocumentClickEvent()
    expect(firstHandler).toHaveBeenCalledTimes(1)
    expect(secondHandler).toHaveBeenCalledTimes(1)

    // 更新组件实例
    wrapper.vm.$forceUpdate()
    triggerDocumentClickEvent()
    expect(firstHandler).toHaveBeenCalledTimes(2)
    expect(secondHandler).toHaveBeenCalledTimes(2)
  })
})
