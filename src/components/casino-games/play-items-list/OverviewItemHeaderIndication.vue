<template>
  <div class="d-flex flex-row">
    <arc-circle
      v-for="n in 5"
      :class="{'active': n === 2}"
      :key="n"
      :size="6"
      class="indication-item"/>
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
