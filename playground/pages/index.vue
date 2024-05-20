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
  try {
    const response = await $fetch('/api/init', { method: 'GET' })
    user.value = response.name
  }
  catch (e) {
    user.value = e.response.statusText
  }
}
</script>
