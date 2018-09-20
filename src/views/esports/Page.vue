<template>
  <main-layout>
    <events-list
      :query-options="{ limit: 2, titleId: title }"
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
    title () {
      console.log(this.$route.params.title)
      return this.$route.params.title
    }
  }
}
</script>
