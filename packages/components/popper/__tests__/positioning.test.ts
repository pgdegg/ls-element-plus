import { createPopper } from '@popperjs/core'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { buildPopperOptions } from '../src/utils'

const rect = (
  x: number,
  y: number,
  width: number,
  height: number
): DOMRect => ({
  x,
  y,
  width,
  height,
  top: y,
  left: x,
  right: x + width,
  bottom: y + height,
  toJSON: () => ({}),
})

describe('悬浮面板边界定位', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  test('超大面板在双轴保持可见，窗口变大后恢复尺寸，销毁时还原样式', async () => {
    let viewportWidth = 480
    let viewportHeight = 320
    vi.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(
      () => viewportWidth
    )
    vi.spyOn(
      document.documentElement,
      'clientHeight',
      'get'
    ).mockImplementation(() => viewportHeight)
    vi.spyOn(
      document.documentElement,
      'getBoundingClientRect'
    ).mockImplementation(() => rect(0, 0, viewportWidth, viewportHeight))
    const reference = document.createElement('button')
    const popper = document.createElement('div')
    document.body.append(reference, popper)
    reference.getBoundingClientRect = () => rect(8, 240, 420, 28)
    popper.getBoundingClientRect = () =>
      rect(0, 0, popper.offsetWidth, popper.offsetHeight)
    Object.defineProperties(popper, {
      offsetWidth: {
        get: () =>
          Math.min(758, Number.parseFloat(popper.style.maxWidth) || 758),
      },
      offsetHeight: {
        get: () =>
          Math.min(388, Number.parseFloat(popper.style.maxHeight) || 388),
      },
      clientWidth: { get: () => popper.offsetWidth },
      clientHeight: { get: () => popper.offsetHeight },
      scrollWidth: { get: () => 758 },
      scrollHeight: { get: () => 388 },
    })
    const instance = createPopper(
      reference,
      popper,
      buildPopperOptions({
        placement: 'bottom',
        fallbackPlacements: ['bottom', 'top'],
        boundariesPadding: 8,
        popperOptions: { modifiers: [{ name: 'applyStyles', enabled: false }] },
      })
    )
    try {
      await instance.update()
      const { popperOffsets } = instance.state.modifiersData
      expect(instance.state.rects.popper.width).toBe(464)
      expect(instance.state.rects.popper.height).toBe(220)
      expect(popperOffsets!.x).toBeGreaterThanOrEqual(8)
      expect(popperOffsets!.y).toBeGreaterThanOrEqual(8)
      expect(
        popperOffsets!.x + instance.state.rects.popper.width
      ).toBeLessThanOrEqual(472)
      expect(
        popperOffsets!.y + instance.state.rects.popper.height
      ).toBeLessThanOrEqual(312)
      expect(popper.style.overflow).toBe('auto')
      viewportWidth = 960
      viewportHeight = 800
      await instance.update()
      expect(instance.state.rects.popper.width).toBe(758)
      expect(instance.state.rects.popper.height).toBe(388)
      expect(popper.style.overflow).toBe('')
    } finally {
      instance.destroy()
    }
    expect(popper.style.maxWidth).toBe('')
    expect(popper.style.maxHeight).toBe('')
    expect(popper.style.overflow).toBe('')
  })

  test('调用方仍可显式覆盖避让配置和关闭尺寸限制', () => {
    const options = buildPopperOptions({
      popperOptions: {
        modifiers: [
          {
            name: 'preventOverflow',
            options: { altAxis: false, tether: true },
          },
          { name: 'limitSize', enabled: false },
        ],
      },
    })
    const reference = document.createElement('button')
    const popper = document.createElement('div')
    const instance = createPopper(reference, popper, options)
    expect(
      instance.state.orderedModifiers.find(
        ({ name }) => name === 'preventOverflow'
      )?.options
    ).toMatchObject({ altAxis: false, tether: true })
    expect(
      instance.state.orderedModifiers.some(({ name }) => name === 'limitSize')
    ).toBe(false)
    instance.destroy()
  })
})
