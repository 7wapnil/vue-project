<template>
    <b-card id="betslip">
        <div slot="header">
            Betslip
            <transition name="fade">
                <span v-show="getBets.length > 0">
                    ({{getBets.length}})
                </span>
            </transition>
        </div>
        <b-tabs class="mt-2">
            <b-tab class="p-2 px-2"
                   title="Single"
                   active=""
                   id="betslipSingleTab">
                <div v-if="getBets.length == 0">
                    <p class="m-3">Place your bets</p>
                </div>
                <div v-if="getBets.length > 0">
                    <div class="mt-4"
                         id="markets-in-betslip">
                        <div v-for="bet in getBets"
                             :key="bet.id">
                            <market-in-betslip :row='oddsFullTree.find(row => row.odd.id == bet.odd.id)'
                                               :bet='bet'
                            />
                        </div>

                    </div>
                    <div class="mt-4 text-right">
                        <div class="row my-2 total-stake">
                            <div class="col text-nowrap text-right">
                                Total stake:
                            </div>
                            <div class="col-4 total-stake-value">
                                {{parseFloat(getTotalStakes.toFixed(2))}}
                            </div>
                        </div>
                        <div class="row my-2 total-return">
                            <div class="col text-nowrap text-right">
                                Total return:
                            </div>
                            <div class="col-4 total-return-value">
                                {{parseFloat(getTotalReturn.toFixed(2))}}
                            </div>
                        </div>
                        <div class="row"></div>
                    </div>
                    <div class="mt-4">
                        <button class="btn btn-lg btn-block btn-submit-bets"
                                @click="submit"
                                v-bind:class="{
                                    'btn-danger': !betslipSubmittable ,
                                    'btn-success': betslipSubmittable
                                }"
                                :disabled="!betslipSubmittable"
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
  import MarketInBetslip from './MarketInBetslip.vue'
  import { mapGetters } from 'vuex'
  import { default as wallets } from '@/mixins/wallets';
  import ApiService from '@/services/api/events'
  import BetslipService from '@/services/api/betslip'
  import BetslipSerializer from '@/services/serializers/betslip'

  export default {
    mixins: [ wallets ],
    components: {
      MarketInBetslip
    },
    data() {
      return {
          apiService: this.getNewApiService(this),
          betslipService: this.getNewBetslipService(this),
          events: [],
          messages: []
      }
    },
    created() {
      this.apiService.load()
    },
    methods: {
        getNewApiService: function (that){
            return new ApiService(that)
        },
        getNewBetslipService: function (that){
            return new BetslipService(that)
        },
        submit() {
          this.$store.commit('freezeBets')
          this.$store.commit('setBetslipAsSubmitted')

          let betsPayload = BetslipSerializer.serialize({
            bets: this.getBets,
            currencyCode: this.activeWallet.currency.code
          })

          this.betslipService.place(betsPayload)
      }
    },
    computed: {
      betslipSubmittable() {
        let enabled = false
        if (this.getTotalStakes > 0 &&
            this.getTotalStakes <= this.$store.getters.getActiveWallet.amount &&
            !this.isBetslipSubmitted) {
          enabled = true
        }
        return enabled
      },
        oddsFullTree() {
            let tree = []
            this.events.forEach(function(event) {
                event.markets.forEach(function(market) {
                    market.odds.forEach(function(odd) {
                        const displayEvent = Object.assign({}, event);
                        displayEvent.markets = {}

                        const displayMarket = Object.assign({}, market);
                        displayMarket.odds = {}

                        tree.push({
                                event: displayEvent,
                                eventId: event.id,
                                market: displayMarket,
                                marketId: market.id,
                                odd: odd
                            })
                    })
                })
            })
            return tree
        },
      ...mapGetters([
        'isBetslipSubmitted',
        'getBets',
        'getBetsCount',
        'getTotalReturn',
        'getTotalStakes'
      ])
    }
  }
</script>
