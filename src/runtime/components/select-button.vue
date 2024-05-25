<template>
  <button
    class="default-font-size default-font"
    :class="selectedClass"
    @click="onToggleSelect"
  >
    {{ value }}
  </button>
</template>

<script setup lang="ts">
import type { Filters } from '../types/search'
import { computed } from '#imports'

const props = defineProps< Filters >()

const emit = defineEmits<{ (e: 'onClick', value: string): void }>()

const selectedClass = computed(() => props.selected ? 'active' : '')

function onToggleSelect() {
  emit('onClick', props.value)
}
</script>

<style scoped>
button {
    box-sizing: border-box;
    border: 2px solid var(--complementary-color);
    color: var(--complementary-color);
    background-color: unset;
    cursor: pointer;

    border-radius: 5px;
    box-shadow: 1px 1px 4px 0px #0006;

    transition: all ease-in-out 150ms;
}

button.active {
    background-color: var(--complementary-color);
    color:white;
}
</style>
