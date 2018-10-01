<template>
  <main-layout>
    <events-list
        class="mb-3"
      :query-options="{ inPlay: true, limit: !titleId ? 10 : null, titleId }"
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
        :query-options="{ inPlay: false, limit: !titleId ? 10 : null, titleId }"
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
    titleId () {
      return this.$route.params.title || null
    }
  }
}
</script>
