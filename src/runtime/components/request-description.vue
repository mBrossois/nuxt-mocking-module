<template>
  <div>
    <label class="text default-font-size bold">{{ description }}</label>
    <p
      v-if="details"
      class="text default-font-size"
    >
      {{ details }}
    </p>

    <input-field
      v-if="input"
      :input-value="input.value"
      :input-type="input.type"
    />

    <dropdown-search
      v-if="dropdown"
      :dropdown-values="dropdown.dropdownValues"
      :active-value="dropdown.activeValue"
      :component-text-type="dropdown.componentTextType"
      @select="onSelect"
    />
  </div>
</template>

<script setup lang="ts">
import type { InputI } from '../types/mock-list'
import type { Dropdown } from '../types/dropdown'
import InputField from './input-field.vue'
import dropdownSearch from './dropdown-search.vue'

interface props {
  description: string
  details?: string
  input?: InputI
  dropdown?: Dropdown
}

defineProps<props>()
const emit = defineEmits(['selectDropdown'])

function onSelect(value: string) {
  emit('selectDropdown', value)
}
</script>
