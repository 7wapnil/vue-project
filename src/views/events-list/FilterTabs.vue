<template>
  <simple-tabs :tabs="tabs">
    <template slot-scope="{ tab }">
      <events-list
        :title-id="titleId"
        :tournament-id="tournamentId"
        :live="tab.live">

        <template slot-scope="{ event }">

          <live-event
            v-if="tab.id === 'live'"
            :event="event">

            <markets-list
              :event="event"
              :markets="event.markets" />
          </live-event>
          <upcoming-event
            v-if="tab.id === 'upcoming'"
            :event="event">
            <markets-list
              :event="event"
              :markets="event.markets" />

          </upcoming-event>
        </template>
      </events-list>

    </template>
  </simple-tabs>

</template>

<script>
import EventsList from '@/components/events/EventsList'
import LiveEvent from '@/components/events/LiveEvent'
import UpcomingEvent from '@/components/events/UpcomingEvent'
import MarketsList from '@/components/markets/MarketsList'
import EventsListCategory from '@/components/events/EventsListCategory'

export default {
  components: {
    EventsListCategory,
    EventsList,
    LiveEvent,
    UpcomingEvent,
    MarketsList
  },
  props: {
    titleId: {
      type: String,
      default: null
    },
    categoryId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      tabIndex: 1,
      tabs: [{
        id: 'live',
        title: 'Live now',
        live: true
      }, {
        id: 'upcoming',
        title: 'Upcoming',
        live: false
      }]
    }
  },
  computed: {
    tournamentId () {
      return this.$route.params.tournamentId
    }
  }
}
</script>
