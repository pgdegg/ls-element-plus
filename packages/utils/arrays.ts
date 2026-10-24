import { isArray } from './types'

export const unique = <T>(arr: T[]) => [...new Set(arr)]

export const extractFirst = <T>(arr: T | T[]): T => {
  return isArray(arr) ? arr[0] : arr
}

type Many<T> = T | ReadonlyArray<T>
// TODO：重命名为 `ensureArray`
/** 类似 `_.castArray`，但 falsy 值返回空数组。 */
export const castArray = <T>(arr: Many<T>): T[] => {
  if (!arr && (arr as any) !== 0) return []
  return isArray(arr) ? arr : [arr as T]
}

// TODO：移除导入别名
// 避免命名冲突
export { castArray as ensureArray } from 'lodash-unified'
