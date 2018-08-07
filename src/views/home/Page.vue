<template lang="pug">
    main-layout
        .row
            .col-2
                p.mt-3 Websocket messages
                hr
                ul.list-unstyled
                    li(v-for="message in messages")
                        | {{ message.name }}: {{ message.message }}
            .col
                b-card.mt-4(
                    header="Events"
                )
                    b-card.mt-2.event-card(
                        @click="showEventDetails(event)"
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
  import EventItem from './EventItem.vue'

  export default {
    components: {
      EventItem
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
    },
    methods:{
      showEventDetails(event){
        this.$router.push({
          path: `/event/${event.id}`,
          component: Event,
          props: { id: event.id }
        })
      }
    }
  }
</script>
<style scoped>
    .event-card:hover {
        background-color: #f7f7f7;
        cursor: pointer;
    }
</style>
