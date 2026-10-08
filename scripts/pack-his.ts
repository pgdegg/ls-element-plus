import { createHash } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

interface PackageManifest {
  version?: string
  dependencies?: Record<string, string>
}

async function main() {
  const output = path.resolve('dist/element-plus')
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

  // dist 不属于 pnpm workspace，打包前需把 catalog: 还原为实际版本。
  const workspace = await readFile('pnpm-workspace.yaml', 'utf8')
  const catalogSection = workspace.match(
    /^catalog:\s*\r?\n((?:[ \t]+[^\r\n]*\r?\n)*)/m
  )?.[1]
  if (!catalogSection) throw new Error('pnpm-workspace.yaml 缺少默认 catalog')
  const catalog = new Map<string, string>()
  for (const line of catalogSection.split(/\r?\n/)) {
    const entry = line.match(/^\s{2}['"]?([^'":]+)['"]?:\s*([^#\r\n]+)/)
    if (entry)
      catalog.set(entry[1], entry[2].trim().replace(/^['"]|['"]$/g, ''))
  }
  const packagePath = path.join(output, 'package.json')
  const originalPackage = await readFile(packagePath, 'utf8')
  const packedInfo = JSON.parse(originalPackage) as Record<string, unknown>
  for (const field of [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies',
  ]) {
    const dependencies = packedInfo[field] as Record<string, string> | undefined
    if (!dependencies) continue
    for (const [name, version] of Object.entries(dependencies)) {
      if (!version.startsWith('catalog:')) continue
      if (version !== 'catalog:')
        throw new Error(`暂不支持命名 catalog：${name} = ${version}`)
      const resolved = catalog.get(name)
      if (!resolved) throw new Error(`默认 catalog 中未找到 ${name}`)
      dependencies[name] = resolved
    }
  }

  const pnpm = process.env.npm_execpath
  if (!pnpm) throw new Error('请通过 pnpm pack:his 执行此脚本')

  await mkdir(destination, { recursive: true })
  const native = pnpm.endsWith('.exe')
  let result: ReturnType<typeof spawnSync>
  await writeFile(packagePath, `${JSON.stringify(packedInfo, null, 2)}\n`)
  try {
    result = spawnSync(
      native ? pnpm : process.execPath,
      [...(native ? [] : [pnpm]), 'pack', '--pack-destination', destination],
      { cwd: output, stdio: 'inherit' }
    )
  } finally {
    await writeFile(packagePath, originalPackage)
  }
  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)

  const packed = path.join(
    destination,
    `element-plus-${packageInfo.version}.tgz`
  )
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
  process.stdout.write(
    `安装包已生成：${archive}\n依赖路径已同步：${consumer}\n`
  )
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
