/// <reference lib="dom" />
// 运行方式：pnpm exec tsx scripts/test-icon-loading.mts
// 设置 PUPPETEER_EXECUTABLE_PATH 以使用已安装的 Chrome 或 Edge。
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import puppeteer from 'puppeteer'

const require = createRequire(new URL('../play/package.json', import.meta.url))
const { createServer } = await import(
  pathToFileURL(require.resolve('vite')).href
)
let releaseImages: (() => void) | undefined
const imagesReleased = new Promise<void>((resolve) => {
  releaseImages = resolve
})
let requests = 0
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
  root: process.cwd(),
  server: { host: '127.0.0.1', port: 0 },
  plugins: [
    vue(),
    jsx(),
    {
      name: 'icon-loading-fixture',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/icon-loading') {
            res.setHeader('Content-Type', 'text/html')
            res.end(
              '<html><head><script type="module" src="/packages/components/icon/__tests__/loading.fixture.tsx"></script></head><body></body></html>'
            )
          } else if (
            req.url === '/icon-image.svg' ||
            req.url === '/icon-failed.svg'
          ) {
            requests++
            await imagesReleased
            if (req.url === '/icon-failed.svg') {
              res.statusCode = 404
              res.end()
            } else {
              res.setHeader('Content-Type', 'image/svg+xml')
              res.end(
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#409eff" /></svg>'
              )
            }
          } else next()
        })
      },
    } satisfies ReturnType<typeof vue>,
  ],
})
let browser: Awaited<ReturnType<typeof puppeteer.launch>> | undefined
try {
  await server.listen()
  browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  })
  const page = await browser.newPage()
  await page.goto(`${server.resolvedUrls!.local[0]}icon-loading`, {
    waitUntil: 'domcontentloaded',
  })
  await page.waitForSelector('#loading .el-icon__placeholder')
  assert.equal(
    await page.$$eval('.el-icon__placeholder', (icons) => icons.length),
    4
  )
  await page.waitForFunction(() =>
    document.querySelector('image')?.hasAttribute('href')
  )
  const bounds = await page.$eval('#loading', (el) => {
    const rect = el.getBoundingClientRect()
    return { width: rect.width, height: rect.height }
  })
  assert.deepEqual(bounds, { width: 32, height: 32 })
  if (process.env.ICON_LOADING_SCREENSHOT) {
    await page.screenshot({ path: process.env.ICON_LOADING_SCREENSHOT })
  }
  releaseImages!()
  await page.waitForSelector('#loading use')
  await page.waitForSelector('#shared use')
  assert.equal(await page.$('#loading .el-icon__placeholder'), null)
  assert.ok(await page.$('#failed .el-icon__placeholder'))
  assert.ok(await page.$('#missing .el-icon__placeholder'))
  assert.equal(requests, 2, 'Shared icons should only fetch each image once')
  process.stdout.write(
    'Passed browser checks: loading, shared resource, success, failure, missing symbol, stable size\n'
  )
} finally {
  releaseImages?.()
  await browser?.close()
  await server.close()
}
