<template>
  <b-button
    :disabled="isDisabled"
    :data-id="odd.id"
    variant="arc-clr-soil-cover"
    class="mb-2"
    @click="addOdd">
    {{ odd.name }}: {{ odd.value }} {{ event.live ? '+' : '-' }}
  </b-button>
</template>

<script>
import { INACTIVE_STATUS as ODD_INACTIVE_STATUS } from '@/models/odd'
import { mapActions, mapGetters } from 'vuex'

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
      raised: null,
      diff: 0
    }
  },
  computed: {
    ...mapGetters('app', [
      'appState'
    ]),
    isDisabled () {
      const isFeedConnected = this.event.live
        ? this.appState.live_connected
        : this.appState.pre_live_connected

      return this.disabled || !isFeedConnected || this.odd.status === ODD_INACTIVE_STATUS
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
