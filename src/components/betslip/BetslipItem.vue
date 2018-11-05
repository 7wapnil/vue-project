<template>
  <b-card no-body
    :bg-variant="cardVariant"
    class="px-2 pb-3 mb-2">

    <b-row>
      <b-col cols="12">
        <span class="mt-3 text-center">
          {{ bet.eventName }}
        </span>

          <span class="close mt-1 mr-1"
                v-show="!bet.frozen"
                @click="removeOdd(bet.oddId)"
                aria-hidden="true">
            ×
          </span>

      </b-col>
    </b-row>

    <b-row>
      <b-col class="m-2" align="center">
        <b>{{ bet.marketName }}</b>
      </b-col>
    </b-row>

    <b-row class="m-2">
      <p>Outcome {{ bet.oddName }} with value {{ bet.currentOddValue }}</p>
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
              <button
                class="btn"
                @click="confirmValue">
                Accept new value
              </button>
            </b-alert>
          </div>
        </div>
      </b-row>
    </b-col>

        <b-row class="my-2 pl-2 pr-1">
          <b-col class="text-left align-items-start d-flex">
            <b>STAKE:</b>
          </b-col>
          <b-col cols="4">
            <b-input
              v-model="betStake"
              type="number"
              name="odd-value"
              min="0"/>
          </b-col>
        </b-row>

        <b-row class="pl-2 pr-1">
          <b-col cols="8">
            Potential Return:
          </b-col>
          <b-col cols="4" align="right">
            {{ parseFloat(potentialReturn.toFixed(2)) }}
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
    oddChange (data) {
      if (data.id !== this.bet.oddId) { return }
      this.updateBet({ oddId: this.bet.oddId, payload: { currentOddValue: data.value } })
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
        initial: 'black-lighter',
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
