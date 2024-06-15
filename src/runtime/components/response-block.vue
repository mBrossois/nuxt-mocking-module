<template>
  <div class="response-container box-shadow">
    <pre class="response-text text default-font-size">{{ response }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { MockResponses } from '../types/mock-list'

interface MockResponse {
  response: MockResponses
}

const { response } = defineProps<MockResponse>()
</script>

<style scoped>
    .response-container {
        padding: 1rem;
        background-color: var(--border-color);
        color: white;
        max-height: 10rem;
        overflow-y: auto;
        text-wrap: wrap;
    }

    .response-text {
        text-wrap: wrap;
    }
</style>
