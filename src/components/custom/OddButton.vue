<template lang="pug">
    .btn.btn-block.btn-outline-primary
        | {{ odd.name }} {{ value }}
</template>

<script>
  export default {
    props: {
      odd: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        value: this.odd.value
      }
    },
    sockets: {
      oddChange(data) {
        if (data.id === this.odd.id) {
          return this.value = data.value
        }
      }
    }
  }
</script>

<style scoped>

</style>
