import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox'

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    '/',
    {
      schema: {
        summary: 'Webhook Playground!',
        response: {
          200: Type.Object({
            message: Type.String(),
          }),
        },
      },
    },
    async () => {
      return { message: 'Welcome to the Webhook Playground!' }
    },
  )
}

export default plugin
