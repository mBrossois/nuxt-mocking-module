import { getMocks } from './mocking'

export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtMockingModule: {
    isActive: true,
    mocks: getMocks(),
    port: '3000',
  },
  devtools: { enabled: true },
})
