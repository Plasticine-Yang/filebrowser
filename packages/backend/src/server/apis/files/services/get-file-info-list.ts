import { readdir, stat } from 'fs/promises'
import { join } from 'path'

import { BusinessError } from '@/server/helpers'

import type { FileInfo } from '../types'
import { FilesApiCodeInfo } from '../api-code-info'

export async function getFileInfoList(path: string): Promise<FileInfo[]> {
  const stats = await stat(path).catch((error) => {
    throw new BusinessError(FilesApiCodeInfo.NotExists, { cause: error })
  })

  if (!stats.isDirectory()) {
    throw new BusinessError(FilesApiCodeInfo.NotDirectory)
  }

  return getDirectoryFileInfoList(path)
}

/**
 * 获取目录下的文件信息
 */
async function getDirectoryFileInfoList(directoryPath: string): Promise<FileInfo[]> {
  const fileNameList = await readdir(directoryPath)
  const fileInfoList = await Promise.all(
    fileNameList.map<Promise<FileInfo>>(async (fileName) => {
      const filePath = join(directoryPath, fileName)
      const stats = await stat(filePath)
      const type: FileInfo['type'] = stats.isFile() ? 'file' : stats.isDirectory() ? 'directory' : undefined

      return {
        type,
        name: fileName,
        size: stats.size,
        createdAt: stats.ctime.getTime(),
        modifiedAt: stats.mtime.getTime(),
      }
    }),
  )

  return fileInfoList
}
