<template>
  <main-layout>
    <events-list
      :query-options="{ limit: 10 }"
      header="Live events">

      <simple-event
        slot-scope="{ event }"
        :event="event">

        <markets-list
          :event="event"
          :query-opts="{ limit: 1 }"/>

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
  }
}
</script>
