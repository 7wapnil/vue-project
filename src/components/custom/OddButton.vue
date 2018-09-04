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
import {
  SUSPENDED_STATUS,
  INACTIVE_STATUS,
  SETTLED_STATUS,
  HANDED_OVER_STATUS
} from '@/models/market'

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
      const isMarketDisabled = this.market &&
        [
          SUSPENDED_STATUS,
          INACTIVE_STATUS,
          SETTLED_STATUS,
          HANDED_OVER_STATUS
        ].indexOf(this.market.status) !== -1

      console.log(this.odd)
      return isMarketDisabled || this.odd.status === 'inactive'
    }
  },
  watch: {
    odd (oldOdd, newOdd) {
      this.diff = (newOdd.value - oldOdd.value).toFixed(2)
      this.raised = oldOdd.value < newOdd.value
    }
  },
  methods: {
    obbButtonClick () {
      if (this.isDisabled) { return }
      this.$store.dispatch('addNewEmptyBet', this.odd)
    }
  },
}
</script>
