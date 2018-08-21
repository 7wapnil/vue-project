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
                        <div v-for="odd in getBets"
                             :key="odd.id">
                            <market-in-betslip v-bind='{odd}'/>
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
                        <button class="btn btn-danger btn-lg btn-block btn-submit-bets"
                                v-on:click="$emit('placeBetslip')">
                            Place bet
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

  export default {
    components: {
      MarketInBetslip
    },
    computed: {
      ...mapGetters([
               'getBets',
               'getBetsCount',
               'getTotalReturn',
               'getTotalStakes'
             ])
    }
  }
</script>
