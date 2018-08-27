<template>
    <div class="btn btn-block btn-outline-primary mb-2"
         :class="{'btn-outline-success': diff > 0, 'btn-outline-danger': diff < 0}"
         @click="obbButtonClick">
        {{ odd.name }} {{ odd.value }} ({{ diff > 0 ? '+' : '' }}{{ diff }})
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
        raised: null,
        diff: 0
      }
    },
    methods: {
      obbButtonClick() {
        this.$store.dispatch('addOddtoBetslip', this.odd)
      }
    },
    watch: {
      odd(oldOdd, newOdd) {
        this.diff = (newOdd.value - oldOdd.value).toFixed(2)
        this.raised = oldOdd.value < newOdd.value
        console.log(this.raised, oldOdd.value, newOdd.value)
      }
    }
  }
</script>
