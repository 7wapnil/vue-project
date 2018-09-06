<template>
  <b-card id="betslip">
    <div slot="header">
      Betslip
      <transition name="fade">
        <span v-show="getBets.length > 0">
          ({{ getBets.length }})
        </span>
      </transition>
    </div>
    <b-tabs class="mt-2">
      <b-tab
        id="betslipSingleTab"
        class="p-2 px-2"
        title="Single"
        active="">
        <div v-if="getBets.length == 0">
          <p class="m-3">Place your bets</p>
        </div>
        <div v-if="getBets.length > 0">
          <div
            id="markets-in-betslip"
            class="mt-4">
            <div
              v-for="bet in getBets"
              :key="bet.id">
              <betslip-item
                :row="getEventByOddId(bet.odd.id)"
                :bet="bet"
              />
            </div>

          </div>
          <div class="mt-4 text-right">
            <div class="row my-2 total-stake">
              <div class="col text-nowrap text-right">
                Total stake:
              </div>
              <div class="col-4 total-stake-value">
                {{ parseFloat(getTotalStakes.toFixed(2)) }}
              </div>
            </div>
            <div class="row my-2 total-return">
              <div class="col text-nowrap text-right">
                Total return:
              </div>
              <div class="col-4 total-return-value">
                {{ parseFloat(getTotalReturn.toFixed(2)) }}
              </div>
            </div>
            <div class="row"/>
          </div>
          <div class="mt-4">
            <button
              :class="{
                'btn-danger': !betslipIsSubmittable,
                'btn-success': betslipIsSubmittable
              }"
              :disabled="!betslipIsSubmittable"
              class="btn btn-lg btn-block btn-submit-bets"
              @click="submit"
            >Place bet
            </button>
          </div>
        </div>
      </b-tab>
      <b-tab title="Accumulator">
        <p class="m-3">To be implemented</p>
      </b-tab>
      <b-tab title="System">
        <p class="m-3">To be implemented</p>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import BetslipItem from './BetslipItem.vue'
import { mapGetters } from 'vuex'
import wallets from '@/mixins/wallets';
import EventsService from '@/services/api/events'
import BetslipSerializer from '@/services/serializers/betslip'
import Bet from '@/models/bet'
import EventsLookup from '@/services/helpers/events-lookup'

const BET_DESTROY_TIMEOUT = 5000;

export default {
  components: {
    BetslipItem
  },
  mixins: [ wallets ],
  data () {
    return {
      betslipService: this.getNewBetslipService(this),
      events: [],
      eventsService: this.getNewEventsService(this),
      messages: []
    }
  },
  computed: {
    betslipIsSubmittable () {
      return this.$store.getters.betslipSubmittable(this.events)
    },
    ...mapGetters([
      'getBets',
      'getBetsCount',
      'getTotalReturn',
      'getTotalStakes'
    ])
  },
  created () {
    this.getNewEventsService(this).load()
  },
  methods: {
    getEventByOddId: function (oddId) {
      return EventsLookup.from(this.events).findOddMapRowById(oddId)
    },
    getNewEventsService: function (that) {
      return new EventsService(that)
    },
    submit () {
      this.$store.commit('freezeBets')

      let betsPayload = BetslipSerializer.serialize({
        bets: this.getBets,
        currencyCode: this.activeWallet.currency.code
      })

      this.$store.dispatch('placeBets', betsPayload)
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
          let bet = bets.find(el => el.odd.id === betPayload.odd.id)

          this.$store.commit(
            'updateBet',
            {
              oddId: bet.odd.id,
              payload: {
                status: betPayload.status,
                message: betPayload.message,
                externalId: betPayload.id
              }
            }
          )

          if (betPayload.status === Bet.statuses.succeeded) {
            setTimeout(() => {
              this.$store.commit('removeBetFromBetslip', bet.odd)
            }, BET_DESTROY_TIMEOUT)
          }
        })
      }
    },
    handlePlacementFailure (response) {
      this.$noty.error(response.message, { timeout: 3000 })
      this.$store.commit('clearBetslip')
    }
  },
}
</script>
