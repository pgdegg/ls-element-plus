<script setup lang="ts">
import '@docsearch/css/dist/style.css'
import { getCurrentInstance, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute, useRouter, withBase } from 'vitepress'
import docsearch from '@docsearch/js/docsearch'
import { isClient } from '@vueuse/core'
import { useLang } from '../../composables/lang'
import searchLocale from '../../../i18n/component/search.json'

import type { HitComponentFn } from '@docsearch/js/docsearch'

const props = defineProps<{
  options: any
  multilang?: boolean
}>()

const vm = getCurrentInstance()
let searchInstance: ReturnType<typeof docsearch> | undefined
const route = useRoute()
const router = useRouter()

const lang = useLang()

watch([() => props.options, lang], ([newOptions]) => {
  update(newOptions)
})

onMounted(() => {
  initialize(props.options)
})

onBeforeUnmount(() => searchInstance?.destroy())

function isSpecialClick(event: MouseEvent) {
  return (
    event.button === 1 ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  )
}

function getRelativePath(absoluteUrl: string) {
  const { pathname, hash } = new URL(absoluteUrl)

  return pathname + hash
}

function update(options: any) {
  if (vm && vm.vnode.el) {
    searchInstance?.destroy()
    vm.vnode.el.innerHTML =
      '<div class="algolia-search-box" id="docsearch"></div>'
    initialize(options)
  }
}

function initialize(userOptions: any) {
  // 如果用户有多个语言环境，搜索结果应按
  // 语言进行过滤
  const facetFilters = props.multilang ? [`language:${lang.value}`] : []
  const algoliaLocale = searchLocale[lang.value].algolia

  searchInstance = docsearch(
    Object.assign({}, userOptions, {
      container: '#docsearch',
      indices: [
        {
          name: 'element-plus',
          searchParameters: Object.assign({}, userOptions.searchParameters, {
            // 按当前文档语言过滤搜索结果。
            facetFilters: facetFilters.concat(
              userOptions.searchParameters?.facetFilters || []
            ),
          }),
        },
      ],
      placeholder: algoliaLocale.placeholder,
      translations: algoliaLocale.translations,

      getMissingResultsUrl({ query }: { query: string }) {
        return `https://github.com/element-plus/element-plus/issues/new?title=${encodeURIComponent(
          `[Docs] Missing search result for \`${query}\``
        )}`
      },

      navigator: {
        navigate: ({ itemUrl }: { itemUrl: string }) => {
          if (!isClient) return

          const { pathname: hitPathname } = new URL(
            window.location.origin + itemUrl
          )

          // Router 不处理同页导航，因此我们使用原生
          // 浏览器 location API 进行锚点导航
          if (route.path === hitPathname) {
            window.location.assign(window.location.origin + itemUrl)
          } else {
            router.go(withBase(itemUrl))
          }
        },
      },

      transformItems: (items: any[]) => {
        return items.map((item) => {
          return Object.assign({}, item, {
            url: getRelativePath(item.url),
          })
        })
      },

      hitComponent: (({ hit, children }, { html }) => {
        const relativeHit = hit.url.startsWith('http')
          ? getRelativePath(hit.url as string)
          : withBase(hit.url)

        return html`<a
          href=${hit.url}
          onClick=${(event: MouseEvent) => {
            if (isSpecialClick(event)) {
              return
            }

            // 当用户已处于正确锚点时，我们依赖原生链接滚动，
            // 因为 Router 不支持重复的
            // history 记录
            if (route.path === relativeHit) {
              return
            }

            // 如果命中结果跳转到其他页面，我们阻止原生链接
            // 默认行为，以利用 Router 的加载特性
            if (route.path !== relativeHit) {
              event.preventDefault()
            }

            router.go(relativeHit)
          }}
          >${children}</a
        >`
      }) satisfies HitComponentFn,
    })
  )
}
</script>

<template>
  <div id="docsearch" class="algolia-search-box" />
</template>

<style lang="scss">
@use '../../styles/mixins' as *;

.algolia-search-box {
  // display: flex;
  // align-items: center;
  // line-height: var(--header-height);
  // padding-left: 0.5rem;
  // padding-top: 1px;
  // margin-right: 12px;
  // .search-box-placeholder,
  // .search-box-key {
  //   display: flex;
  // }

  @include respond-to('md') {
    min-width: 176.3px;
  }
}

.DocSearch {
  --docsearch-primary-color: var(--brand-color);
  --docsearch-highlight-color: var(--brand-color);
  --docsearch-subtle-color: var(--border-color);
  --docsearch-search-button-text-color: var(--text-color-lighter);
  --docsearch-key-background: var(--bg-color-mute);
  --docsearch-key-color: var(--text-color-light);
  // --docsearch-key-shadow: rgba(125, 125, 125, 0.3);
  --docsearch-footer-height: 44px;
  --docsearch-footer-background: var(--bg-color);
  --docsearch-footer-shadow:
    0 -1px 0 0 #e0e3e8, 0 -3px 6px 0 rgba(69, 98, 155, 0.12);
  --docsearch-searchbox-background: rgba(var(--bg-color-rgb), 0.8);
  --docsearch-searchbox-focus-background: var(--bg-color-mute);
  --docsearch-searchbox-shadow: inset 0 0 0 2px var(--brand-color);
  --docsearch-muted-color: var(--text-color-lighter);
  --docsearch-text-color: var(--text-color-light);
  --docsearch-modal-background: var(--bg-color-soft);
  --docsearch-modal-shadow: var(--el-box-shadow);

  transition: background-color var(--el-transition-duration-fast);
  background-color: transparent;

  &.DocSearch-Container {
    z-index: 20000;
  }

  &.DocSearch-Button {
    margin-right: 8px;
  }

  .DocSearch-Title {
    word-break: break-word;
  }

  @media (max-width: 749px) {
    &.DocSearch-Button {
      margin: 0 12px;
      padding: 0;
    }
  }

  .dark & {
    --docsearch-text-color: var(--text-color-light);
    --docsearch-key-shadow: none;
    --docsearch-modal-shadow: none;
    --docsearch-footer-shadow: none;
    --docsearch-hit-background: var(--bg-color-mute);
    --docsearch-hit-color: var(--text-color-lighter);
    --docsearch-hit-shadow: none;

    // --docsearch-searchbox-focus-background: var(--bg-color-mute);
    .DocSearch-Button {
      .DocSearch-Button-Key {
        box-shadow: unset;
      }
    }
  }

  @include respond-to('md') {
    background-color: var(--docsearch-searchbox-background);
  }
}
</style>
