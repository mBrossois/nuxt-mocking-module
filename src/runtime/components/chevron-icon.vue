<template>
  <svg
    :class="[orientation, size]"
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    :fill="color"
  ><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" /></svg>
</template>

<script setup lang="ts">
defineProps({
  orientation: String,
  color: {
    type: String,
    default: '#000000',
  },
  size: {
    type: String,
    required: false,
  },
})
</script>

<style scoped>
svg {
  height: 32px;
  width: 32px;
  transition: transform 200ms ease-in-out;
}

svg.small {
  height: 24px;
  width: 24px;
}
.up {
  transform: rotateZ(180deg);
}
</style>
