import { resolveHeadersFromTokens, slugify } from '@mdit-vue/shared'

import type { MarkdownRenderer } from 'vitepress'

/**
 * 获取 markdown 标题信息
 *
 * 将其提取到 env 中
 */
export default (md: MarkdownRenderer): void => {
  // 将标题提取到 env
  const render = md.renderer.render.bind(md.renderer)

  const level = [2, 3, 4, 5, 6]
  md.renderer.render = (tokens, options, env) => {
    env.headers = resolveHeadersFromTokens(tokens, {
      level,
      shouldAllowHtml: true,
      shouldAllowNested: false,
      shouldEscapeText: false,
      slugify,
    })
    // 移除 < 之前的空格
    env.headers.forEach((header) => {
      header.title = header.title.replace(/\s+</g, '<')
    })
    return render(tokens, options, env)
  }
}
