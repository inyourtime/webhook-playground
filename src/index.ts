import { build } from './app.js'

const app = await build()

await app.ready()

try {
  await app.listen({
    host: app.config.HOST,
    port: app.config.PORT,
    listenTextResolver: (address) => `Webhook Playground listening on ${address}/api/v1/docs`,
  })
} catch (error) {
  app.log.error(error)
  process.exit(1)
}
