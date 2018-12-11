<template>
  <main-layout :class="titlesKind">

    <!--<h2>{{ tournament ? tournament.name : 'All tournaments' }}</h2>-->
    <!--<hr>-->

    <events-list
      :query-options="baseQuery"
      header="Events">
      <upcoming-event
        slot-scope="{ event }"
        :event="event">

        <markets-list
          :event="event"
          :query-options="{ limit: 1 }" />

      </upcoming-event>
    </events-list>

    <events-list
      :query-options="liveQuery"
      header="Live events"
    >
      <simple-event
        slot-scope="{ event }"
        :event="event">

        <markets-list
          :event="event"
          :query-options="{ limit: 1 }" />

      </simple-event>
    </events-list>

    <events-list
      :query-options="upcomingQuery"
      header="Upcoming in 24 hours">
      <upcoming-event
        slot-scope="{ event }"
        :event="event">

        <markets-list
          :event="event"
          :query-options="{ limit: 1 }" />

      </upcoming-event>
    </events-list>

  </main-layout>
</template>

<script>
import { TITLE_BY_ID_QUERY } from '@/graphql'
import EventsList from '@/components/events/EventsList'
import SimpleEvent from '@/components/events/SimpleEvent'
import MarketsList from '@/components/markets/MarketsList'
import UpcomingEvent from '@/components/events/UpcomingEvent';

export default {
  components: {
    UpcomingEvent,
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
        titleKind: this.titlesKind,
        tournamentId: this.tournamentId,
        withMarkets: true,
        limit: 20
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
        upcoming: true
      }
    },
    titleId () {
      return this.$route.params.titleId || null
    },
    tournamentId () {
      return this.$route.params.tournamentId || null
    },
    titlesKind () {
      const DEFAULT_KIND = 'esports';
      const currentTitleKind = this.$route.params.titleKind;

      if (this.isOneOfValidKinds(currentTitleKind)) {
        return currentTitleKind;
      }

      return DEFAULT_KIND;
    },
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
    },
    isOneOfValidKinds (kind) {
      const VALID_KINDS = [
        'esports',
        'sports',
      ];

      return VALID_KINDS.findIndex((validKind) => kind === validKind) >= 0;
    },
  },
}
</script>
