import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { defaultLang } from '../constant'

export const useLang = () => {
  const route = useRoute()
  return computed(() => {
    // 第一个斜杠之前的部分
    const path = route.data?.relativePath
    let lang: string

    if (path?.includes('/')) {
      lang = path.split('/').shift()! || defaultLang
    } else {
      lang = defaultLang
    }
    return lang
  })
}
