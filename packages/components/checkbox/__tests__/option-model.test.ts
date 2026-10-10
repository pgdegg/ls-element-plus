import { describe, expect, test } from 'vitest'
import { createOptionModelAdapter } from '@element-plus/hooks'

describe('option model adapter', () => {
  test('zero and false object values round trip and disabled defaults are skipped', () => {
    const options = [
      { id: 0, label: 'zero', default: true },
      { id: false, label: 'false', default: 1 },
      { id: 3, disabled: true, default: true },
    ]
    const adapter = createOptionModelAdapter(() => ({
      options,
      valueKey: 'id',
      multiple: true,
    }))
    expect(adapter.decode(options)).toEqual([0, false, 3])
    expect(adapter.encode([0, false])).toEqual(options.slice(0, 2))
    expect(adapter.defaults('default')).toEqual(options.slice(0, 2))
    expect(adapter.labels([0, false])).toEqual(['zero', 'false'])
    expect(adapter.encode([])).toEqual([])
  })
})
