<template lang="pug">
    b-card.mt-4(header="Betslip(2)")                           
        div(v-for="odd in betslipOdds" :key="odd.id")
             market-in-betslip                           
        div.mt-4.text-right
                .row.my-2
                    .col.text-nowrap.text-right
                        = "Total Odds:"
                    .col-2
                        = "0"
                .row.my-2
                    .col.text-nowrap.text-right
                        = "Total stake:"
                    .col-2
                        = "0"        
                .row.my-2
                    .col.text-nowrap.text-right
                        = "Total return:"
                    .col-2
                        = "0"
                .row_              
        div.mt-4
            button.btn.btn-danger.btn-lg.btn-block(v-on:click="$emit('placeBetslip')")     
                = "Place bet"
    
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