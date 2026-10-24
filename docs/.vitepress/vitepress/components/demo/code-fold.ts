/**
 * 基于缩进的代码折叠区域，对齐 VSCode 的
 * `indentation` 折叠策略：当下一条非空行缩进更深时，
 * 该行开启一个可折叠区域；区域就在第一条
 * 缩进回退到（或小于）起始行缩进的非空行之前结束。
 */

export const normalizeCodeFoldLines = (code: HTMLElement): HTMLElement[] => {
  for (const node of Array.from(code.childNodes)) {
    if (
      node.nodeType === Node.TEXT_NODE &&
      /^\s*$/.test(node.textContent ?? '')
    ) {
      const separator = document.createElement('span')
      separator.className = 'code-fold-separator'
      separator.textContent = node.textContent ?? ''
      node.replaceWith(separator)
    }
  }

  const lineEls: HTMLElement[] = []
  for (const node of Array.from(code.childNodes)) {
    if (node instanceof HTMLElement && node.classList.contains('line')) {
      node.classList.add('code-line')
      lineEls.push(node)
    }
  }

  return lineEls
}

export interface FoldRegion {
  /* 起始区域的行索引（保持可见） */
  start: number
  /* 最后一条被隐藏行的索引（含该行） */
  end: number
}

/**
 * 渲染后一个 tab 所占的列宽。必须与
 * `docs/.vitepress/vitepress/styles/code.scss` 中代码块的 `tab-size: 4` 规则一致。
 */
const TAB_SIZE = 4

export const getIndent = (line: string): number => {
  let indent = 0
  for (const ch of line) {
    if (ch === ' ') indent += 1
    // tab 会跳到下一个制表位，因此混用 tab/空格前缀
    // 计算出与其渲染时一致的列宽
    else if (ch === '\t')
      indent = Math.floor(indent / TAB_SIZE) * TAB_SIZE + TAB_SIZE
    else break
  }
  return indent
}

const isBlank = (line: string) => line.trim() === ''

export const computeFoldRegions = (lines: string[]): FoldRegion[] => {
  const regions: FoldRegion[] = []

  for (let start = 0; start < lines.length - 1; start++) {
    if (isBlank(lines[start])) continue
    const indent = getIndent(lines[start])

    // `start` 之后第一条缩进回退到 `indent` 的非空行
    let bound = -1
    for (let i = start + 1; i < lines.length; i++) {
      if (isBlank(lines[i])) continue
      if (getIndent(lines[i]) <= indent) {
        bound = i
        break
      }
    }
    if (bound === -1) bound = lines.length

    // 末尾空行不属于该区域
    let end = bound - 1
    while (end > start && isBlank(lines[end])) end--

    // 仅当区域确实隐藏至少一行时才折叠；这样
    // 已经意味着 `start` 之后第一条非空行缩进更深
    if (end > start) {
      regions.push({ start, end })
    }
  }

  return regions
}
