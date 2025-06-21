import fastifySwagger from '@fastify/swagger'
import fp from 'fastify-plugin'

export default fp(async function (fastify) {
  /**
   * A Fastify plugin for serving Swagger (OpenAPI v2) or OpenAPI v3 schemas
   *
   * @see {@link https://github.com/fastify/fastify-swagger}
   */
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Webhook Playground API',
        description: 'A playground for testing and debugging webhooks.',
        version: '1.0.0',
      },
    },
  })

  fastify.register(async function (fastify) {
    fastify.get('/api/docs', { schema: { hide: true } }, (_request, reply) => {
      reply.type('text/html').send(apiReferenceHtml)
    })

    fastify.get('/api/docs/json', { schema: { hide: true } }, (_request, reply) => {
      reply.send(fastify.swagger())
    })
  })
})

const apiReferenceHtml = `
<!DOCTYPE html>
<html>
  <head>
    <title>Scalar API Reference</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>

  <body>
    <div id="app"></div>

    <!-- Load the Script -->
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>

    <!-- Initialize the Scalar API Reference -->
    <script>
      Scalar.createApiReference("#app", {
        // The URL of the OpenAPI/Swagger document
        url: "/api/docs/json",
        // Avoid CORS issues
        proxyUrl: "https://proxy.scalar.com",
      });
    </script>
  </body>
</html>
`
