<template>
  <div>
    <div class="input-search">
      <search-field />
    </div>
    <div class="filter-selects">
      <select-button
        v-for="filter in filtersList"
        :key="filter"
        :text="filter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchField from './search-field.vue'
import SelectButton from './select-button.vue'

const filtersList = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
</script>

<style scoped>
.input-search {
  width: 100%;
  height: 2.2rem;
}

.filter-selects {
  margin-top: .5rem;
  width: 100%;
  height: 2.2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  grid-auto-rows: auto;

}
</style>
