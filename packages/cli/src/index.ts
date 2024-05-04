import { cac } from 'cac'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

import { startFrontendStaticServer, startServer } from '@filebrowser/backend'

import packageJson from '../package.json'

const cli = cac('filebrowser')

cli.command('<root>', 'Share files in root directory.').action(async (root: string) => {
  const resolvedRoot = resolve(root)
  const frontendModulePath = fileURLToPath(import.meta.resolve('@filebrowser/frontend'))
  const frontendDistPath = resolve(frontendModulePath, '..')

  await Promise.all([startServer({ root: resolvedRoot }), startFrontendStaticServer({ root: frontendDistPath })])
})

cli.help()
cli.version(packageJson.version)
cli.parse()
