import { defineNuxtModule, addDevServerHandler, createResolver, extendPages, installModule, extendRouteRules } from '@nuxt/kit'
import { eventHandler } from 'h3'
import { defu } from 'defu'
import { apiEvent } from './runtime/event-handlers/api'
import { mockEvent } from './runtime/event-handlers/mock'

// Module options TypeScript interface definition
export interface ModuleOptions {
  isActive: boolean
  mocks: object | []
  route: string
  port: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-mocking-module',
    configKey: 'nuxtMockingModule',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    isActive: true,
    route: '/mocking',
    mocks: [],
    port: '3000',
  },
  async setup(_options, _nuxt) {
    if (_options.isActive) {
      const { resolve } = createResolver(import.meta.url)
      const mocksMap = new Map<string, object[]>()
      for (const mock of _options.mocks) {
        mocksMap.set(`${mock.name}_${mock.method}`, mock)
      }

      extendPages((pages) => {
        pages.push({
          name: 'nuxt-module-mocking',
          path: _options.route,
          file: resolve('./runtime/pages/mocking-overview.vue'),
        })
      })

      _nuxt.options.runtimeConfig.public.mocking = defu(_nuxt.options.runtimeConfig.public.myModule, {
        mock_route: _options.route,
        mock_port: _options.port,
      })

      extendRouteRules(_options.route, {
        headers: { api_route: _options.route },
      })

      addDevServerHandler({
        route: `${_options.route}`,
        handler: eventHandler((event) => {
          if (event.path !== '/') return mockEvent(event, _options.mocks)
        }),
      })

      addDevServerHandler({
        route: '/api',
        handler: eventHandler((event) => {
          return apiEvent(event)
        }),
      })
    }
  },
})

// https://github.com/nuxt-modules/robots
// import { createResolver, defineNuxtModule, addServerHandler } from '@nuxt/kit'

// export default defineNuxtModule({
//   setup(options) {
//     const { resolve } = createResolver(import.meta.url)

//     addServerHandler({
//       route: '/robots.txt',
//       handler: resolve('./runtime/robots.get.ts'),
//     })
//   },
// })
