import type { InjectionKey } from 'vue'
import type { SelectContext, SelectGroupContext } from './type'

// 为了让独立构建之间共享注入键，我们必须把 `Symbol` 转为字符串
export const selectGroupKey: InjectionKey<SelectGroupContext> =
  Symbol('ElSelectGroup')

export const selectKey: InjectionKey<SelectContext> = Symbol('ElSelect')
