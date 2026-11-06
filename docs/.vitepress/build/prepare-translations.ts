import { execFileSync } from 'child_process'
import { existsSync } from 'fs'
import { cp, mkdtemp, rm } from 'fs/promises'
import os from 'os'
import path from 'path'
import consola from 'consola'
import { docRoot, errorAndExit } from '@element-plus/build-utils'

async function main() {
  const destination = path.resolve(docRoot, 'zh-CN')
  if (existsSync(destination)) return

  consola.info('Downloading Simplified Chinese documentation')
  const temporaryDirectory = await mkdtemp(
    path.join(os.tmpdir(), 'element-plus-docs-i18n-')
  )
  try {
    execFileSync(
      'git',
      [
        'clone',
        '--depth=1',
        '--filter=blob:none',
        '--sparse',
        'https://github.com/element-plus/docs-i18n.git',
        temporaryDirectory,
      ],
      { stdio: 'inherit' }
    )
    execFileSync('git', ['sparse-checkout', 'set', 'zh-CN'], {
      cwd: temporaryDirectory,
      stdio: 'inherit',
    })
    await cp(path.join(temporaryDirectory, 'zh-CN'), destination, {
      recursive: true,
    })
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true })
  }
}

main().catch(errorAndExit)
