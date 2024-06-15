<template>
  <div class="dropdown">
    <button
      class="dropbtn"
      @click.stop="onToggle"
    >
      <component
        :is="componentTextType"
        class="text flex align-center"
      >
        {{ activeValue }}
        <chevron-icon
          :size="size"
          :orientation="orientation"
        />
      </component>
    </button>
    <div
      id="myDropdown"
      ref="dropdown"
      class="dropdown-content box-shadow"
      tabindex="0"
      :class="dropdownCss"
      @click.stop
    >
      <div class="search-block">
        <input
          id="searchInput"
          v-model="searchInput"
          type="text"
          placeholder="Search..."
          @keyup="onKeyUp"
        >
        <img
          class="search-icon"
          src="../assets/svg/search-icon.svg"
          alt="search icon"
        >
      </div>

      <button
        v-for="dropdownValue in listValues"
        :key="dropdownValue"
        :class="selectedClass(dropdownValue)"
        @click="onSelect(dropdownValue)"
      >
        <chevron-icon
          class="active-icon"
          size="xs"
          :orientation="'right'"
          color="#ff9b04"
        />
        {{ dropdownValue }}
      </button>

      <p
        v-if="showEmptyList"
        class="error-message default-font"
      >
        We couldn't find any result for the search value...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dropdown } from '../types/dropdown'
import { search } from '../utils/search'
import chevronIcon from './chevron-icon.vue'
import { computed, nextTick, onUnmounted, ref, type Ref } from '#imports'

const props = defineProps<Dropdown>()

const emit = defineEmits<{ (e: 'select', value: string): void }>()

const isOpen = ref(false)
const searchInput = ref('')

const listValues = computed(() => searchInput.value !== '' ? filteredList.value : props.dropdownValues)

const showEmptyList = computed(() => listValues.value.length === 0)

const filteredList: Ref<Array<string>> = ref([])

const orientation = computed(() => isOpen.value ? 'up' : 'down')

const dropdownCss = computed(() => isOpen.value ? 'open' : 'closed')

const size = computed(() => props.componentTextType === 'p' ? 'small' : 'big')

function selectedClass(value: string) {
  return props.activeValue === value ? 'active' : ''
}

function onToggle() {
  !isOpen.value && nextTick(() => {
    isOpen.value = true
    document.addEventListener('click', closeDropdown)
  })
  isOpen.value && nextTick(() => {
    closeDropdown()
  })
}

function onKeyUp() {
  filteredList.value = search(props.dropdownValues, searchInput.value)
}

function onSelect(value: string) {
  emit('select', value)
  closeDropdown()
}

function closeDropdown() {
  isOpen.value = false
  document.removeEventListener('click', closeDropdown)
  setTimeout(() => searchInput.value = '', 200)
}

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
 /* Dropdown Button */
 .dropbtn {
  background-color: #ffffff00;
  padding: 0;
  font-size: 14px;
  border: none;
  cursor: pointer;
  font-family: 'Courier New', Courier, monospace;
}

/* Dropdown button on hover & focus */
.dropbtn:hover {
  text-decoration: underline;
}

/* The search field */
#searchInput {
  box-sizing: border-box;

  width: calc(100% - 1rem);
  border-radius: 5px;
  height: 2em;

  padding-left: 1rem;
  padding-right: 2rem;
  border: 1px solid #ddd;

  font-size: 14px;
  font-family: 'Courier New', Courier, monospace;
}

/* The search field when it gets focus/clicked on */
#searchInput:focus {outline: 1px solid #ddd;}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  position: absolute;
  background-color: white;
  min-width: 150px;
  border-radius: 5px;
  z-index: 1;
  padding-top: .5rem;

  transition: max-height 200ms ease-in-out, opacity 1ms linear 200ms;
}

/* Links inside the dropdown */
.dropdown-content button {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  text-align: left;
  display: flex;
  align-items: center;

  border: unset;
  background-color: white;
  width: 100%;
  font-family: 'Courier New', Courier, monospace;

  transition: all ease-in-out 200ms;
}

.dropdown-content button:hover {
  cursor: pointer;
  color: var(--border-color);
}

.active-icon {
  opacity: 0;
}

.dropdown-content button.active > .active-icon,
.dropdown-content button:hover > .active-icon {
  opacity: 1;
}

.dropdown-content button.active {
  color: var(--border-color);
}

/* Search icon block */
.search-block {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-block .search-icon {
  position: absolute;
  right: 1rem;
  height: 20px;
}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.open {
  max-height: 10rem;
  opacity: 1;
  overflow-y: auto;
  transition: max-height 200ms ease-in-out, opacity 200ms linear 1ms;
}

.error-message {
  padding: 0 1rem;
  box-sizing: border-box;
  max-width: 16rem;
}
</style>
