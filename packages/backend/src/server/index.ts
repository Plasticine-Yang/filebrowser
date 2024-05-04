import Fastify from 'fastify'

import { BACKEND_PORT } from '@filebrowser/shared'

import { RegisterApisOptions, registerApis } from './apis'
import { DEFAULT_START_SERVER_OPTIONS } from './constants'
import { setupGlobalErrorHandler } from './global-error-handler'
import { registerMiddlewares } from './middlewares'
import { StartServerOptions } from './types'

export async function startServer(options?: StartServerOptions) {
  const { root = DEFAULT_START_SERVER_OPTIONS.root } = options ?? DEFAULT_START_SERVER_OPTIONS

  const registerApisOptions: RegisterApisOptions = {
    root,
  }

  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
          ignore: 'pid,hostname',
        },
      },
      msgPrefix: '[Backend] ',
    },
  })

  // 全局异常处理
  setupGlobalErrorHandler(fastify)

  // 注册中间件
  registerMiddlewares(fastify, root)

  // 注册 api
  registerApis(fastify, registerApisOptions)

  try {
    await fastify.listen({ host: '0.0.0.0', port: BACKEND_PORT })
  } catch (error) {
    fastify.log.error(error, `listen port: ${BACKEND_PORT} failed`)
  }
}
