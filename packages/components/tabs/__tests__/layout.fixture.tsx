import { createApp, h, nextTick } from 'vue'
import Tabs from '../src/tabs'
import TabPane from '../src/tab-pane.vue'
import '@element-plus/theme-chalk/src/base.scss'
import '@element-plus/theme-chalk/src/tabs.scss'

type LayoutOptions = {
  type: '' | 'card' | 'border-card'
  leftType: '' | 'card' | 'border-card'
  rightType: '' | 'card' | 'border-card'
  left: boolean
  right: boolean
  center: boolean
  width: number
  position: 'top' | 'bottom'
}

window.renderTabs = async (options: LayoutOptions) => {
  window.tabsApp?.unmount()
  document.body.innerHTML = `<div id="app" style="width:${options.width}px"></div>`
  window.tabsApp = createApp(() =>
    h(Tabs, { ...options, tabPosition: options.position }, () => [
      ...(options.left
        ? [h(TabPane, { fixed: 'left', name: 'left', label: '本科学收到的 1' })]
        : []),
      ...(options.center
        ? ['我负责的 0', '本科已完成 0', '会诊信息'].map((label, index) =>
            h(TabPane, { name: `center-${index}`, label })
          )
        : []),
      ...(options.right
        ? [h(TabPane, { fixed: 'right', name: 'right', label: '女 · 魏瑞洁' })]
        : []),
    ])
  )
  window.tabsApp.mount('#app')
  await nextTick()
}

declare global {
  interface Window {
    tabsApp?: ReturnType<typeof createApp>
    renderTabs: (options: LayoutOptions) => Promise<void>
    renderNavigation: (css: string, width: number) => Promise<void>
  }
}

window.renderNavigation = async (css, width) => {
  window.tabsApp?.unmount()
  document.body.innerHTML = `<style>${css}</style><section id="app" class="task-detail" style="width:${width}px"></section>`
  window.tabsApp = createApp(() =>
    h('header', { class: 'detail-navigation' }, [
      h('button', { class: 'accept' }, '接受'),
      h(Tabs, { class: 'detail-tabs' }, () =>
        [
          '会诊信息',
          '病历文书',
          '历史就诊',
          '诊断',
          '医嘱',
          '检验',
          '检查',
          '生命体征',
          '护理',
          '手术',
        ].map((label, index) => h(TabPane, { name: index, label }))
      ),
      h('span', { class: 'visit' }, '本次住院：ZY00100000014'),
    ])
  )
  window.tabsApp.mount('#app')
  await nextTick()
}
