import { FastifyInstance } from 'fastify'

import { registerApiFiles } from './files'
import type { RegisterApisOptions } from './types'

export function registerApis(fastify: FastifyInstance, options: RegisterApisOptions) {
  registerApiFiles(fastify, options)
}

export type { RegisterApisOptions } from './types'
