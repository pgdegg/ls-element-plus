import fs from 'fs'
import path from 'path'
import { styleText } from 'util'
import consola from 'consola'
import { docRoot, errorAndExit } from '@element-plus/build-utils'

// 注意：此文件仅用于生成便于开发者开发网站的文件。
const componentLocaleRoot = path.resolve(docRoot, '.vitepress/crowdin')

const exists = 'File already exists'

async function main() {
  const localeOutput = path.resolve(docRoot, '.vitepress/i18n')
  if (fs.existsSync(localeOutput)) {
    throw new Error(exists)
  }

  consola.trace(styleText('cyan', 'Starting for build doc for developing'))
  // 所有语言应保持一致，因为内容镜像自 crowdin。
  const dirs = await fs.promises.readdir(componentLocaleRoot, {
    withFileTypes: true,
  })
  const languages = dirs.map((dir) => dir.name)
  const langWithoutEn = languages.filter((l) => l !== 'en-US')

  await fs.promises.mkdir(localeOutput)

  // 构建 lang.json，用于告知 `header>language-select` 共有多少种语言
  await fs.promises.writeFile(
    path.resolve(localeOutput, 'lang.json'),
    JSON.stringify(languages),
    'utf-8'
  )

  // 遍历 en-US

  const enUS = path.resolve(componentLocaleRoot, 'en-US')
  // 我们不包含 en-US，因为目前将其作为模板使用
  const languagePaths = langWithoutEn.map((l) => {
    return {
      name: l,
      pathname: path.resolve(componentLocaleRoot, l),
    }
  })

  consola.debug(languagePaths)
  await traverseDir(enUS, languagePaths, localeOutput)
}

async function traverseDir(
  dir: string,
  paths: { name: string; pathname: string }[],
  targetPath: string
) {
  const contents = await fs.promises.readdir(dir, { withFileTypes: true })

  await Promise.all(
    contents.map(async (c) => {
      if (c.isDirectory()) {
        await fs.promises.mkdir(path.resolve(targetPath, c.name), {
          recursive: true,
        })

        return traverseDir(
          path.resolve(dir, c.name),
          paths.map((p) => {
            return {
              ...p,
              pathname: path.resolve(p.pathname, c.name),
            }
          }),
          path.resolve(targetPath, c.name)
        )
      } else if (c.isFile()) {
        const content = require(path.resolve(dir, c.name))

        const contentToWrite = {
          'en-US': content,
        }

        await Promise.all(
          paths.map(async (p) => {
            const localeFile = path.resolve(p.pathname, c.name)
            if (fs.existsSync(localeFile)) {
              contentToWrite[p.name] = require(localeFile)
            } else {
              consola.warn(
                `Missing locale file: ${localeFile}. Falling back to en-US.`
              )
              contentToWrite[p.name] = content
            }
          })
        )

        return fs.promises.writeFile(
          path.resolve(targetPath, c.name),
          JSON.stringify(contentToWrite, null, 2),
          {
            encoding: 'utf-8',
          }
        )
      }
    })
  )
}

main()
  .then(() => {
    consola.success(
      styleText('green', 'Locale for website development generated')
    )
  })
  .catch((err) => {
    if (err.message === exists) {
      // 不做任何处理
    } else {
      errorAndExit(err)
    }
  })
