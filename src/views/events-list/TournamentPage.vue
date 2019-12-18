<template>
  <b-row
    class="pt-2 bg-arc-clr-soil-light"
    no-gutters>
    <b-col>
      <scope-breadcrumbs/>
      <div
        v-for="(tab, index) in tabsMapping"
        :key="index">
        <b-col class="d-inline-flex px-0 px-md-4 mt-4 events-list-title">
          <h4 class="ml-4 mb-0 text-arc-clr-white">
            {{ tab.title }}
          </h4>
        </b-col>
        <events-list
          :tab-id="tab.value"
          :events = "events_by_time(tab.value)"
          :loading = "loading" />
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { TOURNAMENT_EVENTS } from '@/graphql'
import EventsList from '@/components/events/EventsList'
import HybridCard from '@/views/events-list/HybridCard'
import ScopeBreadcrumbs from '@/views/events-list/ScopeBreadcrumbs'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { UPCOMING, LIVE } from '@/constants/graphql/event-context'
import { eventUpdatedSubscriber } from '@/helpers/event-subscriptions'

export default {
  components: {
    HybridCard,
    EventsList,
    ScopeBreadcrumbs
  },
  apollo: {
    tournamentEvents () {
      return {
        ...this.query,
        ...this.subscribeToMore
      }
    }
  },
  data () {
    return {
      loading: 0,
      tournamentEvents: [],
      tabsMapping: [{
        value: LIVE,
        title: this.$i18n.t('homePage.live')
      }, {
        value: UPCOMING,
        title: this.$i18n.t('generalTerms.upcoming')
      }]
    }
  },
  computed: {
    query () {
      return {
        query: TOURNAMENT_EVENTS,
        fetchPolicy: NETWORK_ONLY,
        variables() {
            return {
                tournamentId: this.$route.params.tournamentId,
                withScopes: true
            }
        }
      }
    },
    subscribeToMore () {
      return eventUpdatedSubscriber({
        tournamentId: this.$route.params.tournamentId
      })
    }
  },
  methods: {
    events_by_time (tabValue) {
      switch (tabValue) {
        case LIVE: return this.tournamentEvents.live
        case UPCOMING: return this.tournamentEvents.upcoming
        default: return []
      }
    }
  }
}
</script>
