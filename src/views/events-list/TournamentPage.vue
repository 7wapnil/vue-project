<template>
  <b-row
    class="pt-2"
    no-gutters>
    <b-col>
      <div
        v-for="(section, index) in sections"
        :key="index">
        <b-col class="d-inline-flex px-4 pt-4 events-list-title">
          <h4 class="ml-4 mb-0 text-arc-clr-white">
            {{ section.title }}
          </h4>
        </b-col>
        <events-list
          :title-id="$route.params.titleId"
          :tournament-id="$route.params.tournamentId"
          :live="false">
          <template slot-scope="{ event }">
            <live-event
              v-if="section.id === 'live' && event.live"
              :event="event">
              <markets-list
                :event="event"
                :markets="[event.dashboard_market]" />
            </live-event>
            <upcoming-event
              v-if="section.id === 'upcoming' && !event.live"
              :event="event">
              <markets-list
                :event="event"
                :markets="[event.dashboard_market]" />
            </upcoming-event>
          </template>
        </events-list>
      </div>

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
  },
  data () {
    return {
      sections: [{
        id: 'live',
        title: 'Live now',
        live: true
      }, {
        id: 'upcoming',
        title: 'Upcoming',
        live: false
      }]
    }
  }
}
</script>
