import fastifyEnv from '@fastify/env'
import { Static, Type } from '@sinclair/typebox'
import fp from 'fastify-plugin'

declare module 'fastify' {
  export interface FastifyInstance {
    config: Static<typeof schema>
  }
}

const schema = Type.Object({
  PORT: Type.Number({ default: 5000 }),
  HOST: Type.String({ default: '0.0.0.0' }),
})

export default fp(async function (fastify) {
  /**
   * A Fastify plugin for loading environment variables.
   *
   * @see {@link https://github.com/fastify/fastify-env}
   */
  fastify.register(fastifyEnv, {
    confKey: 'config',
    schema,
    dotenv: true,
  })
})
