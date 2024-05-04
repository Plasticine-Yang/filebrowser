import { FastifyInstance } from 'fastify'

import { ClipboardApiPath, CreateClipboardHistoryRequest } from '@filebrowser/shared'

import { createUniformResponse } from '@/server/helpers'

import { createClipboardHistoryManager } from './services'

export function registerApiClipboard(fastify: FastifyInstance) {
  const { getClipboardHistoryDescOrderedByCreatedAt, createClipboardHistory, deleteClipboardHistory } =
    createClipboardHistoryManager()

  fastify.get(ClipboardApiPath.Restful, (_, reply) => {
    const clipboardHistoryDescOrderedByCreatedAt = getClipboardHistoryDescOrderedByCreatedAt()

    reply.send(createUniformResponse(clipboardHistoryDescOrderedByCreatedAt))
  })

  fastify.post(ClipboardApiPath.Restful, (request, reply) => {
    const { content } = request.body as CreateClipboardHistoryRequest

    createClipboardHistory(content)

    reply.send(createUniformResponse(null))
  })

  fastify.delete(`${ClipboardApiPath.Restful}/:id`, (request, reply) => {
    const { id } = request.params as { id: string }

    deleteClipboardHistory(id)

    reply.send(createUniformResponse(null))
  })
}
