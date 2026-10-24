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
