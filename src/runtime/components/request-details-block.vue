<template>
  <div class="request-details-block">
    <RequestDescription
      v-for="request of requestLayout"
      :key="request.class"
      :class="request.class"
      :description="request.description"
      :details="request.details"
      :input="request.input"
      :dropdown="request.response"
      @select-dropdown="updateActiveResponse"
      @update-input="updateDelay"
    />

    <ResponseBlock
      class="response"
      :response="activeResponse"
    />

    <p
      v-if="error"
      class="error"
    >
      Couldn't load default responses.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { MockRequests, MockResponses } from '../types/mock-list'
import RequestDescription from './request-description.vue'
import ResponseBlock from './response-block.vue'

import { computed, useFetch, useRuntimeConfig } from '#imports'

interface MockingRequest {
  requestDetails: MockRequests
}

const props = defineProps<MockingRequest>()
const emit = defineEmits<{ (e: 'updateDelay'): void }>()

const responses = computed(() => props.requestDetails.responses)

const url = 'http://localhost:'

const mockRoute = useRuntimeConfig().public.mocking.mock_route
const mockPort = useRuntimeConfig().public.mocking.mock_port

interface GetActiveResponseI {
  active_responses: {
    [key: string]: MockResponses
  }
}

const { data, error, refresh } = await useFetch<GetActiveResponseI>(`${url}${mockPort}${mockRoute}/get-active-responses`)
const responseDetailsNames = computed(() => responses.value.map(response => response.name))

const activeResponse = computed(() => {
  if (data.value) {
    return data.value.active_responses[`${props.requestDetails.method}_${props.requestDetails.route}`] ?? { status: '...', name: '...', delay: 0 }
  }
  return { status: '...', name: '...', delay: 0 }
})

const delay = computed(() => activeResponse.value.delay ? activeResponse.value.delay.toString() : '0')

async function updateActiveResponse(value: string) {
  const data = await $fetch(`${url}${mockPort}${mockRoute}/set-active-response`,
    {
      method: 'PUT',
      body: { request: `${props.requestDetails.method}_${props.requestDetails.route}`, response: responses.value.find(response => response.name === value) },
    })
  if (data) {
    refresh()
  }
}

async function updateDelay(delay: string) {
  try {
    const selectedResponse = responses.value.find(response => response.name === activeResponse.value.name)
    const data = await $fetch(`${url}${mockPort}${mockRoute}/set-delay`,
      {
        method: 'PUT',
        body: { request: `${props.requestDetails.method}_${props.requestDetails.route}`, delay: delay },
      })
    if (data && selectedResponse) {
      refresh()
      emit('updateDelay')
    }
  }
  catch (e) {
    console.error('something went wrong')
  }
}

const requestLayout = computed(() => [
  {
    class: 'name',
    description: 'Name',
    details: props.requestDetails.name,
  },
  {
    class: 'method',
    description: 'Method',
    details: props.requestDetails.method,
  },
  {
    class: 'route',
    description: 'Route',
    details: props.requestDetails.route,
  },
  {
    class: 'delay',
    description: 'Delay',
    input: {
      value: delay.value,
      type: 'number',
    },
  },
  {
    class: 'responses',
    description: 'Responses',
    response: {
      dropdownValues: responseDetailsNames.value,
      activeValue: activeResponse.value.name,
      componentTextType: 'p',
    },
  },
])
</script>

<style scoped>
.request-details-block {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 8px;
    row-gap: 20px;
    grid-auto-rows: auto;

    padding-top: .5rem;
}

.name {
    grid-column: 1 / 3;
    grid-row: 1;
}

.method {
    grid-column: 3;
    grid-row: 1;
}

.route {
    grid-column: 1 / 3;
    grid-row: 2;
}

.delay {
    grid-column: 3;
    grid-row: 2;
}

.responses {
    grid-column: 1 / 4;
    grid-row: 4;
}

.response {
    grid-column: 1/4;
    grid-row: 5;
}
.error {
  color: red;
  grid-column: 1/4;
  grid-row: 6;
}
</style>
