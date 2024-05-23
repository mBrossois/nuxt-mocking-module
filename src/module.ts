import { defineNuxtModule, addDevServerHandler, createResolver, extendPages, installModule, extendRouteRules } from '@nuxt/kit'
import { eventHandler, readBody, setResponseStatus } from 'h3'
import { defu } from 'defu'
import { apiEvent } from './runtime/event-handlers/api'
import { mockEvent, mockResponsesEvent } from './runtime/event-handlers/mock'

// Module options TypeScript interface definition
export interface ModuleOptions {
  isActive: boolean
  apiRoutes: string[]
  mocks: []
  mockingRoute: string
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
    apiRoutes: ['/api'],
    mockingRoute: '/mocking',
    mocks: [],
    port: '3000',
  },
  async setup(_options, _nuxt) {
    if (_options.isActive) {
      const { resolve } = createResolver(import.meta.url)

      let activeResponses = {}
      _options.mocks.forEach((mock) => {
        activeResponses = { ...activeResponses, ...mock.mockList.reduce((map, request) => {
          const activeResponse = request.responses.find(response => response.isDefault)
          map[`${request.method}_${request.route}`] = activeResponse || request.responses[0]
          return map
        }, {}) }
      })

      extendPages((pages) => {
        pages.push({
          name: 'nuxt-module-mocking',
          path: _options.mockingRoute,
          file: resolve('./runtime/pages/mocking-overview.vue'),
        })
      })

      _nuxt.options.runtimeConfig.public.mocking = defu(_nuxt.options.runtimeConfig.public.myModule, {
        mock_route: _options.mockingRoute,
        mock_port: _options.port,
      })

      extendRouteRules(_options.mockingRoute, {
        headers: { api_route: _options.mockingRoute },
      })

      // Handles Mocking api requests
      addDevServerHandler({
        route: `${_options.mockingRoute}/get-mocks`,
        handler: eventHandler((event) => {
          return mockEvent(event, _options.mocks)
        }),
      })

      addDevServerHandler({
        route: `${_options.mockingRoute}/get-active-responses`,
        handler: eventHandler((event) => {
          return mockResponsesEvent(event, activeResponses)
        }),
      })

      addDevServerHandler({
        route: `${_options.mockingRoute}/set-active-response`,
        handler: eventHandler(async (event) => {
          const body = await readBody(event).catch(() => {})
          if (body.request && body.response) {
            activeResponses[body.request] = body.response
            setResponseStatus(event, 200, 'succes')
            return { message: `Set value to ${body.response.name}` }
          }
          setResponseStatus(event, 500, 'server-error')
          return
        }),
      })

      // Handles all api requests made to mocking module.
      for(const apiRoute of _options.apiRoutes) {
        addDevServerHandler({
          route: apiRoute,
          handler: eventHandler((event) => {
            return apiEvent(event, apiRoute, activeResponses)
          }),
        })
      }

    }
  },
})
