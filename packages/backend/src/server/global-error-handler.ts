import { FastifyInstance } from 'fastify'

/**
 * 全局兜底异常拦截
 */
export function setupGlobalErrorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler(function (error, _, reply) {
    reply.status(500).send({
      code: -1,
      message: error.message,
      error,
    })
  })
}
