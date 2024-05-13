<template>
  <button
    class="default-font-size default-font"
    :class="selectedClass"
    @click="onToggleSelect"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from '#imports'

defineProps({
  text: String,
})

const isSelected = ref(false)

const selectedClass = computed(() => isSelected.value ? 'active' : '')

function onToggleSelect() {
  isSelected.value = !isSelected.value
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
