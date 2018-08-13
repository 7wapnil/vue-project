<template>
    <b-card id="betslip">
        <div slot="header">Betslip ({{betslipOdds.length}})</div>
        <b-tabs class="mt-2" v-if="betslipOdds.length > 0">
            <b-tab class="p-2 px-2" title="Single" active="">
                <div class="mt-4" id="markets-in-betslip">
                    <div v-for="odd in betslipOdds" :key="odd.id">
                        <market-in-betslip v-bind='{odd}'/>
                    </div>
                </div>
                <div class="mt-4 text-right">
                    <div class="row my-2" id="total-odds">
                        <div class="col text-nowrap text-right">Total Odds:</div>
                        <div class="col-4" id="total-odds-value">{{totalOdds}}</div>
                    </div>
                    <div class="row my-2" id="total-stake">
                        <div class="col text-nowrap text-right">Total stake:</div>
                        <div class="col-4" id="total-stake-value">{{totalStakes}}</div>
                    </div>
                    <div class="row my-2" id="total-return">
                        <div class="col text-nowrap text-right">Total return:</div>
                        <div class="col-4" id="total-return-value">{{totalReturn}}</div>
                    </div>
                    <div class="row"></div>
                </div>
                <div class="mt-4">
                    <button class="btn btn-danger btn-lg btn-block" id="placeBets"
                            v-on:click="$emit('placeBetslip')">Place bet
                    </button>
                </div>
            </b-tab>
            <b-tab title="Accumulator"><p class="m-3">To be implemented</p></b-tab>
            <b-tab title="System"><p class="m-3">To be implemented</p></b-tab>
        </b-tabs>
    </b-card>
</template>

<script>
    import MarketInBetslip from './MarketInBetslip.vue'

    export default {
        components: {
            MarketInBetslip
        },
        computed: {
            betslipOdds() {
                return this.$store.getters.getBets
            },
            totalOdds: function () {
                return this.$store.getters.getBets.length
            },
            totalStakes: function () {
                return this.$store.getters.getBets.map(el => el.stake).reduce((a, b) => +a + +b, '') || 0
            },
            totalReturn: function () {
                return Math.round(this.$store.getters.getBets.map(el => el.stake * el.odd.value).reduce((a, b) => +a + +b, '')) || 0
            }
        }
    }
</script>
