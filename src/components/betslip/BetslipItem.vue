<template>
  <b-card
    :bg-variant="cardVariant"
    no-body
    class="p-2 mb-2">

    <b-row no-gutters>
      <b-col
        class="d-flex justify-content-center market-name">
        <small class="pt-1 text-arc-clr-iron-light">
          {{ bet.eventName }}
        </small>
      </b-col>
      <b-col
        cols="auto"
        class="d-flex justify-content-center"
        @click="removeOdd(bet.oddId)">
        <icon
          v-show="!bet.frozen"
          name="betslip-close"/>
      </b-col>
    </b-row>

    <b-row no-gutters>
      <b-col class="mt-2 d-flex justify-content-center">
          <h6>
            <strong>
              {{ bet.marketName }}
            </strong>
          </h6>
      </b-col>
    </b-row>

    <b-row no-gutters>
      <b-col>
        <b-row no-gutters>
          <b-col class="p-2">
          <small>
            {{ bet.oddName }}
          </small>
          </b-col>
        </b-row>

        <b-row no-gutters>
          <b-col>
            <b-button variant="arc-secondary">
              {{ bet.currentOddValue }}
            </b-button>
          </b-col>
        </b-row>

      </b-col>

    </b-row>

    <b-col class="row mt-2 text-right">
      <b-row class="col-12">
        <div class="row my-2">
          <div class="col-12">
            <b-alert :show="hasMessage">
              {{ bet.message }}
            </b-alert>
            <b-alert
              :show="displayUnconfirmedOddValueDialog"
              variant="danger">
              This bet odd value changed from {{ bet.approvedOddValue }} to {{ bet.currentOddValue }}.
              <b-button
                @click="confirmValue">
                Accept new value
              </b-button>
            </b-alert>
          </div>
        </div>
      </b-row>
    </b-col>

    <b-container class="pl-2 pr-0">
      <b-row no-gutters>
        <b-col>
          <b-row no-gutters>
            <b-col class="mb-1">
              <small class="text-arc-clr-iron">
                <strong>
                  STAKE:
                </strong>
              </small>
            </b-col>
            <div class="w-100"></div>
            <b-col>
              <icon name="betslip-stake" class="mr-1"/>
              <small class="text-arc-clr-iron-light"
                     style="vertical-align: top">
                Bet max
              </small>
            </b-col>
          </b-row>
        </b-col>
        <b-col class="d-flex align-items-center" style="max-width: 79px">
          <b-input
          v-model="betStake"
          class="betslip-input"
          type="number"
          name="odd-value"
          min="0"/>
        </b-col>
      </b-row>
    </b-container>

    <b-row class="pl-2 pr-1">
      <b-col cols="8">
        <small>Potential Return:</small>
      </b-col>
      <b-col
        cols="4"
        align="right">
        <small>
          {{ parseFloat(potentialReturn.toFixed(2)) }}
        </small>
      </b-col>
    </b-row>

  </b-card>
</template>

<script>
import OddButton from '@/components/markets/OddButton.vue'
import Bet from '@/models/bet'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    OddButton
  },
  sockets: {
    oddUpdated (data) {
      if (data.id !== this.bet.oddId || data.changes.value == null) { return }
      this.updateBet({ oddId: this.bet.oddId, payload: { currentOddValue: data.changes.value } })
    },
    oddsUpdated (data) {
      if (data.id !== this.bet.eventId) { return }
      const currentOdd = data.data.find(odd => odd.id === this.bet.oddId)
      if (!currentOdd) { return }
      this.updateBet({ oddId: this.bet.oddId, payload: { currentOddValue: currentOdd.value } })
    }
  },
  props: {
    bet: {
      type: Bet,
      required: true
    },
  },
  computed: {
    potentialReturn: function () {
      const stake = this.bet.stake > 0 ? this.bet.stake : 0
      return stake * this.bet.approvedOddValue
    },
    betStake: {
      get () {
        return this.bet.stake
      },
      set (value) {
        let stakeValue = value > 0 ? value : 0
        this.setBetStake({ oddId: this.bet.oddId, stakeValue })
      }
    },
    displayUnconfirmedOddValueDialog () {
      return (
        this.bet.status === Bet.statuses.initial &&
          this.bet.approvedOddValue !== this.bet.currentOddValue
      )
    },
    cardVariant () {
      const variantMapping = {
        initial: 'arc-clr-soil-dark',
        submitting: 'light',
        pending: 'light',
        succeeded: 'success',
        failed: 'danger'
      }

      if (this.bet.status === Bet.statuses.initial &&
          this.bet.approvedOddValue !== this.bet.currentOddValue
      ) {
        return 'warning'
      }

      return variantMapping[this.bet.status]
    },
    hasMessage () {
      return this.bet.message !== null
    },
    ...mapGetters('betslip', [
      'getBets'
    ])
  },
  methods: {
    ...mapMutations('betslip', [
      'setBetStake',
      'updateBet',
      'removeBetFromBetslip',
    ]),
    confirmValue () {
      this.updateBet({ oddId: this.bet.oddId, payload: { approvedOddValue: this.bet.currentOddValue } })
    },
    removeOdd (oddId) {
      this.removeBetFromBetslip(oddId)
    },
  }
}
</script>
