<template lang="pug">
    .btn.btn-block.btn-outline-primary(v-on:click="$emit('obbButtonClick', odd)")
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
    created(){
        this.$on('obbButtonClick', odd => {
            this.$store.dispatch('addOddtoBetslip', odd)
        })
    }  
  }
</script>

<style scoped>

</style>
