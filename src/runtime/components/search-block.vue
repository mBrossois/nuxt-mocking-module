<template>
  <div>
    <div class="input-search">
      <input-field
        :is-search="true"
        placeholder="search..."
        @input-value="onSearchInput"
      />
    </div>
    <div class="filter-selects">
      <select-button
        v-for="filter in filters"
        :key="filter.value"
        :value="filter.value"
        :selected="filter.selected"
        @on-click="onFilterUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Search } from '../types/search'
import InputField from './input-field.vue'
import SelectButton from './select-button.vue'
import { ref } from '#imports'

const emit = defineEmits<{ (e: 'onSearch', search: Search): void }>()

enum filterTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

const filters = ref([
  { value: filterTypes.GET, selected: false },
  { value: filterTypes.POST, selected: false },
  { value: filterTypes.PUT, selected: false },
  { value: filterTypes.DELETE, selected: false },
  { value: filterTypes.PATCH, selected: false },
])

let searchTerm = ''

function onSearchInput(searchValue: string) {
  searchTerm = searchValue
  emitSearch()
}

function onFilterUpdate(filter: string) {
  const filterToUpdate = filters.value.find(filterItem => filterItem.value === filter)
  if (filterToUpdate) {
    filterToUpdate.selected = !filterToUpdate.selected
  }
  emitSearch()
}

function emitSearch() {
  emit('onSearch', { searchTerm, filters: filters.value.reduce((filtersList: Array<string>, filter) => {
    if (filter.selected) filtersList.push(filter.value)
    return filtersList
  }, []),
  })
}
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
