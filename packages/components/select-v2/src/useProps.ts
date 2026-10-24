import { ref, watch } from 'vue'
import { get, isEqual } from 'lodash-unified'

import type { SelectV2Props } from './token'
import type { Option } from './select.types'

export interface Props {
  label?: string
  value?: string
  disabled?: string
  options?: string
}

export const defaultProps: Required<Props> = {
  label: 'label',
  value: 'value',
  disabled: 'disabled',
  options: 'options',
}

export function useProps(props: Pick<SelectV2Props, 'props'>) {
  const aliasProps = ref({ ...defaultProps, ...props.props })
  let cache = { ...props.props }

  watch(
    () => props.props,
    (val) => {
      // props 是对象，其属性可能在不改变引用的情况下被修改。这种情况下 watch 前后的值相等，因此这里使用缓存的前一个值进行比较。
      if (!isEqual(val, cache)) {
        aliasProps.value = { ...defaultProps, ...val }
        cache = { ...val }
      }
    },
    { deep: true }
  )

  const getLabel = (option: Option) => get(option, aliasProps.value.label)
  const getValue = (option: Option) => get(option, aliasProps.value.value)
  const getDisabled = (option: Option) => get(option, aliasProps.value.disabled)
  const getOptions = (option: Option) => get(option, aliasProps.value.options)

  return {
    aliasProps,
    getLabel,
    getValue,
    getDisabled,
    getOptions,
  }
}
