<template>
  <main-layout>
    <events-list
      :query-options="liveQuery"
      class="mb-3"
      header="Live events">
      <simple-event
        slot-scope="{ event }"
        :event="event">

        <markets-list
          :event="event"
          :query-options="{ limit: 1 }"/>

      </simple-event>
    </events-list>

    <events-list
      :query-options="upcomingQuery"
      header="Upcoming events">
      <simple-event
        slot-scope="{ event }"
        :event="event">

        <markets-list
          :event="event"
          :query-options="{ limit: 1 }"/>

      </simple-event>
    </events-list>

  </main-layout>
</template>

<script>
import EventsList from '@/components/events/EventsList'
import SimpleEvent from '@/components/events/SimpleEvent'
import MarketsList from '@/components/markets/MarketsList'

export default {
  components: {
    SimpleEvent,
    EventsList,
    MarketsList
  },
  computed: {
    baseQuery () {
      return {
        titleId: this.titleId,
        tournamentId: this.tournamentId
      }
    },
    liveQuery () {
      return {
        ...this.baseQuery,
        inPlay: true
      }
    },
    upcomingQuery () {
      return {
        ...this.baseQuery,
        inPlay: false
      }
    },
    titleId () {
      return this.$route.params.titleId || null
    },
    tournamentId () {
      return this.$route.params.tournamentId || null
    }
  }
}
</script>
