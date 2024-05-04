import { FastifyInstance } from 'fastify'

import { registerApiClipboard } from './clipboard'
import { registerApiFiles } from './files'
import type { RegisterApisOptions } from './types'

export function registerApis(fastify: FastifyInstance, options: RegisterApisOptions) {
  registerApiFiles(fastify, options)
  registerApiClipboard(fastify)
}

export type { RegisterApisOptions } from './types'
