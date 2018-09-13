<template>
  <main-layout>
    <div class="row">
      <div class="col">
        <b-card
          v-if="event"
          class="mt-4">
          <div slot="header">{{ event.description }}</div>

          <markets-list :event="event"/>

        </b-card>
      </div>
    </div>
  </main-layout>
</template>

<script>
import MarketsList from '@/components/markets/MarketsList'
import { mapActions } from 'vuex'
import { CANCELLED_STATUS } from '@/models/market'

export default {
  components: {
    MarketsList
  },
  data () {
    return {
      event: null
    }
  },
  computed: {
    eventId () {
      return this.$route.params.id
    },
    // markets () {
    //   if (!this.event) {
    //     return [];
    //   }
    //
    //   return this.event.markets.filter((market) => {
    //     return market.status !== CANCELLED_STATUS
    //   })
    // }
  },
  created () {
    this
      .loadOne({ id: this.eventId })
      .then(({ data: { event } }) => {
        this.event = event
      })
  },
  methods: {
    ...mapActions('events', [
      'loadOne'
    ]),
  }
}
</script>
