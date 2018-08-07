<template lang="pug">
    .btn.btn-block.btn-outline-primary(@click="obbButtonClick")
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
    },
    methods: {
      obbButtonClick() {
        this.$store.dispatch('addOddtoBetslip', this.odd.id)
      }
    }
  }
</script>

<style scoped>

</style>
