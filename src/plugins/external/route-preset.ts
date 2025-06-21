import fp from 'fastify-plugin'
import fastifyRoutePreset from 'fastify-route-preset'

export default fp(async function (fastify) {
  /**
   * A Fastify plugin for adding route presets.
   *
   * @see {@link https://github.com/inyourtime/fastify-route-preset}
   */
  fastify.register(fastifyRoutePreset, {
    onPresetRoute: (routeOptions, presetOptions) => {
      routeOptions.schema = {
        ...presetOptions.schema,
        ...routeOptions.schema,
      }

      routeOptions.config = {
        ...presetOptions.config,
        ...routeOptions.config,
      }
    },
  })
})
