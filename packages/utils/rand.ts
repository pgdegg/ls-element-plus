/**
 * @deprecated 请使用 `useId`、`useIdInjection`
 * 生成 [0, 1000] 范围内的随机数
 * 或许可替换为 [uuid](https://www.npmjs.com/package/uuid)
 */
export const generateId = (): number => Math.floor(Math.random() * 10000)

/**
 * @deprecated
 * 生成 (0, max - 1) 范围内的随机整数
 * @param max {number}
 */
export const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))
