import { createApp, h } from 'vue'
import Icon from '../src/icon.vue'
import '@element-plus/theme-chalk/src/base.scss'
import '@element-plus/theme-chalk/src/icon.scss'

document.body.innerHTML = `
  <svg width="0" height="0" aria-hidden="true">
    <symbol id="test-image" viewBox="0 0 24 24"><image width="24" height="24" data-src="/icon-image.svg" /></symbol>
    <symbol id="test-failed" viewBox="0 0 24 24"><image width="24" height="24" data-src="/icon-failed.svg" /></symbol>
  </svg>
  <div id="app"></div>`
createApp(() =>
  h('div', { style: 'display:flex;gap:16px;padding:24px;color:#606266' }, [
    h(Icon, { id: 'loading', symbol: 'image', prefix: 'test', size: 32 }),
    h(Icon, { id: 'shared', symbol: 'image', prefix: 'test', size: 24 }),
    h(Icon, { id: 'failed', symbol: 'failed', prefix: 'test', size: 16 }),
    h(Icon, { id: 'missing', symbol: 'missing', prefix: 'test', size: 16 }),
  ])
).mount('#app')
