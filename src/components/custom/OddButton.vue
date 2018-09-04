<template>
  <button
    :disabled="isDisabled"
    :class="{'btn-outline-success': raised, 'btn-outline-danger': !raised}"
    class="btn btn-block btn-outline-primary mb-2"
    @click="obbButtonClick">
    {{ odd.name }} {{ odd.value }} ({{ diff > 0 ? '+' : '' }}{{ diff }})
  </button>
</template>

<script>
export default {
  props: {
    odd: {
      type: Object,
      required: true
    },
    market: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      raised: null,
      diff: 0
    }
  },
  computed: {
    isDisabled () {
      return this.market &&
              this.market.status === 'suspended'
    }
  },
  watch: {
    odd (oldOdd, newOdd) {
      this.diff = (newOdd.value - oldOdd.value).toFixed(2)
      this.raised = oldOdd.value < newOdd.value
      console.log(this.raised, oldOdd.value, newOdd.value)
    }
  },
  methods: {
    obbButtonClick () {
      this.$store.dispatch('addNewEmptyBet', this.odd)
    }
  },
}
</script>
