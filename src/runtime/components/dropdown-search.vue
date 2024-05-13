<template>
  <div class="dropdown">
    <button
      class="dropbtn"
      @click="onToggle"
    >
      <h1 class="text flex align-center">
        {{ activeDropdown }}
        <chevron-icon
          :orientation="orientation"
        />
      </h1>
    </button>
    <div
      id="myDropdown"
      class="dropdown-content"
      :class="dropdownCss"
    >
      <input
        id="searchInput"
        type="text"
        placeholder="Search..."
        @keyup="onKeyUp"
      >
      <button
        v-for="dropdownValue in dropdownValues"
        :key="dropdownValue"
        :class="selectedClass(dropdownValue)"
        @click="onSelect(dropdownValue)"
      >
        {{ dropdownValue }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import chevronIcon from './chevron-icon.vue'
import { computed, ref } from '#imports'

const props = defineProps({
  dropdownValues: Array<string>,
  activeValue: String,
})

const isOpen = ref(false)
const activeDropdown = ref(props.activeValue)

const orientation = computed(() => isOpen.value ? 'up' : 'down')

const dropdownCss = computed(() => isOpen.value ? 'open' : 'closed')

function selectedClass(value: string) {
  return activeDropdown.value === value ? 'active' : ''
}

function onToggle() {
  isOpen.value = !isOpen.value
}

function onKeyUp() {
  console.log('click')
}

function onSelect(value: string) {
  activeDropdown.value = value
  isOpen.value = false
}
</script>

<style scoped>
 /* Dropdown Button */
 .dropbtn {
  background-color: #ffffff00;
  padding: 0;
  font-size: 16px;
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
  background-image: url('../assets/svg/search-icon.svg');
  background-position: 14px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  padding: 14px 20px 12px 45px;
  border: none;
  border-bottom: 1px solid #ddd;
  font-family: 'Courier New', Courier, monospace;
}

/* The search field when it gets focus/clicked on */
#searchInput:focus {outline: 1px solid #ddd;}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  position: absolute;
  background-color: white;
  min-width: 230px;
  border: 1px solid white;
  z-index: 1;

  transition: max-height 200ms ease-in-out, opacity 1ms linear 200ms;
}

/* Links inside the dropdown */
.dropdown-content button {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  border: unset;
  background-color: white;
  width: 100%;
  font-family: 'Courier New', Courier, monospace;
}

.dropdown-content button:hover {
  cursor: pointer;
  background-color: black;
  color: white;
}

.dropdown-content button.active {
  background-color: black;
  color: white;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f1f1}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.open {
  max-height: 10rem;
  opacity: 1;
  overflow: scroll;
  transition: max-height 200ms ease-in-out, opacity 200ms linear 1ms;
}
</style>
