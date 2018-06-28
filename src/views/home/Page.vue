<template lang="pug">
    main-layout
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
  import EventItem from './EventItem.vue'

  export default {
    components: {
      EventItem
    },
    data() {
      return {
        apiService: new ApiService(this),
        events: []
      }
    },
    created() {
      this.apiService.load()
    }
  }
</script>
