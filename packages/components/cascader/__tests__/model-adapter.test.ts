import { describe, expect, test } from 'vitest'
import { createCascaderModelAdapter } from '../src/model-adapter'

import type { CascaderNode } from '../../cascader-panel'

describe('cascader model adapter', () => {
  test('preserves falsy values in bound paths', () => {
    const adapter = createCascaderModelAdapter(() => ({ bindPath: true }))
    expect(adapter.encode([0, false, null], [])).toEqual([0, false])
  })
  test('object models decode and clear without stale selection', () => {
    const adapter = createCascaderModelAdapter(() => ({
      valueKey: 'id',
      multiple: true,
    }))
    expect(adapter.decode([{ id: 0 }, { id: 2 }])).toEqual([0, 2])
    expect(adapter.encode([], [])).toEqual([])
  })
  test('intermediate models omit children and retain zero', () => {
    const parent = { value: 0, data: { id: 0, children: [] } }
    const leaf = {
      value: 2,
      data: { id: 2 },
      pathNodes: [parent, { value: 2, data: { id: 2 } }],
    } as unknown as CascaderNode
    const adapter = createCascaderModelAdapter(() => ({
      valueKey: 'id',
      middleFields: ['parent', 'leaf'],
    }))
    expect(adapter.encode(2, [leaf])).toEqual({
      parent: { id: 0 },
      leaf: { id: 2 },
    })
    expect(adapter.decode({ parent: { id: 0 }, leaf: { id: 2 } })).toBe(2)
    expect(adapter.encode(null, [])).toBeNull()
  })
})
