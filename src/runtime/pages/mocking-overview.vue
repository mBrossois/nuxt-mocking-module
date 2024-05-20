<template>
  <div id="mocking-body">
    <div class="card-grid">
      <div class="header-text">
        <p class="text">
          Mocking module for Nuxt applications
        </p>
        <dropdown-search
          :dropdown-values="headerTitles"
          :active-value="activeGroup"
          component-text-type="h1"
          @select="updateGroup"
        />
      </div>
      <div class="search-box card-layout">
        <search-block />
      </div>
      <div class="requests-list-box card-layout">
        <h2 class="text sub-title">
          Requests
        </h2>
        <request-block
          :requests="mappedRequests[activeGroup]"
          :active-request="activeRequest.name"
          @on-click="setActiveRequest"
        />
      </div>
      <div class="response-list-box card-layout">
        <h2 class="text sub-title">
          Request details
        </h2>
        <request-details-block
          :request-details="activeRequest"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MockRequestDetails, MocksGroup } from '../types/mock-list'

import DropdownSearch from '../components/dropdown-search.vue'
import SearchBlock from '../components/search-block.vue'
import requestBlock from '../components/request-block.vue'
import requestDetailsBlock from '../components/request-details-block.vue'

import { useRuntimeConfig, ref, useFetch } from '#imports'

const url = 'http://localhost:'

const mockRoute = useRuntimeConfig().public.mocking.mock_route
const mockPort = useRuntimeConfig().public.mocking.mock_port

const { data, error } = await useFetch(`${url}${mockPort}${mockRoute}/get-mocks`)

if (error.value) {
  console.log('error', error)
}

const allMocks: Array<MocksGroup> = data.value as Array<MocksGroup>

const headerTitles = allMocks.map(mocks => mocks.groupName)

const activeGroup = ref(headerTitles[0])

const mappedRequests = allMocks.reduce((map, mocksList) => {
  map[mocksList.groupName] = mocksList.mockList
  return map
}, {})

const activeRequest = ref(mappedRequests[activeGroup.value][0])

function setActiveRequest(request: MockRequestDetails) {
  activeRequest.value = request
}

function updateGroup(groupName: string) {
  activeGroup.value = groupName
  setActiveRequest(mappedRequests[activeGroup.value][0])
}
</script>

<style>
@import url("../css/global.css");
#mocking-body {
  --primary-color: #ff9b04;
  --complementary-color: #5804ff;
  --border-color: #747474;
  --border-color-light: #e1e1e1;
  --analogus-first: #ff1d04;
  --analogus-second: #e6ff04;
  --triadic-first: #ffc46a;
  --triadic-second: #ffdca6;
}
</style>

<style scoped>
#mocking-body {
  padding: 4rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-width: 100vw;

  background: linear-gradient(0.45turn, var(--primary-color), var(--complementary-color));
  color: black;
}

.card-grid {
  position: relative;
  background-color: #ffffffb0;
  backdrop-filter: blur(10px);
  width: 1200px;
  margin: 0 auto;
  border-radius: 10px;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(50px, auto);

  padding: 5rem;
  box-sizing: border-box;
}

.header-text {
  grid-column: 1 / 7;
  grid-row: 1;
}

.search-box {
  grid-column: 1 / 7;
  grid-row: 2;
}

.requests-list-box {
  grid-column: 1 / 3;
  grid-row: 3;
}
.response-list-box {
  grid-column: 3 / 7;
  grid-row: 3;
}
.card-layout {
  background-color: white;
  border-radius: 10px;
  padding: .6rem;
}
</style>
