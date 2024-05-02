import Fastify from 'fastify'

import { RegisterApisOptions, registerApis } from './apis'
import { setupGlobalErrorHandler } from './global-error-handler'
import { StartServerOptions } from './types'
import { DEFAULT_START_SERVER_OPTIONS } from './constants'

export async function startServer(options?: StartServerOptions) {
  const {
    port = DEFAULT_START_SERVER_OPTIONS.port,
    directoryToBrowse = DEFAULT_START_SERVER_OPTIONS.directoryToBrowse,
  } = options ?? DEFAULT_START_SERVER_OPTIONS

  const registerApisOptions: RegisterApisOptions = {
    directoryToBrowse,
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
    },
  })

  // 全局异常处理
  setupGlobalErrorHandler(fastify)

  // 注册 api
  registerApis(fastify, registerApisOptions)

  try {
    await fastify.listen({ port })
  } catch (error) {
    fastify.log.error(error, `listen port: ${port} failed`)
  }
}
