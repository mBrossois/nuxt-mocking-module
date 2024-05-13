<template>
  <div class="request-details-block">
    <request-description
      v-for="request of requestDetails"
      :key="request"
    />
  </div>
</template>

<script setup lang="ts">
import type { MockRequestDetails } from '../types/mock-list'
import RequestDescription from './request-description.vue'

const props = defineProps({
  requestDetails: Array<MockRequestDetails>,
})

console.log(props.requestDetails)
</script>

<style scoped>
.request-details-block {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    grid-auto-rows: auto;
}
</style>
