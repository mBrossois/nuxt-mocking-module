# Nuxt mocking module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

The module to deal with easily switching different api responses in the FE!

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- Returning API data from the module
- Creates a GUI on the route you want to easily change the request responses

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npm i nuxt-mocking-module
```

That's it! You can now use My Module in your Nuxt app ✨

## Module options
    isActive: true,
    apiRoutes: ['/api'],
    mockingRoute: '/mocking',
    mocks: [],
    port: '3000',

| Option        | type      | default       | description                                                       |
| ------------- |---------- | ------------  | ----------------------------------------------------------------- |
| isActive      | boolean   | `true`        | Will disable the module when set to false.                        |
| port          | string    | `'3000'`      | This is the port you will host the application on, it is required for the  api request from the mocking route. | 
| apiRoutes     | string[]  | `['/api']`    | Define all the root api routes that are used in the application.  |
| mockingRoute  | string    | `'/mocking'`  | The route where the GUI part will be served.                      |
| mocks         | []        | `[]`          | The mocked data object, read more about setting this up in mocked data object!                                                                                                         |

## Mocked data object
The module requires a mocked data object. The data object has the following setup:
```typescript
// Mocked data object
interface Mocks {
  all_mocks: Array<MocksGroup>
}

interface MocksGroup {
  groupName: string
  requests: Array<MockRequestDetails>
}

interface MockRequestDetails {
  name: string
  route: string
  method: string
  responses: Array<MockResponses>
}

interface MockResponses {
  name: string
  status: number
  delay?: string
  body: object
}
```


## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/my-module/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/my-module

[npm-downloads-src]: https://img.shields.io/npm/dm/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/my-module

[license-src]: https://img.shields.io/npm/l/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/my-module

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
