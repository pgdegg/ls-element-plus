/// <reference lib="dom" />
// 运行方式：pnpm exec tsx scripts/test-tabs-layout.mts
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import puppeteer from 'puppeteer'

const require = createRequire(new URL('../play/package.json', import.meta.url))
const { createServer } = await import(
  pathToFileURL(require.resolve('vite')).href
)
const server = await createServer({
  configFile: false,
  optimizeDeps: {
    include: [
      'vue',
      '@element-plus/icons-vue',
      '@floating-ui/dom',
      '@popperjs/core',
      '@vue/shared',
      '@vueuse/core',
      'lodash-unified',
    ],
  },
  plugins: [
    vue(),
    jsx(),
    {
      name: 'tabs-layout-fixture',
      configureServer(server) {
        server.middlewares.use('/tabs-layout', (_req, res) => {
          res.setHeader('Content-Type', 'text/html')
          res.end(
            '<html><head><script type="module" src="/packages/components/tabs/__tests__/layout.fixture.tsx"></script></head><body></body></html>'
          )
        })
      },
    } satisfies ReturnType<typeof vue>,
  ],
  server: { host: '127.0.0.1', port: 0 },
  root: process.cwd(),
})
let browser: Awaited<ReturnType<typeof puppeteer.launch>> | undefined
try {
  await server.listen()
  process.stdout.write('Layout server ready\n')
  browser = await puppeteer.launch({
    headless: true,
    ...(process.env.PUPPETEER_EXECUTABLE_PATH
      ? { executablePath: process.env.PUPPETEER_EXECUTABLE_PATH }
      : {}),
  })
  const page = await browser.newPage()
  process.stdout.write('Browser ready\n')
  page.on('console', (message) => {
    if (message.type() === 'error') console.error(message.text())
  })
  page.on('pageerror', (error) => console.error(error))
  await page.goto(`${server.resolvedUrls!.local[0]}tabs-layout`, {
    waitUntil: 'domcontentloaded',
  })
  await page.waitForFunction('window.renderTabs')
  process.stdout.write('Fixture ready\n')
  let count = 0
  for (const position of ['top', 'bottom']) {
    for (const type of ['', 'card', 'border-card']) {
      for (const leftType of ['', 'card', 'border-card']) {
        for (const rightType of ['', 'card', 'border-card']) {
          for (const [left, center, right] of [
            [false, true, false],
            [true, true, false],
            [false, true, true],
            [true, true, true],
            [true, false, false],
            [false, false, true],
            [true, false, true],
          ]) {
            for (const width of [700, 320]) {
              const options = {
                position,
                type,
                leftType,
                rightType,
                left,
                center,
                right,
                width,
              }
              await page.evaluate(
                (options) =>
                  (
                    window as unknown as {
                      renderTabs: (
                        options: Record<string, unknown>
                      ) => Promise<void>
                    }
                  ).renderTabs(options),
                options
              )
              await page.waitForFunction(() => {
                const nav = document.querySelector(
                  '.el-tabs__nav-scroll > .el-tabs__nav'
                )!
                const wrap = document.querySelector('.el-tabs__nav-wrap')!
                const fixed = [
                  ...document.querySelectorAll('.el-tabs__nav-fixed'),
                ].reduce((sum, el) => sum + el.getBoundingClientRect().width, 0)
                const overflow =
                  nav.getBoundingClientRect().width >
                  wrap.getBoundingClientRect().width -
                    fixed -
                    (Number.parseFloat(getComputedStyle(wrap).columnGap) || 0) *
                      document.querySelectorAll('.el-tabs__nav-fixed').length +
                    1
                return !wrap.classList.contains('is-scroll-empty')
                  ? wrap.classList.contains('is-scrollable') === overflow
                  : true
              })
              const result = await page.evaluate(() => {
                const wrap = document.querySelector('.el-tabs__nav-wrap')!
                const tabs = [
                  ...wrap.querySelectorAll<HTMLElement>('[role=tab]'),
                ]
                const bounds = wrap.getBoundingClientRect()
                return {
                  fixedVisible: [
                    ...wrap.querySelectorAll('.el-tabs__nav-fixed'),
                  ].every((el) => {
                    const rect = el.getBoundingClientRect()
                    return (
                      rect.left >= bounds.left - 1 &&
                      rect.right <= bounds.right + 1
                    )
                  }),
                  pads: tabs.map((tab) => {
                    const style = getComputedStyle(tab)
                    return {
                      line: tab.parentElement!.classList.contains('is-line'),
                      start: tab.classList.contains('is-start'),
                      end: tab.classList.contains('is-end'),
                      left: Number.parseFloat(style.paddingLeft),
                      right: Number.parseFloat(style.paddingRight),
                    }
                  }),
                }
              })
              assert.ok(result.fixedVisible, JSON.stringify(options))
              for (const pad of result.pads) {
                assert.equal(
                  pad.left === 0,
                  pad.line && pad.start,
                  JSON.stringify(options)
                )
                assert.equal(
                  pad.right === 0,
                  pad.line && pad.end,
                  JSON.stringify(options)
                )
              }
              count++
            }
          }
        }
      }
    }
  }
  process.stdout.write(`Passed ${count} browser layout combinations\n`)
  for (const [index, scenario] of [
    {
      leftType: 'border-card',
      center: true,
      leftLabels: ['工作台', '患者列表'],
    },
    {
      leftType: 'border-card',
      center: false,
      leftLabels: ['工作台', '患者列表'],
    },
  ].entries()) {
    await page.evaluate(
      (scenario) =>
        (
          window as unknown as {
            renderTabs: (options: Record<string, unknown>) => Promise<void>
          }
        ).renderTabs({
          ...scenario,
          type: 'card',
          rightType: '',
          left: true,
          right: false,
          position: 'top',
          width: 700,
          centerLabels: ['男 · 马亮'],
        }),
      scenario
    )
    const result = await page.evaluate(() => {
      const left = document.querySelector('.el-tabs__nav-fixed-left')!
      const main = document.querySelector('.el-tabs__nav-scroll-wrap')!
      return {
        classes: left.parentElement!.className,
        columnGap: getComputedStyle(left.parentElement!).columnGap,
        radius: getComputedStyle(left).borderTopRightRadius,
        gap:
          main.getBoundingClientRect().left -
          left.getBoundingClientRect().right,
      }
    })
    if (scenario.leftType === 'border-card') assert.equal(result.radius, '4px')
    if (scenario.center)
      assert.equal(result.gap, 4, JSON.stringify({ scenario, result }))
    if (process.env.TABS_LAYOUT_SCREENSHOT) {
      await (await page.$('#app'))!.screenshot({
        path: `${process.env.TABS_LAYOUT_SCREENSHOT}-${index}.png`,
      })
    }
  }
  process.stdout.write('Passed 2 fixed-group corner and spacing regressions\n')
  if (process.env.TABS_INDEX_FILE) {
    const source = await readFile(process.env.TABS_INDEX_FILE, 'utf8')
    const scss = source.match(
      /<style lang="scss" scoped>([\s\S]*?)<\/style>/
    )![1]
    const themeRequire = createRequire(
      new URL('../packages/theme-chalk/package.json', import.meta.url)
    )
    const sass = await import(
      pathToFileURL(themeRequire.resolve('sass-embedded')).href
    )
    const css = sass.compileString(scss).css.replace(/:deep\(([^)]+)\)/g, '$1')
    for (const width of [400, 700]) {
      await page.evaluate(
        ({ css, width }) =>
          (
            window as unknown as {
              renderScopes: (css: string, width: number) => Promise<void>
            }
          ).renderScopes(css, width),
        { css, width }
      )
      const gap = await page.evaluate(
        () =>
          document.querySelector('.task-navigation')!.getBoundingClientRect()
            .left -
          document.querySelector('.task-scopes')!.getBoundingClientRect().right
      )
      assert.equal(gap, 4)
    }
    if (process.env.TABS_LAYOUT_SCREENSHOT) {
      await (await page.$('#app'))!.screenshot({
        path: `${process.env.TABS_LAYOUT_SCREENSHOT}-2.png`,
      })
    }
    process.stdout.write(
      'Passed 2 consultation sibling Tabs spacing regressions\n'
    )
  }
  if (process.env.TABS_DETAIL_FILE) {
    const source = await readFile(process.env.TABS_DETAIL_FILE, 'utf8')
    const scss = source.match(
      /<style lang="scss" scoped>([\s\S]*?)<\/style>/
    )![1]
    const themeRequire = createRequire(
      new URL('../packages/theme-chalk/package.json', import.meta.url)
    )
    const sass = await import(
      pathToFileURL(themeRequire.resolve('sass-embedded')).href
    )
    const css = sass.compileString(scss).css.replace(/:deep\(([^)]+)\)/g, '$1')
    for (const viewport of [600, 1280]) {
      await page.setViewport({ width: viewport, height: 800 })
      for (const width of [180, 240, 320, 500]) {
        await page.evaluate(
          ({ css, width }) =>
            (
              window as unknown as {
                renderNavigation: (css: string, width: number) => Promise<void>
              }
            ).renderNavigation(css, width),
          { css, width }
        )
        const visible = await page.evaluate(() => {
          const visit = document.querySelector<HTMLElement>('.visit')!
          const rect = visit.getBoundingClientRect()
          const header = document
            .querySelector('.detail-navigation')!
            .getBoundingClientRect()
          return (
            getComputedStyle(visit).display !== 'none' &&
            rect.width > 0 &&
            rect.left >= header.left &&
            rect.right <= header.right + 1 &&
            rect.bottom <= header.bottom + 1
          )
        })
        assert.ok(
          visible,
          `Visit information hidden at viewport ${viewport}, container ${width}`
        )
      }
    }
    process.stdout.write('Passed 8 Detail.vue navigation layout combinations\n')
  }
} finally {
  await browser?.close()
  await server.close()
}
