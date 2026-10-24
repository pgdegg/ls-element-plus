import { resolve } from 'path'

export const projRoot = resolve(__dirname, '..', '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const compRoot = resolve(pkgRoot, 'components')
export const themeRoot = resolve(pkgRoot, 'theme-chalk')
export const hookRoot = resolve(pkgRoot, 'hooks')
export const localeRoot = resolve(pkgRoot, 'locale')
export const directiveRoot = resolve(pkgRoot, 'directives')
export const epRoot = resolve(pkgRoot, 'element-plus')
export const utilRoot = resolve(pkgRoot, 'utils')
export const buildRoot = resolve(projRoot, 'internal', 'build')

// 文档
export const docsDirName = 'docs'
export const docRoot = resolve(projRoot, docsDirName)
export const vpRoot = resolve(docRoot, '.vitepress')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')
/** `/dist/element-plus` */
export const epOutput = resolve(buildOutput, 'element-plus')

export const projPackage = resolve(projRoot, 'package.json')
export const compPackage = resolve(compRoot, 'package.json')
export const themePackage = resolve(themeRoot, 'package.json')
export const hookPackage = resolve(hookRoot, 'package.json')
export const localePackage = resolve(localeRoot, 'package.json')
export const directivePackage = resolve(directiveRoot, 'package.json')
export const epPackage = resolve(epRoot, 'package.json')
export const utilPackage = resolve(utilRoot, 'package.json')
export const docPackage = resolve(docRoot, 'package.json')

const windowsSlashRE = /\\/g
/**
 * 规范化路径，使用正斜杠。
 * 这有助于在不同平台上保持一致的路径格式。
 */
export function normalizePath(p: string): string {
  if (typeof process !== 'undefined' && process.platform === 'win32') {
    return p.replace(windowsSlashRE, '/')
  }
  return p
}
