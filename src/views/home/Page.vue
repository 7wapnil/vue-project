<template lang="pug">
    main-layout
        .row
            .col-xs-12.col-md-2.pull-right.order-md-1
                p.mt-3 Websocket messages
                hr
                ul.list-unstyled
                    li(v-for="message in messages")
                        | {{ message.name }}: {{ message.message }}
            .col-xs-12.col-md-4.pull-right.order-md-12
                betslip
            .col-xs-12.col-md-6.order-md-2
                b-card.mt-4(
                    header="Events"
                )
                    b-card.mt-2(
                        v-for="event in events"
                        :key="event.id"
                    )
                        .row
                            .col
                                h5.card-title {{ event.description }}

                        event-item(:event="event")
</template>

<script>
  import ApiService from '@/services/api/events'
  import Betslip from '@/components/betslip/Betslip.vue'
  import EventItem from './EventItem.vue'

  export default {
    components: {
      EventItem,
      Betslip
    },
    sockets: {
      test(data) {
        console.log(data)
        this.messages.push(data)
      }
    },
    data() {
      return {
        apiService: new ApiService(this),
        events: [],
        messages: []
      }
    },
    created() {
      this.apiService.load()
    }
  }
</script>
