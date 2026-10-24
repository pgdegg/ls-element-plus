import { ensureArray, isFirefox } from '@element-plus/utils'

import type { MentionCtx, MentionOption } from './types'

export const filterOption = <T extends MentionOption = MentionOption>(
  pattern: string,
  option: T & MentionOption
): boolean => {
  const lowerCase = pattern.toLowerCase()
  const label = option.label || option.value || ''
  return label.toLowerCase().includes(lowerCase)
}

export const getMentionCtx = (
  inputEl: HTMLInputElement | HTMLTextAreaElement,
  prefix: string | string[],
  split: string
) => {
  const { selectionEnd } = inputEl
  if (selectionEnd === null) return
  const inputValue = inputEl.value
  const prefixArray = ensureArray(prefix)
  let splitIndex = -1
  let mentionCtx: MentionCtx | undefined
  for (let i = selectionEnd - 1; i >= 0; --i) {
    const char = inputValue[i]
    if (
      splitIndex === -1 &&
      (char === split || char === '\n' || char === '\r')
    ) {
      splitIndex = i
      continue
    }
    if (prefixArray.includes(char)) {
      const end = splitIndex === -1 ? selectionEnd : splitIndex
      const pattern = inputValue.slice(i + 1, end)
      mentionCtx = {
        pattern,
        start: i + 1,
        end,
        prefix: char,
        prefixIndex: i,
        splitIndex,
        selectionEnd,
      }
      break
    }
  }
  return mentionCtx
}

/**
 * fork from textarea-caret-position
 * https://github.com/component/textarea-caret-position
 * The MIT License (MIT)
 * Copyright (c) 2015 Jonathan Ong me@jongleberry.com
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
export const getCursorPosition = (
  element: HTMLInputElement | HTMLTextAreaElement,
  options = {
    debug: false,
    useSelectionEnd: false,
  }
) => {
  const selectionStart =
    element.selectionStart !== null ? element.selectionStart : 0
  const selectionEnd = element.selectionEnd !== null ? element.selectionEnd : 0
  const position = options.useSelectionEnd ? selectionEnd : selectionStart
  // 我们将把下面的属性复制到镜像 div 中。
  // 注意，某些浏览器（如 Firefox）不会把属性合并
  // 为简写形式（例如 padding-top、padding-bottom 等 -> padding），
  // 因此我们必须显式列出每一个属性。
  const properties: string[] = [
    'direction', // RTL 支持
    'boxSizing',
    'width', // 在 Chrome 和 IE 上排除滚动条，使镜像 div 的换行与 textarea 完全一致
    'height',
    'overflowX',
    'overflowY', // 为 IE 复制滚动条
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderStyle',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/font
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'fontSizeAdjust',
    'lineHeight',
    'fontFamily',
    'textAlign',
    'textTransform',
    'textIndent',
    'textDecoration', // 可能没有差别，但稳妥起见
    'letterSpacing',
    'wordSpacing',
    'tabSize',
    'MozTabSize',
  ]

  if (options.debug) {
    const el = document.querySelector(
      '#input-textarea-caret-position-mirror-div'
    )
    if (el?.parentNode) el.parentNode.removeChild(el)
  }

  // 镜像 div 将复刻 textarea 的样式
  const div = document.createElement('div')
  div.id = 'input-textarea-caret-position-mirror-div'
  document.body.appendChild(div)

  const style = div.style
  const computed = window.getComputedStyle(element)

  const isInput = element.nodeName === 'INPUT'

  // textarea 默认样式
  style.whiteSpace = isInput ? 'nowrap' : 'pre-wrap'
  if (!isInput) style.wordWrap = 'break-word' // 仅用于 textarea

  // 置于屏幕外
  style.position = 'absolute' // 这是正确返回坐标所必需的
  if (!options.debug) style.visibility = 'hidden' // 不用 'display: none'，因为我们需要渲染

  // 将元素的属性转移到 div
  properties.forEach((prop) => {
    if (isInput && prop === 'lineHeight') {
      // 对 <input> 的特殊处理，因为文本居中渲染且行高可能不等于高度
      if (computed.boxSizing === 'border-box') {
        const height = Number.parseInt(computed.height as string)
        const outerHeight =
          Number.parseInt(computed.paddingTop as string) +
          Number.parseInt(computed.paddingBottom as string) +
          Number.parseInt(computed.borderTopWidth as string) +
          Number.parseInt(computed.borderBottomWidth as string)
        const targetHeight =
          outerHeight + Number.parseInt(computed.lineHeight as string)
        if (height > targetHeight) {
          style.lineHeight = `${height - outerHeight}px`
        } else if (height === targetHeight) {
          style.lineHeight = computed.lineHeight
        } else {
          style.lineHeight = '0'
        }
      } else {
        style.lineHeight = computed.height
      }
    } else {
      style[prop as any] = computed[prop as any]
    }
  })

  if (isFirefox()) {
    // Firefox 对 textarea 的 overflow 属性处理有偏差：https://bugzilla.mozilla.org/show_bug.cgi?id=984275
    if (element.scrollHeight > Number.parseInt(computed.height as string)) {
      style.overflowY = 'scroll'
    }
  } else {
    style.overflow = 'hidden' // 让 Chrome 不渲染滚动条；IE 保持 overflowY = 'scroll'
  }

  div.textContent = element.value.slice(0, Math.max(0, position))
  // 对 input type="text" 与 textarea 的第二项特殊处理：
  // 空格需替换为不换行空格 - http://stackoverflow.com/a/13402035/1269037
  if (isInput && div.textContent) {
    div.textContent = div.textContent.replace(/\s/g, '\u00A0')
  }

  const span = document.createElement('span')
  // 换行必须*精确*复刻，包括长单词换到
  // 下一行、以及行尾留白的情形（#7）。
  // 做到这一点*唯一*可靠的方式是把 textarea 剩余的*全部*内容复制到
  // 光标位置处创建的 <span> 中。
  // 对于 input，仅用 '.' 就足够，但不必如此麻烦。
  span.textContent = element.value.slice(Math.max(0, position)) || '.' // || 因为完全为空的伪 span 根本不会渲染
  span.style.position = 'relative'
  span.style.left = `${-element.scrollLeft}px`
  span.style.top = `${-element.scrollTop}px`
  div.appendChild(span)

  const relativePosition = {
    top: span.offsetTop + Number.parseInt(computed.borderTopWidth as string),
    left: span.offsetLeft + Number.parseInt(computed.borderLeftWidth as string),
    // 我们不使用 line-height，因为它对于定位可能过大。例如 34px
    // 用于 input
    height: Number.parseInt(computed.fontSize as string) * 1.5,
  }

  if (options.debug) {
    span.style.backgroundColor = '#aaa'
  } else {
    document.body.removeChild(div)
  }

  if (relativePosition.left >= element.clientWidth) {
    relativePosition.left = element.clientWidth
  }
  return relativePosition
}
