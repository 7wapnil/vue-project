<template>
  <main-layout>
    <events-list
      :query-options="queryOptions"
      header="Live events">

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
    queryOptions () {
      const titleId = this.$route.params.title || null
      return {
        limit: !titleId ? 10 : null,
        titleId
      }
    }
  }
}
</script>
