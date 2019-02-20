<template>
  <simple-tabs :tabs="tabs">
    <template slot-scope="{ tab }">
      <events-list
        :title-id="titleId"
        :tournament-id="tournamentId"
        :category-id="categoryId"
        :context="tab.context">

        <template slot-scope="{ event }">

          <live-event
            v-if="tab.id === 'live'"
            :event="event">

            <markets-list
              :event="event"
              :markets="[event.dashboard_market]" />
          </live-event>
          <upcoming-event
            v-if="tab.id === 'upcoming'"
            :event="event">
            <markets-list
              :event="event"
              :markets="[event.dashboard_market]" />

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

export default {
  components: {
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
    },
    tabs: {
      type: Array,
      default () { return [] }
    }
  },
  data () {
    return {
      tabIndex: 1
    }
  },
  computed: {
    tournamentId () {
      return this.$route.params.tournamentId
    }
  }
}
</script>
