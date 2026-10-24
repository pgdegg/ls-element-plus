import { computed } from 'vue'
import { useData, useRoute, useRouter, withBase } from 'vitepress'
import { useStorage } from '@vueuse/core'
import { PREFERRED_LANG_KEY } from '../constant'
import langs from '../../i18n/lang.json'
import translationLocale from '../../i18n/component/translation.json'
import { useLang } from './lang'

export const useTranslation = () => {
  const route = useRoute()
  const router = useRouter()
  const lang = useLang()
  const { site } = useData()

  const languageMap = {
    'en-US': 'English',
    'zh-CN': '中文',
    'es-ES': 'Español',
    'fr-FR': 'Français',
    'ja-JP': '日本語',
  }

  const locale = computed(() => translationLocale[lang.value])
  const langsRef = computed(() => {
    const currentLang = lang.value

    // 当列表中没有 zh-CN 时，说明这是 PR 预览
    // 因此直接返回仅包含 en-US 的当前列表
    if (!langs.includes('zh-CN')) return []
    const langsCopy = langs.slice(0)
    langsCopy.splice(langsCopy.indexOf(currentLang), 1)

    // 如果当前语言不是 zh-CN，则需要把 zh-CN 移到列表开头。
    if (currentLang !== 'zh-CN') {
      langsCopy.splice(langsCopy.indexOf('zh-CN'), 1)
    }

    return currentLang === 'zh-CN' ? langsCopy : ['zh-CN'].concat(langsCopy)
  })

  const language = useStorage(PREFERRED_LANG_KEY, 'en-US')

  const getTargetUrl = (lang: string) => {
    const firstSlash = route.path.indexOf('/', site.value.base.length)
    return firstSlash === -1
      ? `/${lang}/`
      : `/${lang}/${route.path.slice(firstSlash + 1)}`
  }

  const switchLang = (targetLang: string) => {
    if (lang.value === targetLang) return
    language.value = targetLang

    const goTo: string = getTargetUrl(targetLang)
    router.go(withBase(goTo))
  }

  return {
    locale,
    languageMap,
    langs: langsRef,
    lang,
    getTargetUrl,
    switchLang,
  }
}
