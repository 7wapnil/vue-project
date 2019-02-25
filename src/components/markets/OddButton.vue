<template>
  <b-button
    :disabled="isDisabled"
    :data-id="odd.id"
    :pressed.sync="toggleButton"
    variant="arc-odd">
    {{ value }}
  </b-button>
</template>

<script>
import { INACTIVE_STATUS as ODD_INACTIVE_STATUS } from '@/models/odd'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { LIVE } from '@/constants/graphql/event-start-statuses'

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
      raised: null
    }
  },
  computed: {
    isEventAvailable () {
      if (this.event.start_status === LIVE && !this.isLiveConnected) {
        return false
      }

      if (!this.event.start_status === LIVE && !this.isPreLiveConnected) {
        return false
      }

      return true
    },
    isDisabled () {
      return this.disabled ||
        this.odd.status === ODD_INACTIVE_STATUS ||
       !this.isEventAvailable
    },
    value () {
      return Number(this.odd.value).toFixed(2)
    },
    ...mapGetters('betslip', [
      'getBets'
    ]),
    toggleButton: {
      get () {
        return this.isBetExists()
      },
      set () {
        if (this.isBetExists()) {
          return this.removeBetFromBetslip(this.odd.id)
        }
        this.pushBetToBetslip()
      }
    }
  },
  methods: {
    isBetExists () {
      return !!this.getBets.find(item => item.oddId === this.odd.id)
    },
    pushBetToBetslip () {
      this.pushBet({
        event: this.event,
        market: this.market,
        odd: this.odd
      })
    },
    ...mapActions('betslip', [
      'pushBet'
    ]),
    ...mapMutations('betslip', [
      'removeBetFromBetslip'
    ])
  }
}
</script>
