import Fastify from 'fastify'

import { FRONTEND_PORT } from '@filebrowser/shared'

import { registerMiddlewares } from './middlewares'
import { StartFrontendStaticServerOptions } from './types'

export async function startFrontendStaticServer(options: StartFrontendStaticServerOptions) {
  const { root } = options

  const fastify = Fastify({
    logger: false,
  })

  // 注册中间件
  registerMiddlewares(fastify, root)

  try {
    await fastify.listen({ host: '0.0.0.0', port: FRONTEND_PORT })
  } catch (error) {
    fastify.log.error(error, `listen port: ${FRONTEND_PORT} failed`)
  }
}
