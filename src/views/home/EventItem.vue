<template lang="pug">
    .row.align-items-end
        .col-lg-6
            .row
                .col-lg-12.col-sm-6
                    p.card-text.font-weight-bold
                        | {{ event.title_name }}

                .col-lg-12.col-sm-6
                    p.catd-text
                        | {{ fromNow }}

        .col-lg-6
            .row
                .col(v-for="odd in primaryMarket.odds", :key="odd.id")
                    odd-button(:odd="odd")

</template>

<script>
  import moment from 'moment'
  import OddButton from '@/components/custom/OddButton.vue'

  export default {
    components: {
      OddButton
    },
    props: {
      event: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        primaryMarket: null
      }
    },
    created(){
        this.primaryMarket = this.event.markets.find(market => market.priority === 1)
    },
    computed: {
        fromNow() {
          return moment(this.event.start_at).fromNow()
        }
    }
  }
</script>

