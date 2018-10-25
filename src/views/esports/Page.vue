<template>
  <main-layout class="esports">

    <h2>{{ tournament ? tournament.name : 'All tournaments' }}</h2>
    <hr>

    <events-list
      :query-options="liveQuery"
      class="mb-3"
      header="Live events">
      <simple-event
        slot-scope="{ event }"
        :event="event">

        <markets-list
          :event="event"
          :query-options="{ limit: 1 }"/>

      </simple-event>
    </events-list>

    <events-list
      :query-options="upcomingQuery"
      header="Upcoming events">
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
import { TITLE_BY_ID_QUERY } from '@/graphql'
import EventsList from '@/components/events/EventsList'
import SimpleEvent from '@/components/events/SimpleEvent'
import MarketsList from '@/components/markets/MarketsList'

export default {
  components: {
    SimpleEvent,
    EventsList,
    MarketsList
  },
  data () {
    return {
      tournament: null
    }
  },
  computed: {
    baseQuery () {
      return {
        titleId: this.titleId,
        tournamentId: this.tournamentId
      }
    },
    liveQuery () {
      return {
        ...this.baseQuery,
        inPlay: true
      }
    },
    upcomingQuery () {
      return {
        ...this.baseQuery,
        inPlay: false
      }
    },
    titleId () {
      return this.$route.params.titleId || null
    },
    tournamentId () {
      return this.$route.params.tournamentId || null
    }
  },
  watch: {
    tournamentId () {
      this.loadTournament()
    }
  },
  created () {
    this.loadTournament()
  },
  methods: {
    loadTournament () {
      if (!this.tournamentId) {
        this.tournament = null
      } else {
        this
          .$apollo
          .getClient()
          .query({
            query: TITLE_BY_ID_QUERY,
            variables: {
              id: this.titleId,
              withTournaments: true
            }
          })
          .then(({ data: { titles } }) => {
            if (titles.length) {
              this.tournament = titles[0].tournaments.find((item) => {
                return item.id === this.tournamentId
              })
            }
          })
      }
    }
  },
}
</script>
