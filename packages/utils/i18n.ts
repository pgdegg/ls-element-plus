/**
 * @deprecated 此函数已废弃，将在未来版本中移除。
 */
export const isKorean = (text: string) =>
  /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(text)
