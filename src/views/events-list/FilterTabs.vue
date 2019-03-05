<template>
  <simple-tabs :tabs="tabs">
    <template slot-scope="{ tab }">
      <events-list
        :title-id="titleId"
        :tournament-id="tournamentId"
        :category-id="categoryId"
        :context="tab.context">
        <template slot-scope="{ event }">
          <hybrid-card :event="event"
                       :tab-id="tab.id"/>
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
import { LIVE, UPCOMING } from '@/constants/graphql/event-start-statuses'
import HybridCard from './HybridCard'

export default {
  components: {
    EventsList,
    LiveEvent,
    UpcomingEvent,
    MarketsList,
    HybridCard
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
      tabIndex: 1,
      live: LIVE,
      upcoming: UPCOMING
    }
  },
  computed: {
    tournamentId () {
      return this.$route.params.tournamentId
    }
  }
}
</script>
