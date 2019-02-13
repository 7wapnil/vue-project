<template>
  <div>
    <b-card
      :bg-variant="cardVariant"
      no-body
      class="px-2 py-3 mb-1">
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
            size="12px"
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
        <b-col cols="4">
          <b-row no-gutters>
            <b-col
              align="center"
              class="p-2">
              <small>
                {{ bet.oddName }}
              </small>
            </b-col>
          </b-row>

          <b-row no-gutters>
            <b-col>
              <b-button
                class="text-arc-clr-gold bg-arc-clr-soil-cover d-flex justify-content-center align-items-center p-0"
                variant="arc-betslip-odd">
                <small>
                  <strong>
                    {{ bet.currentOddValue }}
                  </strong>
                </small>
              </b-button>
            </b-col>
          </b-row>

        </b-col>

      </b-row>

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

    <b-card
      :bg-variant="cardVariant"
      class="mb-1"
      no-body>
      <b-container class="py-3 px-2">
        <b-row no-gutters>
          <b-col>
            <b-row no-gutters>
              <b-col class="mb-1">
                <small class="text-arc-clr-iron">
                  <strong class="text-uppercase">
                    Stake:
                  </strong>
                </small>
              </b-col>
            </b-row>
            <b-row no-gutters>
              <b-col class="d-flex align-items-center">
                <icon
                  name="betslip-stake"
                  size="12px"
                  class="mr-2"/>
                <small class="text-arc-clr-iron-light">
                  Bet max
                </small>
              </b-col>
            </b-row>
          </b-col>

          <b-col
            class="d-flex align-items-center"
            style="max-width: 79px">
            <b-form-input
              v-model="betStake"
              class="betslip-input"
              type="number"
              min="0"
              name="odd-value"/>
          </b-col>
        </b-row>
        <b-alert
          :show="displayUnconfirmedOddValueDialog"
          variant="danger"
          class="mt-3 mx-auto p-2 text-center">
          This bet odd value changed from {{ bet.approvedOddValue }} to {{ bet.currentOddValue }}.
          <b-button
            class="mt-1 mx-auto p-2 text-center"
            @click="confirmValue">
            Accept new value
          </b-button>
        </b-alert>
        <b-alert
          :show="hasMessage"
          class="mt-3 mx-auto p-2 text-center"
          variant="danger">
          {{ bet.message }}
        </b-alert>
        <b-alert
          :show="isSuccess"
          class="mt-3 mx-auto p-2 text-center"
          variant="success">
          Your bet was successfully placed.
        </b-alert>
      </b-container>
    </b-card>
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
        this.bet.status !== Bet.statuses.succeeded &&
              this.bet.approvedOddValue !== this.bet.currentOddValue
      )
    },
    cardVariant () {
      const variantMapping = {
        initial: 'arc-clr-soil-dark',
        submitting: 'light',
        pending: 'light',
        succeeded: 'success',
        failed: 'danger',
        sent_to_external_validation: 'light'
      }

      if (this.bet.status !== Bet.statuses.succeeded &&
          this.bet.approvedOddValue !== this.bet.currentOddValue
      ) {
        return 'warning'
      }

      return variantMapping[this.bet.status]
    },
    hasMessage () {
      return this.bet.message !== null
    },
    isSuccess () {
      return this.bet.success
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
