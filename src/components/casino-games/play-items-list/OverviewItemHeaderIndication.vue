<template>
  <div class="d-flex flex-row">
    <arc-circle
      v-for="n in pages"
      :class="{'active': n === activePage }"
      :key="n"
      :size="6"
      class="indication-item"
    />
  </div>
</template>

<script>
export default {
  props: {
    pages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    activePage () {
      return this.currentPage === 0 ? 1 : this.currentPage
    }
  }
}
</script>

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
