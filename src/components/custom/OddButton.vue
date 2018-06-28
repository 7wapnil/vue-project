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
        return `${this.odd.name} ${this.odd.odd_values[0].value}`
      }
    }
  }
</script>

<style scoped>

</style>
