<template>
  <b-row
    class="pt-2"
    no-gutters>
    <b-col>
      <events-list-category
        :title-id="$route.params.titleId"
        :tournament-id="$route.params.tournamentId"
        :live="false">

        <template slot-scope="{ event }">

          <live-event
            :event="event">

            <markets-list
              :event="event"
              :markets="event.markets" />
          </live-event>
          <upcoming-event
            :event="event">
            <markets-list
              :event="event"
              :markets="event.markets" />

          </upcoming-event>
        </template>
      </events-list-category>
    </b-col>
  </b-row>
</template>

<script>
import EventsListCategory from '@/components/events/EventsListCategory'
import LiveEvent from '@/components/events/LiveEvent'
import UpcomingEvent from '@/components/events/UpcomingEvent'
import MarketsList from '@/components/markets/MarketsList'

export default {
  name: 'TournamentPage',
  components: {
    EventsListCategory,
    LiveEvent,
    UpcomingEvent,
    MarketsList
  }
}
</script>
