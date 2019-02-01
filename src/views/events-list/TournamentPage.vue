<template>
  <b-row
    class="pt-2"
    no-gutters>
    <b-col>

      <events-list
        :title-id="$route.params.titleId"
        :tournament-id="$route.params.tournamentId"
        :live="false">

        <template slot-scope="{ event }">

          <live-event
            v-if="event.live"
            :event="event">
            <markets-list
              :event="event"
              :markets="event.markets" />
          </live-event>
          <upcoming-event
            v-if="!event.live"
            :event="event">
            <markets-list
              :event="event"
              :markets="event.markets" />

          </upcoming-event>
        </template>
      </events-list>
    </b-col>
  </b-row>
</template>

<script>
import EventsList from '@/components/events/EventsList'
import LiveEvent from '@/components/events/LiveEvent'
import UpcomingEvent from '@/components/events/UpcomingEvent'
import MarketsList from '@/components/markets/MarketsList'

export default {
  components: {
    EventsList,
    LiveEvent,
    UpcomingEvent,
    MarketsList
  }
}
</script>
