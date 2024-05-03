import { stat } from 'fs/promises'

import { BusinessError } from '@/server/helpers'

import { FilesApiCodeInfo } from '../api-code-info'

export async function validatePathIsExists(path: string) {
  try {
    const stats = await stat(path)
    return stats
  } catch (error) {
    throw new BusinessError(FilesApiCodeInfo.NotExists, { cause: error })
  }
}

export async function validatePathIsDirectory(path: string) {
  const stats = await validatePathIsExists(path)

  if (!stats.isDirectory()) {
    throw new BusinessError(FilesApiCodeInfo.NotDirectory)
  }
}

export async function validatePathIsFile(path: string) {
  const stats = await validatePathIsExists(path)

  if (!stats.isFile()) {
    throw new BusinessError(FilesApiCodeInfo.NotFile)
  }
}
