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

      const allmocks = _options.mocks

      let activeResponses = {}
      allmocks.forEach((mock) => {
        activeResponses = { ...activeResponses, ...mock.requests.reduce((map, request) => {
          const activeResponse = request.responses.find(response => response.isDefault)
          map[`${request.method}_${request.route}`] = activeResponse || request.responses[0]
          return map
        }, {}) }
      })

      let activeGroup = allmocks[0].groupName

      let activeRequest = allmocks[0].requests[0]

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
          return mockEvent(event, allmocks)
        }),
      })

      addDevServerHandler({
        route: `${_options.mockingRoute}/get-active-group`,
        handler: eventHandler((event) => {
          setResponseStatus(event, 200, 'succes')
          return activeGroup
        }),
      })

      addDevServerHandler({
        route: `${_options.mockingRoute}/set-active-group`,
        handler: eventHandler(async (event) => {
          const body = await readBody(event).catch(() => {})
          if (body.groupName) {
            activeGroup = body.groupName
            setResponseStatus(event, 200, 'succes')
            return activeGroup
          }
        }),
      })

      addDevServerHandler({
        route: `${_options.mockingRoute}/get-active-request`,
        handler: eventHandler((event) => {
          setResponseStatus(event, 200, 'succes')
          return activeRequest
        }),
      })

      addDevServerHandler({
        route: `${_options.mockingRoute}/set-active-request`,
        handler: eventHandler(async (event) => {
          const body = await readBody(event).catch(() => {})
          if (body.request) {
            activeRequest = body.request
            setResponseStatus(event, 200, 'succes')
            return 'success'
          }
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

      addDevServerHandler({
        route: `${_options.mockingRoute}/set-delay`,
        handler: eventHandler(async (event) => {
          const body = await readBody(event).catch(() => {})
          if (body.request && body.delay) {
            try {
              const groupId = allmocks.findIndex(mockGroup => mockGroup.groupName === activeGroup)
              const requestId = allmocks[groupId].requests.findIndex(request => request.name === activeRequest.name)
              const responseId = allmocks[groupId].requests[requestId].responses.findIndex(response => response.name === activeResponses[body.request].name)
              allmocks[groupId].requests[requestId].responses[responseId].delay = body.delay
              activeRequest.responses[responseId].delay = body.delay
            }
            catch (e) {
              console.log('Could not set delay on global mocks item')
            }
            activeResponses[body.request].delay = body.delay
            setResponseStatus(event, 200, 'succes')
            return { message: `Set value to ${body.delay}` }
          }
          setResponseStatus(event, 500, 'server-error')
          return
        }),
      })

      // Handles all api requests made to mocking module.
      for (const apiRoute of _options.apiRoutes) {
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
