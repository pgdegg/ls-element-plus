import { ref, watch } from 'vue'
import { isDark } from '~/composables/dark'

export const getCssVarName = (namespace: string, type: string) => {
  return type ? `--el-${namespace}-${type}` : `--el-${namespace}`
}

/**
 * 按 CSS 变量名获取 CSS 变量值
 * @param name
 * @returns
 */
export const getCssVarValue = (name: string) => {
  const val = ref(
    getComputedStyle(document.documentElement).getPropertyValue(name)
  )
  watch(
    () => isDark.value,
    () => {
      setTimeout(() => {
        val.value = getComputedStyle(document.documentElement).getPropertyValue(
          name
        )
      }, 100)
    }
  )
  return val
}

/**
 * set css var value
 * @param name
 * @param value
 */
export const setCssVarValue = (name: string, value: string) => {
  document.documentElement.style.setProperty(name, value)
}

export const getColorValue = (type: string) => {
  const color = getComputedStyle(document.documentElement).getPropertyValue(
    `--el-color-${type}`
  )
  return color
}
