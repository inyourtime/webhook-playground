import path from 'node:path'
import fastify from 'fastify'
import pluginLoader from './plugin-loader.js'

export async function build() {
  const app = fastify({
    logger: true,
  })

  app.register(pluginLoader, {
    dir: path.join(import.meta.dirname, 'plugins'),
  })

  app.register(pluginLoader, {
    dir: path.join(import.meta.dirname, 'routes'),
  })

  return app
}
