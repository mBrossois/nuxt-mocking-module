import nuxtMockingModule from '../../../src/module'
import { getMocks } from '../../../playground/mocking'

export default defineNuxtConfig({
  modules: [nuxtMockingModule],
  nuxtMockingModule: {
    isActive: true,
    mocks: getMocks(),
    port: '3000',
    apiRoutes: ['/api'],
  },
})
