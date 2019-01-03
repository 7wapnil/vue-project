<template>
  <main-layout :class="titlesKind">

    <introduction-area/>

    <category-tabs>

      <sorting-panel>
        <template slot="live">
          <events-list
            :query-options="liveQuery">
            <live-event
              slot-scope="{ event }"
              :event="event">

              <markets-list
                :event="event"
                :query-options="{ limit: 1 }" />

            </live-event>
          </events-list>
        </template>

        <template slot="upcoming">
          <events-list :query-options="upcomingQuery">
            <upcoming-event
              slot-scope="{ event }"
              :event="event">

              <markets-list
                :event="event"
                :query-options="{ limit: 1 }" />

            </upcoming-event>
          </events-list>
        </template>

      </sorting-panel>

    </category-tabs>
  </main-layout>
</template>

<script>
import { TITLE_BY_ID_QUERY } from '@/graphql'
import EventsList from '@/components/events/EventsList'
import MarketsList from '@/components/markets/MarketsList'
import UpcomingEvent from '@/components/events/UpcomingEvent'
import IntroductionArea from '@/components/custom/IntroductionArea'
import CategoryTabs from '@/components/custom/CategoryTabs'
import SortingPanel from '@/components/custom/SortingPanel'
import LiveEvent from '@/components/events/LiveEvent'

export default {
  components: {
    UpcomingEvent,
    EventsList,
    MarketsList,
    IntroductionArea,
    CategoryTabs,
    SortingPanel,
    LiveEvent
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
        limit: 10
      }
    },
    liveQuery () {
      return {
        ...this.baseQuery,
        inPlay: true,
        withDetails: true
      }
    },
    upcomingQuery () {
      return {
        ...this.baseQuery,
        upcoming: true,
        withDetails: true
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
