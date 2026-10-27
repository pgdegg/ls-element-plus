import path from 'path'
import { describe, expect, it } from 'vitest'
import { projRoot } from '@element-plus/build-utils'
import {
  getRuntimePropDefinition,
  resolveRuntimePropsFile,
} from '../src/plugins/supply-validator'

describe('runtime prop definition resolution', () => {
  it.each([
    ['ButtonProps', 'buttonPropDefs'],
    ['UseTooltipProps', 'tooltipPropDefs'],
    ['ElTooltipContentProps', 'tooltipContentPropDefs'],
    ['CascaderComponentProps', 'cascaderPropDefs'],
    ['HueSliderProps', 'alphaSliderPropDefs'],
    ['TreeNodeProps', 'treeNodePropDefs'],
    ['SelectProps', 'selectProps'],
    ['TimePickerDefaultProps', 'timePickerDefaultProps'],
  ])(
    'resolves %s to its actual runtime definition',
    (propsType, definition) => {
      expect(
        getRuntimePropDefinition(propsType, `export const ${definition} = {}`)
      ).toBe(definition)
    }
  )

  it('preserves current unmarked definitions instead of guessing a retired name', () => {
    expect(
      getRuntimePropDefinition('TreeProps', 'export const treeProps = {}')
    ).toBe('treeProps')
  })

  it.each([
    './skeleton',
    './skeleton.ts',
    '@element-plus/components/skeleton/src/skeleton',
  ])('resolves runtime definition source from %s', (specifier) => {
    const directory = path.join(projRoot, 'packages/components/skeleton/src')
    expect(
      resolveRuntimePropsFile(path.join(directory, 'skeleton.vue'), specifier)
    ).toBe(path.join(directory, 'skeleton.ts'))
  })
})
