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
    />

    <!-- <dropdown-search
      class="responses"
      :dropdown-values="responseDetailsNames"
      :active-value="responseDetailsNames[0]"
    />

    <RequestDescription
      class="status"
      description="status"
      :details="response.status + ''"
    /> -->
  </div>
</template>

<script setup lang="ts">
import type { MockRequestDetails } from '../types/mock-list'
import RequestDescription from './request-description.vue'

import { ref, computed } from '#imports'

interface MockingRequest {
  requestDetails: MockRequestDetails
}

const { requestDetails } = defineProps<MockingRequest>()
const responseDetailsNames = requestDetails.responses.map(response => response.name)
const response = ref(requestDetails.responses[0])

const activeRequest = responseDetailsNames[0]
const delay = computed(() => requestDetails.delay ? requestDetails.delay.toString() : '0')

const requestLayout = [
  {
    class: 'name',
    description: 'Name',
    details: requestDetails.name,
  },
  {
    class: 'method',
    description: 'Method',
    details: requestDetails.method,
  },
  {
    class: 'route',
    description: 'Route',
    details: requestDetails.route,
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
      dropdownValues: responseDetailsNames,
      activeValue: activeRequest,
      componentTextType: 'p',
    },
  },
  {
    class: 'status',
    description: 'Status',
    details: response.value.status.toString(),
  },
]
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

.status {
    grid-column: 1;
    grid-row: 5;
}
</style>
