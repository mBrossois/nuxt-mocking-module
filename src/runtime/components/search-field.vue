<template>
  <div class="search-box flex align-center">
    <img src="../assets/svg/search-icon.svg">
    <input
      class="default-font default-font-size"
      value="search"
    >
  </div>
</template>

<style scoped>
.search-box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    box-shadow: 1px 1px 4px 0px #0006;
    border-radius: 5px;
    gap: 1rem;
    box-sizing: border-box;
    padding-left: 1rem;

}

input {
    flex: 1;
    height: 100%;
    border: unset;
    box-sizing: border-box;
    padding-left: .5rem;
    border-radius: 5px;
}
</style>
