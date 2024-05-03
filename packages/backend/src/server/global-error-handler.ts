import { FastifyInstance } from 'fastify'

import { UNKNOWN_ERROR_CODE } from './constants'
import { BusinessError, createUniformResponse } from './helpers'

/**
 * 全局兜底异常拦截
 */
export function setupGlobalErrorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler(function (error, _, reply) {
    if (error instanceof BusinessError) {
      const { code, message, cause } = error
      const data = cause !== undefined ? { cause } : null

      reply.status(200).send(createUniformResponse(data, code, message))

      return
    }

    reply.status(500).send(
      createUniformResponse(
        {
          cause: error,
        },
        UNKNOWN_ERROR_CODE,
        error.message,
      ),
    )
  })
}
