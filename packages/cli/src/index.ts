import { cac } from 'cac'
import chalk from 'chalk'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

import { startFrontendStaticServer, startServer } from '@filebrowser/backend'
import { FRONTEND_PORT } from '@filebrowser/shared'

import packageJson from '../package.json'
import { getLocalIpList } from './helpers'

const cli = cac('filebrowser')

cli.command('[root]', 'Share files in root directory.').action(async (root = process.cwd()) => {
  const resolvedRoot = resolve(root)
  const frontendModulePath = fileURLToPath(import.meta.resolve('@filebrowser/frontend'))
  const frontendDistPath = resolve(frontendModulePath, '..')

  await Promise.all([startServer({ root: resolvedRoot }), startFrontendStaticServer({ root: frontendDistPath })])

  const localIpList = getLocalIpList()
  const formatInfo = localIpList.map((localIp) => `http://${localIp}:${FRONTEND_PORT}`).join('\n')

  console.log(chalk.cyan('Filebrowser service started, you can access it by following url:\n'))
  console.log(chalk.cyan(formatInfo))
})

cli.help()
cli.version(packageJson.version)
cli.parse()
