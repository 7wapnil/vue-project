<template>
  <b-button
    :disabled="isDisabled"
    :data-id="odd.id"
    :pressed.sync="toggleButton"
    variant="arc-odd"
    class="px-2"
    @click.stop>
    <b-row no-gutters>
      <b-col
        :class="[ toggleButton ? 'text-arc-clr-soil-black' : 'text-arc-clr-iron']"
        class="font-size-12 font-weight-normal"
        cols="1">
        <slot name="left"/>
      </b-col>
      <b-col>
        {{ oddValue }}
      </b-col>
      <odd-status :status="oddStatus"/>
    </b-row>
  </b-button>
</template>

<script>
import { INACTIVE_STATUS as ODD_INACTIVE_STATUS } from '@/models/odd'
import { mapActions, mapGetters } from 'vuex'
import { LIVE } from '@/constants/graphql/event-start-statuses'
import { getOddValue } from '@/helpers/odds'
import OddStatus from '@/components/markets/OddStatus'

const ODDSTATUS_TIMEOUT = 3000

export default {
  components: {
    OddStatus
  },
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
      oddStatus: null
    }
  },
  computed: {
    ...mapGetters('betslip', [
      'getBets',
      'placingBetInProgress',
      'getAnyFrozenBet'
    ]),
    isEventAvailable () {
      if (this.event.startStatus === LIVE && !this.isLiveConnected) return false
      if (!this.event.startStatus === LIVE && !this.isPreLiveConnected) return false

      return this.event.visible
    },
    isMarketVisible () {
      return this.market.visible
    },
    isDisabled () {
      return this.disabled ||
             this.odd.status === ODD_INACTIVE_STATUS ||
            !this.isEventAvailable ||
            !this.isMarketVisible
    },
    oddValue () {
      return getOddValue(this.odd.value)
    },
    toggleButton: {
      get () {
        return this.isBetExists()
      },
      set () {
        if (this.isBetExists() && !this.getAnyFrozenBet) {
          return this.removeBetFromBetslip(this.odd.id)
        }
        this.pushBetToBetslip()
      }
    }
  },
  watch: {
    oddValue: function (newValue, oldValue) {
      if (oldValue) {
        this.oddStatus = (oldValue > newValue) ? 1 : 2
        setTimeout(() => {
          this.oddStatus = null
        }, ODDSTATUS_TIMEOUT)
      }
    }
  },
  methods: {
    ...mapActions('betslip', [
      'pushBet',
      'removeBetFromBetslip'
    ]),
    isBetExists () {
      return !!this.getBets.find(item => item.oddId === this.odd.id)
    },
    pushBetToBetslip () {
      if (this.placingBetInProgress || this.getAnyFrozenBet) return

      this.pushBet({
        event: this.event,
        market: this.market,
        odd: this.odd
      })
    }
  }
}
</script>
