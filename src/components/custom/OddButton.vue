<template lang="pug">
    .btn.btn-block.btn-outline-primary(@click="obbButtonClick")
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
