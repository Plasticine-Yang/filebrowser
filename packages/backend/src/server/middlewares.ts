import middlewareCors from '@fastify/cors'
import middlewareStatic from '@fastify/static'
import middlewareMultipart from '@fastify/multipart'
import { FastifyInstance } from 'fastify'

export function registerMiddlewares(fastify: FastifyInstance, root: string) {
  fastify.register(middlewareCors)
  fastify.register(middlewareStatic, { root, prefix: '/static/' })
  fastify.register(middlewareMultipart)
}
