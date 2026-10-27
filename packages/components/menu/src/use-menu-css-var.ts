import { computed } from 'vue'
import { useNamespace } from '@element-plus/hooks'

export const useMenuCssVar = (level: number) => {
  const ns = useNamespace('menu')
  return computed(() => ns.cssVarBlock({ level: `${level}` }))
}
