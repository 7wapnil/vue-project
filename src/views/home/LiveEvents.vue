<template>
  <b-card
    :header="header"
    class="mt-4">
    <b-card
      v-for="event in events"
      :key="event.id"
      class="mt-2">
      <div class="row">
        <div class="col">
          <h5 class="card-title">
            <router-link :to="{ name: 'event', params: { id: event.id } }">
              {{ event.description }}
            </router-link>
          </h5>
        </div>
      </div>

      <live-event :event="event">
        <markets-list
          :event="event"
          :query-opts="{ limit: 1 }"/>
      </live-event>

    </b-card>
  </b-card>
</template>

<script>
import LiveEvent from '@/components/events/LiveEvent'
import MarketsList from '@/components/markets/MarketsList'

export default {
  components: {
    LiveEvent,
    MarketsList
  },
  props: {
    events: {
      type: Array,
      required: true
    },
    header: {
      type: String,
      default: 'Events'
    }
  }
}
</script>
