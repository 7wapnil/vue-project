<template>
    <b-row no-gutters class="t-4">

        <b-col>
            <sport-tabs v-if="showTitles" />
            <template slot-scope="{ tab }">
                <events-list
                        :title-id="$route.params.titleId"
                        :category-id="$route.params.categoryId"
                        :tournament-id="tournamentId"
                        :live="true">
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
                </events-list>
            </template>
            <filter-tabs
                    v-if="!showTitles"
                    :category-id="$route.params.categoryId"
                    :title-id="$route.params.titleId"
                    :tournament-id="tournamentId"
                    :live="true"/>
        </b-col>
    </b-row>
</template>

<script>
  import SportTabs from './SportTabs'
  import FilterTabs from './FilterTabs'
  import EventsList from '@/components/events/EventsList'
  import LiveEvent from '@/components/events/LiveEvent'
  import UpcomingEvent from '@/components/events/UpcomingEvent'
  import MarketsList from '@/components/markets/MarketsList'

  export default {
    name: 'CategoryPage',
    components: {
      SportTabs,
      FilterTabs,
      EventsList,
      LiveEvent,
      UpcomingEvent,
      MarketsList
    },
    computed: {
      showTitles () {
        return this.$route.name === 'title-kind'
      },
      tournamentId () {
        return this.$route.params.tournamentId
      }
    }
  }
</script>
