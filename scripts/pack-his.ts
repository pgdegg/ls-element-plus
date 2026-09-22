import { createHash } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

interface PackageManifest {
  version?: string
  dependencies?: Record<string, string>
}

const output = fileURLToPath(new URL('../dist/element-plus/', import.meta.url))
const destination = path.resolve(process.argv[2] || 'D:/his-dependence')
const consumer = path.resolve(
  process.argv[3] || 'D:/HIS/LS_NextGenHISFrontend/package.json'
)
const manifestText = await readFile(consumer, 'utf8')
const manifest = JSON.parse(manifestText) as PackageManifest
const currentDependency = manifest.dependencies?.['element-plus']
if (!currentDependency) {
  throw new Error(`目标项目未声明 element-plus 依赖：${consumer}`)
}
const packageInfo = JSON.parse(
  await readFile(path.join(output, 'package.json'), 'utf8')
) as PackageManifest
if (!packageInfo.version) throw new Error('Element Plus 构建产物缺少版本号')

const pnpm = process.env.npm_execpath
if (!pnpm) throw new Error('请通过 pnpm pack:his 执行此脚本')

await mkdir(destination, { recursive: true })
const native = pnpm.endsWith('.exe')
const result = spawnSync(
  native ? pnpm : process.execPath,
  [...(native ? [] : [pnpm]), 'pack', '--pack-destination', destination],
  { cwd: output, stdio: 'inherit' }
)
if (result.error) throw result.error
if (result.status !== 0) process.exit(result.status ?? 1)

const packed = path.join(destination, `element-plus-${packageInfo.version}.tgz`)
const hash = createHash('sha256')
  .update(await readFile(packed))
  .digest('hex')
  .slice(0, 16)
const archive = path.join(destination, `element-plus-${hash}.tgz`)
await rename(packed, archive)

// 只替换该依赖的值，保留业务项目其余内容和格式。
const dependency = `file:${archive.replaceAll('\\', '/')}`
const oldEntry = `"element-plus": ${JSON.stringify(currentDependency)}`
if (!manifestText.includes(oldEntry)) {
  throw new Error(`无法定位依赖字段，请手动同步 ${consumer} 为 ${dependency}`)
}
await writeFile(
  consumer,
  manifestText.replace(
    oldEntry,
    `"element-plus": ${JSON.stringify(dependency)}`
  )
)
process.stdout.write(`安装包已生成：${archive}\n依赖路径已同步：${consumer}\n`)
