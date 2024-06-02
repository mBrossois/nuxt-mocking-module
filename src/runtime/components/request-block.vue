<template>
  <div class="requests">
    <div class="flex-column">
      <button
        v-for="request of requests"
        :key="request.name"
        class="default-font default-font-size"
        :class="activeClass(request.name)"
        @click="emits('onClick', request.name)"
      >
        {{ request.name }}
      </button>
    </div>
    <p
      v-if="showEmptyList"
      class="error-message default-font"
    >
      No requests to be shown...
    </p>
  </div>
</template>

<script setup lang="ts">
import type { MockRequestDetails } from '../types/mock-list'
import { computed } from '#imports'

const props = defineProps({
  requests: Array<MockRequestDetails>,
  activeRequest: String,
})

const showEmptyList = computed(() => !props.requests || props.requests.length === 0)

function activeClass(request: string) {
  return props.activeRequest === request ? 'active' : ''
}

const emits = defineEmits({ onClick: {} })
</script>

<style scoped>
.requests >:not(p.error-message) {
  border-radius: 5px;
  margin-top: .5rem;
  box-shadow: 1px 1px 4px 0px #0006;
  max-height: 20rem;
  overflow-y: auto;
}

button {
  box-sizing: border-box;
  height: 2rem;
  text-align: left;
  border: 2px solid;
  color: var(--border-color);
  background-color: white;
  border: none;
}

button:not(:nth-child(1)) {
  border-top: 2px solid var(--border-color-light)
}

button:hover:not(.active) {
  cursor: pointer;
}

button.active,
button:hover {
  font-weight: bold;
  background-color: var(--border-color);
  color:white;
}
</style>
