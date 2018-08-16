<template lang="pug">
    div
        b-card
            div(slot='header')
                = "{{event.name}}"
                button.close(aria-label="Close")
                    span(aria-hidden="true" @click="removeOdd(odd.odd)")
                        ="×"
            .row.m-2
                p
                    = "{{market.name}}"
            .row.m-2
                p
                    = "Outcome {{odd.odd.name}} with value {{odd.odd.value}}"
            .row.mt-4.text-right
                .col-12
                    .row.my-2
                        .col-8.text-nowrap.text-right
                            = "My Stake:"
                            br
                            button.btn.btn-sm.btn-outline-secondary.my-2
                                = "Place max bet"
                        .col-4
                            input.form-control(type='text', name='odd-value', v-model="odd.stake")
                    .row.my-2
                        .col-8.text-nowrap.text-right
                            = "Potential Return:"
                        .col-4
                            = "{{potentialReturn}}"
        hr
</template>

<script>
  import OddButton from '@/components/custom/OddButton.vue'

  export default {
    props: {
      odd: {
        type: Object,
        required: true
      }
    },
    components: {
      OddButton
    },
    computed: {
      market: function () {
        return {name: "Market of Odd " + this.odd.odd.id}
      },
      event: function () {
        return {name: "Event of Odd " + this.odd.odd.id}
      },
      potentialReturn: function () {
        return Math.round(this.odd.stake * this.odd.odd.value)
      }
    },
    methods: {
      removeOdd: function (odd) {
        this.$store.commit('removeBetFromBetslip', odd)
      }
    }
  }
</script>
