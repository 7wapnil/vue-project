<template>
  <b-button
    :disabled="isDisabled"
    :data-id="odd.id"
    :pressed.sync="toggleButton"
    variant="arc-odd"
    @click="addOdd">
    {{ value }}
  </b-button>
</template>

<script>
import { INACTIVE_STATUS as ODD_INACTIVE_STATUS } from '@/models/odd'
import { mapActions } from 'vuex'

export default {
  props: {
    event: {
      type: Object,
      required: true
    },
    market: {
      type: Object,
      required: true
    },
    odd: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      toggleButton: false,
      raised: null,
      diff: 0
    }
  },
  computed: {
    isDisabled () {
      return this.disabled ||
        this.odd.status === ODD_INACTIVE_STATUS ||
        !this.isEventAvailable(this.event)
    },
    value () {
      return Number(this.odd.value).toFixed(2)
    }
  },
  watch: {
    odd (oldOdd, newOdd) {
      this.diff = (newOdd.value - oldOdd.value).toFixed(2)
      this.raised = oldOdd.value < newOdd.value
    }
  },
  methods: {
    ...mapActions('betslip', [
      'pushBet'
    ]),
    addOdd () {
      if (this.isDisabled) { return }
      this.pushBet({
        event: this.event,
        market: this.market,
        odd: this.odd
      })
    }
  },
}
</script>
