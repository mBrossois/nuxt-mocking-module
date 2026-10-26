import { getMocks } from './mocking'

export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2026-10-26',
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
      ],
    },
  },
  nuxtMockingModule: {
    isActive: true,
    mocks: getMocks(),
    port: '3000',
    apiRoutes: ['/api'],
  },
})
