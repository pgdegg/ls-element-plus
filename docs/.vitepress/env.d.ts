/// <reference types="vitepress/client" />

// VitePress 1.x 未为这些运行时辅助函数提供类型声明。
declare module 'vitepress/dist/client/shared' {
  export function isExternal(path: string): boolean
  export function isActive(
    currentPath: string,
    matchPath?: string,
    asRegex?: boolean
  ): boolean
}

declare module 'vitepress/dist/client/theme-default/support/utils' {
  export function ensureStartingSlash(path: string): string
}

declare module 'virtual:component-changelog-data' {
  const data: import('./utils/changelog-parser').ComponentChangelogs
  export default data
}
