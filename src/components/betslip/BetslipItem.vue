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
          :show="valuesUnconfirmed"
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
      </b-container>
    </b-card>
  </div>
</template>

<script>
import OddButton from '@/components/markets/OddButton.vue'
import Bet from '@/models/bet'
import { mapGetters, mapMutations } from 'vuex'
import { UPDATE_MARKET_BY_ID } from '@/graphql'

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
  data () {
    return {
      status: null,
      variantMapping: {
        initial: 'arc-clr-soil-dark',
        submitting: 'light',
        pending: 'light',
        succeeded: 'success',
        failed: 'danger',
        warning: 'warning'
      }
    }
  },
  apollo: {
    $subscribe: {
      marketUpdated: {
        query: UPDATE_MARKET_BY_ID,
        variables () {
          return {
            marketId: this.bet.marketId
          }
        },
        result ({ data }) {
          console.log(data)
          this.updateOdds(data)
        },
      }
    }
  },
  computed: {
    ...mapGetters('betslip', [
      'acceptAllChecked'
    ]),
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
    valuesUnconfirmed () {
      if (!this.acceptAllChecked) {
        return (
          this.bet.status !== Bet.statuses.succeeded &&
                this.bet.approvedOddValue !== this.bet.currentOddValue
        )
      }

      return false
    },
    betStatus () {
      if (this.valuesUnconfirmed) {
        return 'warning'
      }

      return this.bet.status
    },
    cardVariant () {
      return this.variantMapping[this.betStatus]
    },
    hasMessage () {
      return this.bet.message !== null
    }
  },
  methods: {
    ...mapMutations('betslip', [
      'setBetStake',
      'updateBet',
      'removeBetFromBetslip'
    ]),
    updateOdds (market) {
      const bets = this.getBets
      const updateBet = this.updateBet
      const acceptAllChecked = this.acceptAllChecked
      console.log('here')
      console.log(market.odds)
      market.odds.forEach(function (odd) {
        let bet = bets.find(el => el.oddId === odd.id)
        console.log('beginnig', bet)
        if (!bet) return
        updateBet({ oddId: bet.oddId, payload: { currentOddValue: odd.value } })

        if (acceptAllChecked) {
          updateBet({ oddId: bet.oddId, payload: { approvedOddValue: odd.value } })
        }

        console.log('end', bet)
      })
    },
    confirmValue () {
      this.updateBet({ oddId: this.bet.oddId, payload: { approvedOddValue: this.bet.currentOddValue } })
    },
    removeOdd (oddId) {
      this.removeBetFromBetslip(oddId)
    },
  }
}
</script>
