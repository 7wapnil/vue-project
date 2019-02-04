<template>
  <b-row
    class="pt-2"
    no-gutters>
    <b-col>
      <simple-tabs :tabs="tabs">
        <template slot-scope="{ tab }">
          <events-list
            :title-id="$route.params.titleId"
            :category-id="$route.params.categoryId"
            :tournament-id="$route.params.tournamentId"
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
    </b-col>
  </b-row>
</template>

<script>
import LiveEvent from '@/components/events/LiveEvent'
import UpcomingEvent from '@/components/events/UpcomingEvent'
import MarketsList from '@/components/markets/MarketsList'
import EventsList from '@/components/events/EventsList'

export default {
  components: {
    EventsList,
    LiveEvent,
    UpcomingEvent,
    MarketsList
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
    showTitles () {
      return this.$route.name === 'title-kind'
    }
  }
}
</script>
