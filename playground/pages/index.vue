<template>
  <div>
    Nuxt module playground!

    <button @click="onClick">
      Click me!
    </button>

    <p>{{ user }}</p>
  </div>
</template>

<script setup lang="ts">
const user = ref('')
async function onClick() {
  const { data } = await $fetch('/api/init', { method: 'GET' })
  user.value = data
}
</script>
