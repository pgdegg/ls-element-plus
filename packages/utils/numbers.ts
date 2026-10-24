/**
 * 由于浏览器渲染与计算存在精度丢失问题，
 * 边界检查不能仅依据值是否相等；
 * 允许一定范围内的波动。
 */
export function isGreaterThan(a: number, b: number, epsilon = 0.03) {
  return a - b > epsilon
}
