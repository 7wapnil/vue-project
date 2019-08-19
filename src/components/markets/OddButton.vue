<template>
  <b-button
    :disabled="isDisabled"
    :data-id="odd.id"
    :pressed.sync="toggleButton"
    variant="arc-odd"
    @click.stop>
    <b-row no-gutters>
      <b-col
        v-if="hasLeftSection"
        :class="[ toggleButton ? 'text-arc-clr-soil-black' : 'text-arc-clr-iron']"
        class="font-size-12 font-weight-normal"
        cols="auto">
        <slot name="left"/>
      </b-col>
      <b-col>
        {{ value }}
      </b-col>
    </b-row>
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
      if (this.event.startStatus === LIVE && !this.isLiveConnected) {
        return false
      }

      if (!this.event.startStatus === LIVE && !this.isPreLiveConnected) {
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
      'getBets',
      'getAnyFrozenBet'
    ]),
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
    },
    hasLeftSection () {
      return !!this.$slots.left
    }
  },
  methods: {
    isBetExists () {
      return !!this.getBets.find(item => item.oddId === this.odd.id)
    },
    pushBetToBetslip () {
      if (!this.getAnyFrozenBet) {
        this.pushBet({
          event: this.event,
          market: this.market,
          odd: this.odd
        })
      }
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
