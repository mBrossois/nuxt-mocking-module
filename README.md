# Nuxt mocking module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

The module to deal with easily switching different api responses in the FE!

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Requirements
To use this module, you'll need to have the following in your module:
* Typescript
* Nuxt 3
* App.vue should use routing with NuxtPage

## Features

- Returning API data from the module
- Creates a GUI on the route you want to easily change the responses of the requests

![Example of mocking route](/src/assets/img/Screenshot%202024-06-01%20at%2021.37.24.png?raw=true "Example of mocking route")


## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npm i nuxt-mocking-module --save-dev
```
or
```bash
yarn add nuxt-mocking-module --dev
```

After installing the package, make sure you add it to your Nuxt config file.
```typescript
//Nuxt.config.ts

import { getMocks } from './mocking'

export default defineNuxtConfig({
  // Add to your Nuxt modules
  modules: ['nuxt-mocking-module'],
  // Set the Modules properties
  nuxtMockingModule: {
    mocks: getMocks(),
  },
})

```

That's it! You can now use My Module in your Nuxt app ✨

## Module optionss
| Option        | type      | default       | description                                                       |
| ------------- |---------------- | ------------  | ----------------------------------------------------------------- |
| isActive      | boolean         | `true`        | Will disable the module when set to false.                        |
| port          | string          | `'3000'`      | This is the port you will host the application on, it is required for the  api request from the mocking route. | 
| apiRoutes     | string[]        | `['/api']`    | Define all the root api routes that are used in the application.  |
| mockingRoute  | string          | `'/mocking'`  | The route where the GUI part will be served.                      |
| mocks         | MocksGroup[]   | `[]`          | The mocked data object, read more about setting this up in mocked data object!                                                                                                         |

## Mocked data object
The module requires a mocked data object. The data object is based on the following interfaces (a full json object is also accepted):
```typescript
// Mocked data object
Array<MocksGroup>

interface MocksGroup {
  groupName: string
  requests: Array<MockRequests>
}

interface MockRequests {
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
[npm-version-src]: https://img.shields.io/npm/v/nuxt-mocking-module/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://www.npmjs.com/package/nuxt-mocking-module

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-mocking-module.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://www.npmjs.com/package/nuxt-mocking-module

[license-src]: https://img.shields.io/npm/l/nuxt-mocking-module.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-mocking-module

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
