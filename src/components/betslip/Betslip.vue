<template>
  <div>
    <no-bets-block/>

    <b-container
      v-if="getBets.length > 0"
      class="m-0 p-0">
      <b-row
        no-gutters
        class="betslip-header">
        <b-col class="p-0">
          <strong>Betslip</strong>
          <span
            v-show="getBets.length > 0"
            class="betslip-bet-count-round">
            <small>
              <b>
                {{ getBets.length }}
              </b>
            </small>
          </span>
        </b-col>
        <b-col
          class="p-0"
          align="right">
          <b-link @click="clearBetslip">
            Clear all
          </b-link>
        </b-col>
      </b-row>

      <b-card
        no-body
        bg-variant="arc-clr-soil-black">
        <b-tabs
          v-model="tabIndex"
          nav-wrapper-class="betslip-tabs-wrapper">
          <b-tab
            :title-link-class="changeStyleTab(0)"
            title="Single"
            no-body>
            <b-row no-gutters>
              <b-col>
                <div
                  v-for="bet in getBets"
                  :key="bet.oddId">
                  <betslip-item :bet="bet"/>
                </div>
              </b-col>
            </b-row>
          </b-tab>

          <b-tab
            :title-link-class="changeStyleTab(1)"
            title="Combo"
            no-body>
            <p class="m-3 text-center">
              To be implemented
            </p>
          </b-tab>

        </b-tabs>
      </b-card>

      <b-card
        v-if="getBets.length > 0"
        bg-variant="arc-clr-soil-black"
        no-body>
        <b-row class="px-3">
          <b-col cols="8">
            <p>Total stake:</p>
          </b-col>
          <b-col
            cols="4"
            class="text-right">
            {{ parseFloat(getTotalStakes.toFixed(2)) }}
          </b-col>
          <b-col cols="8">
            <h5>Total return:</h5>
          </b-col>
          <b-col
            cols="4"
            class="text-right">
            <h5>
              <strong>
                {{ parseFloat(getTotalReturn.toFixed(2)) }}
              </strong>
            </h5>
          </b-col>
        </b-row>
      </b-card>

    </b-container>

    <b-card
      bg-variant="arc-clr-soil-black"
      class="p-2"
      no-body>
      <b-button
        :disabled="!betslipSubmittable"
        size="lg"
        block
        @click="submit">
        <span class="text-uppercase">
            Place bet
        </span>
      </b-button>
    </b-card>

  </div>
</template>

<script>
import BetslipItem from './BetslipItem'
import NoBetsBlock from './NoBetsBlock'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import wallets from '@/mixins/wallets'
import BetslipSerializer from '@/services/serializers/betslip'
import Bet from '@/models/bet'

const BET_DESTROY_TIMEOUT = 5000;

export default {
  components: {
    BetslipItem,
    NoBetsBlock
  },
  mixins: [ wallets ],
  data () {
    return {
      messages: [],
      tabIndex: 0
    }
  },
  computed: {
    ...mapGetters('betslip', [
      'betslipSubmittable',
      'getBets',
      'getBetsCount',
      'getTotalReturn',
      'getTotalStakes'
    ]),
    ...mapGetters([
      'getActiveWallet',
    ])
  },
  methods: {
    ...mapActions('betslip', [
      'placeBets'
    ]),
    ...mapMutations('betslip', [
      'freezeBets',
      'updateBet',
      'removeBetFromBetslip',
      'clearBetslip',
    ]),
    submit () {
      this.freezeBets()

      let betsPayload = BetslipSerializer.serialize({
        bets: this.getBets,
        currencyCode: this.getActiveWallet.currency.code
      })

      this.placeBets(betsPayload)
        .then(this.processBetsPlacementResponse)
        .catch(this.handlePlacementFailure)
    },
    processBetsPlacementResponse (response) {
      this.updateBetsFromResponse(response)
      this.refetchWallets()
    },
    updateBetsFromResponse (response) {
      const bets = this.getBets

      if (response.data && response.data.placeBets) {
        response.data.placeBets.forEach((betPayload) => {
          let bet = bets.find(el => el.oddId === betPayload.odd.id)

          this.updateBet({
            oddId: bet.oddId,
            payload: {
              status: betPayload.status,
              message: betPayload.message,
              externalId: betPayload.id
            }
          })

          if (betPayload.status === Bet.statuses.succeeded) {
            setTimeout(() => {
              this.removeBetFromBetslip(bet.oddId)
            }, BET_DESTROY_TIMEOUT)
          }
        })
      }
    },
    handlePlacementFailure (response) {
      this.$noty.error(response.message, { timeout: 3000 })
      this.clearBetslip()
    },
    changeStyleTab (index) {
      if (this.tabIndex === index) {
        return 'betslipActiveTab'
      } else {
        return 'betslipTab'
      }
    }
  },
}
</script>
