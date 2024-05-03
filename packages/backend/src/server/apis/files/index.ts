import { FastifyInstance } from 'fastify'
import { join } from 'path'

import { createUniformResponse } from '@/server/helpers'

import type { RegisterApisOptions } from '../types'
import { getFileInfoList } from './services'
import type { RequestQuery } from './types'

/**
 * 获取浏览路径里的所有文件
 */
export function registerApiFiles(fastify: FastifyInstance, options: RegisterApisOptions) {
  const { directoryToBrowse } = options

  fastify.get('/files', async (request, reply) => {
    const { subPath } = request.query as RequestQuery
    const resolvedFilePath = join(directoryToBrowse, subPath ?? '')
    const fileInfoList = await getFileInfoList(resolvedFilePath)

    reply.send(createUniformResponse({ fileInfoList }))
  })
}
