import { ensureArray as castArray } from '@element-plus/utils'

import type { Arrayable } from '@element-plus/utils'

export type InputPropsKeepsType = Arrayable<string | RegExp>

/**
 * 构建一个正则表达式，用于保留输入框中符合规则的字符
 * @param rules 规则列表，支持预设的字符集和自定义正则表达式
 * @param ignoreKeeps 忽略特定格式的字符内容，仅在开启 rules 时生效
 */
export const buildKeepRegExp = (
  rules?: InputPropsKeepsType,
  ignoreKeeps?: Arrayable<string>
): RegExp | null => {
  if (!rules) {
    return null
  }

  /** 字符串字符集片段，最终拼入 `[^...]` 字符类 */
  const charSets: string[] = []
  /** 来自 RegExp 规则的 source，表示「需保留」的额外模式 */
  const regexSources: string[] = []

  for (const rule of castArray(rules)) {
    // 处理自定义正则：提取 source，作为「保留」模式使用
    if (rule instanceof RegExp) {
      regexSources.push(rule.source)
      continue
    }

    switch (rule) {
      case 'a-z':
        charSets.push('a-z')
        break
      case 'A-Z':
        charSets.push('A-Z')
        break
      case '0-9':
        charSets.push('0-9')
        break
      case 'a-zA-Z': // 大小写字母
        charSets.push('a-zA-Z')
        break
      case 'a-z0-9': // 小写字母 + 数字
        charSets.push('a-z0-9')
        break
      case 'A-Z0-9': // 大写字母 + 数字
        charSets.push('A-Z0-9')
        break
      case 'a-zA-Z0-9': // 大小写字母 + 数字
        charSets.push('0-9a-zA-Z')
        break
      default:
        // 非预设字符串：做基础转义后当作字符集片段
        charSets.push((rule as string).replace(/[-\\^\][]/g, '\\$&'))
    }
  }

  // 处理 ignoreKeeps：将忽略的字符也加入保留字符集
  if (ignoreKeeps) {
    for (const ignoreChar of castArray(ignoreKeeps)) {
      // 做基础转义后当作字符集片段
      charSets.push(ignoreChar.replace(/[-\\^\][]/g, '\\$&'))
    }
  }

  if (!charSets.length && !regexSources.length) {
    return null
  }

  // 仅含字符串规则：使用简洁的否定字符类 [^...]
  if (!regexSources.length) {
    return new RegExp(`[^${charSets.join('')}]`, 'g')
  }

  // 含 RegExp 规则：将所有「保留」模式合并，使用负向先行断言匹配待移除字符
  const keepParts: string[] = []
  if (charSets.length) {
    keepParts.push(`[${charSets.join('')}]`)
  }
  keepParts.push(...regexSources.map((s) => `(?:${s})`))

  return new RegExp(`(?!${keepParts.join('|')})[\\s\\S]`, 'g')
}
