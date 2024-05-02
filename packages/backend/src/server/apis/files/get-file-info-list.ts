import { readdir, stat } from 'fs/promises'
import { join } from 'path'

import type { FileInfo } from './types'

export async function getFileInfoList(directoryPath: string): Promise<FileInfo[]> {
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
