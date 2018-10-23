<template>
  <div>
    <b-card :bg-variant="cardVariant">
      <div slot="header">
        {{ bet.eventName }}
        <button
          class="close"
          aria-label="Close"
          @click="removeOdd(bet.oddId)">
          <span
            v-show="!bet.frozen"
            aria-hidden="true">
            ×
          </span>
        </button>
      </div>
      <div class="row m-2">
        <p>{{ bet.marketName }}</p>
      </div>
      <div class="row m-2">
        <p>Outcome {{ bet.oddName }} with value {{ bet.currentOddValue }}</p>
      </div>
      <div class="row mt-4 text-right">
        <div class="col-12">
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
          <div class="row my-2">
            <div class="col-8 text-nowrap text-right">
              My Stake:
              <br>
            </div>
            <div class="col-4">
              <input
                v-model="betStake"
                class="form-control"
                type="number"
                name="odd-value"
                min="0">
            </div>
          </div>
          <div class="row my-2">
            <div class="col-8 text-nowrap text-right">
              Potential Return:
            </div>
            <div class="col-4">{{ parseFloat(potentialReturn.toFixed(2)) }}</div>
          </div>
        </div>
      </div>
    </b-card>
    <hr>
  </div>
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
        initial: 'default',
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
