import { join } from 'path'

import type { FilesQuery } from '@filebrowser/shared'

export function resolvePathFromQuery(root: string, query: FilesQuery): string {
  const { subPath } = query
  const resolvedPath = join(root, subPath ?? '')

  return resolvedPath
}
