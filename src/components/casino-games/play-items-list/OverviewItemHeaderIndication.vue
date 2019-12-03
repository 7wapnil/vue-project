<template>
  <div class="d-flex flex-row">
    <arc-circle
      v-for="n in 5"
      class="indication-item"
      :class="{'active': n === 2}"
      :size="6"/>
  </div>
</template>

<style lang="scss" scoped>
    .indication-item {
        margin-left: 10px;
    }
    .active {
        width: 20px !important;
        background-color: #1b9cb0 !important;
        transition: all .7s ease-in-out;
    }
</style>
