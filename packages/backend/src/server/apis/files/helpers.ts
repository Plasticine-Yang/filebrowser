import { join } from 'path'

import type { RequestQuery } from './types'

export function resolvePathFromQuery(root: string, query: RequestQuery): string {
  const { subPath } = query
  const resolvedPath = join(root, subPath ?? '')

  return resolvedPath
}
