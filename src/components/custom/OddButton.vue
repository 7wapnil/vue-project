<template>
    <div class="btn btn-block btn-outline-primary mb-2"
         @click="obbButtonClick">
        {{ odd.name }} {{ value }}
    </div>
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
        this.$store.dispatch('addOddtoBetslip', this.odd)
      }
    }
  }
</script>

<style scoped>

</style>
