<template lang="pug">
    .btn.btn-block.btn-outline-primary
        | {{ name }}
</template>

<script>
  export default {
    props: {
      odd: {
        type: Object,
        required: true
      }
    },
    computed: {
      name() {
        return `${this.odd.name} ${this.odd.value}`
      }
    }
  }
</script>

<style scoped>

</style>
