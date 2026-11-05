import { camelize, hyphenate, capitalize as toCapitalize } from '@vue/shared'

export { camelize, hyphenate }
export const kebabCase = hyphenate

/**
 * 派生自 {@link https://github.com/sindresorhus/escape-string-regexp}
 */
export const escapeStringRegexp = (string = '') =>
  string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')

// 注意：完善 capitalize 的类型。待该 [PR](https://github.com/vuejs/core/pull/6212) 合并后恢复原有代码
export const capitalize = <T extends string>(str: T) =>
  toCapitalize(str) as Capitalize<T>

/**
 * @description 生成选中项的原生悬停提示，保留零值和布尔值。
 * @param label 完整展示标签。
 * @param value 选项值或已格式化的级联路径。
 * @param showValue 是否同时显示选项值。
 */
export const formatValueTitle = (
  label: unknown,
  value: unknown,
  showValue = false
) => {
  const text = String(label ?? '')
  if (!showValue || value === undefined || value === null) return text
  return `${String(value)}「${text}」`
}
