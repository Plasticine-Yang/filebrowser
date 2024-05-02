import { FastifyInstance } from 'fastify'
import { join } from 'path'

import type { RegisterApisOptions } from '../types'
import { getFileInfoList } from './get-file-info-list'
import { createUniformResponse } from '@/server/helpers'

/**
 * 获取浏览路径里的所有文件
 */
export function registerApiFiles(fastify: FastifyInstance, options: RegisterApisOptions) {
  const { directoryToBrowse } = options

  fastify.get('/files', async (_, reply) => {
    const directoryPath = join(directoryToBrowse)
    const fileInfoList = await getFileInfoList(directoryPath)

    reply.send(createUniformResponse({ fileInfoList }))
  })
}
