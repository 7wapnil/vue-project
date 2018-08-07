<template lang="pug">
    b-card#betslip(header="Betslip(2)")
        b-tabs.mt-2
            b-tab(title='Single', active='').p-2.px-2
                div#markets-in-betslip.mt-4
                    div(v-for="odd in betslipOdds" :key="odd.id")
                         market-in-betslip
                div.mt-4.text-right
                        .row.my-2#total-odds
                            .col.text-nowrap.text-right
                                = "Total Odds:"
                            .col-2#total-odds-value
                                = "0"
                        .row.my-2#total-stake
                            .col.text-nowrap.text-right
                                = "Total stake:"
                            .col-2#total-stake-value
                                = "0"
                        .row.my-2#total-return
                            .col.text-nowrap.text-right
                                = "Total return:"
                            .col-2#total-return-value
                                = "0"
                        .row_
                div.mt-4
                    button#placeBets.btn.btn-danger.btn-lg.btn-block(v-on:click="$emit('placeBetslip')")
                        = "Place bet"
            b-tab(title='Accumulator')
                p.m-3
                    = "To be implemented"
            b-tab(title='System')
                p.m-3
                    = "To be implemented"

</template>

<script>
    import MarketInBetslip from './MarketInBetslip.vue'

    export default {
        components: {
            MarketInBetslip
        },
        computed: {
            betslipOdds(){
                return this.$store.getters.getBets
            }
        }
    }
</script>
