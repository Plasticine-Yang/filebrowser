import { FastifyInstance } from 'fastify'

import { ClipboardApiPath, CreateClipboardHistoryRequest } from '@filebrowser/shared'

import { createUniformResponse } from '@/server/helpers'

import { createClipboardHistoryManager } from './services'

export function registerApiClipboard(fastify: FastifyInstance) {
  const {
    getClipboardHistoryDescOrderedByCreatedAt,
    createClipboardHistory,
    deleteClipboardHistory,
    clearClipboardHistory,
  } = createClipboardHistoryManager()

  // 获取所有剪切板历史
  fastify.get(ClipboardApiPath.Restful, (_, reply) => {
    const clipboardHistoryDescOrderedByCreatedAt = getClipboardHistoryDescOrderedByCreatedAt()

    reply.send(createUniformResponse(clipboardHistoryDescOrderedByCreatedAt))
  })

  // 创建一条剪切板记录
  fastify.post(ClipboardApiPath.Restful, (request, reply) => {
    const { content } = request.body as CreateClipboardHistoryRequest

    createClipboardHistory(content)

    reply.send(createUniformResponse(null))
  })

  // 删除一条剪切板记录
  fastify.delete(`${ClipboardApiPath.Restful}/:id`, (request, reply) => {
    const { id } = request.params as { id: string }

    deleteClipboardHistory(id)

    reply.send(createUniformResponse(null))
  })

  // 清空剪切板
  fastify.delete(ClipboardApiPath.Restful, (_, reply) => {
    clearClipboardHistory()

    reply.send(createUniformResponse(null))
  })
}
