import { FastifyInstance } from 'fastify'

import { FilesQuery, FilesApiPath } from '@filebrowser/shared'

import { BusinessError, createUniformResponse } from '@/server/helpers'

import type { RegisterApisOptions } from '../types'
import { FilesApiCodeInfo } from './api-code-info'
import { resolvePathFromQuery } from './helpers'
import { getFileInfoList, saveToDirectory } from './services'
import { validatePathIsDirectory, validatePathIsFile } from './validators'

/**
 * 获取浏览路径里的所有文件
 */
export function registerApiFiles(fastify: FastifyInstance, options: RegisterApisOptions) {
  const { root } = options

  fastify.get(FilesApiPath.GetFileInfoList, async (request, reply) => {
    const resolvedPath = resolvePathFromQuery(root, request.query as FilesQuery)
    await validatePathIsDirectory(resolvedPath)

    const fileInfoList = await getFileInfoList(resolvedPath)

    reply.send(createUniformResponse(fileInfoList))
  })

  fastify.get(FilesApiPath.DownloadFile, async (request, reply) => {
    const resolvedPath = resolvePathFromQuery(root, request.query as FilesQuery)
    await validatePathIsFile(resolvedPath)

    reply.download(resolvedPath)
  })

  fastify.post(FilesApiPath.UploadFile, async (request, reply) => {
    const directoryPath = resolvePathFromQuery(root, request.query as FilesQuery)
    await validatePathIsDirectory(directoryPath)

    const multipart = await request.file()

    if (multipart) {
      await saveToDirectory(directoryPath, multipart)
      reply.send(createUniformResponse(null))

      return
    }

    throw new BusinessError(FilesApiCodeInfo.UploadFailed)
  })
}
