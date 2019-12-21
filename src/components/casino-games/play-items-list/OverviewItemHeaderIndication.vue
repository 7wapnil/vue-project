<template>
  <div class="d-flex flex-row">
    <arc-circle
      v-for="page in pages"
      :key="page"
      :size="6"
      :class="[page === currentPage ? activeClass : '']"
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
    activeClass () {
      return `${this.$route.params.titleKind}-active`
    }
  }
}
</script>

<style lang="scss" scoped>
    .indication-item {
        margin-left: 10px;
    }
    .casino-active {
      width: 20px !important;
      transition: all .7s ease-in-out;
      background-color: $arc-clr-casino-glow !important;
    }
    .live-casino-active {
      width: 20px !important;
      transition: all .7s ease-in-out;
      background-color: $arc-clr-live-casino-glow !important;
    }
</style>
