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
          :context="tab.context"
          :events = "tournamentEvents.upcoming"/>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import {
  TOURNAMENT_EVENTS,
  TOURNAMENT_EVENT_UPDATED,
} from '@/graphql'
import EventsList from '@/components/events/EventsList'
import HybridCard from '@/views/events-list/HybridCard'
import ScopeBreadcrumbs from '@/views/events-list/ScopeBreadcrumbs'
import { updateCacheList } from '@/helpers/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { UPCOMING_UNLIMITED, UPCOMING } from '@/constants/graphql/event-context'
import { LIVE, CONTEXT_TO_START_STATUS_MAP } from '@/constants/graphql/event-start-statuses'

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
        subscribeToMore: [
          {
            document: this.eventsSubscription.document,
            variables: this.eventsSubscription.variables,
            updateQuery (currentData, { subscriptionData }) {
              const tournamentEvents = currentData.tournamentEvents

              if (!tournamentEvents) return

              const endpoint = Object.keys(subscriptionData.data)[0]
              const attributes = subscriptionData.data[endpoint]
              const startStatus = CONTEXT_TO_START_STATUS_MAP[this.context]
              const isRemoved = attributes.startStatus !== startStatus || !attributes.visible

              return { tournamentEvents: updateCacheList(tournamentEvents, attributes, isRemoved) }
            }
          }
        ]
      }
    }
  },
  data () {
    return {
      tournamentEvents: [],
      tabsMapping: [{
        value: LIVE,
        title: this.$i18n.t('homePage.live'),
        context: LIVE,
        events: []
      }, {
        value: UPCOMING,
        title: this.$i18n.t('generalTerms.upcoming'),
        context: UPCOMING_UNLIMITED,
        events: [] // todo
      }]
    }
  },
  computed: {
    query () {
      return {
        query: TOURNAMENT_EVENTS,
        fetchPolicy: NETWORK_ONLY,
        variables: {
          tournamentId: this.$route.params.tournamentId, // todo
          withScopes: true
        }
      }
    },
    eventsSubscription () {
      let document = TOURNAMENT_EVENT_UPDATED
      let variables = {}
      variables.tournament = this.$route.params.tournamentId // todo

      return {
        document: document,
        variables: variables
      }
    }
  },
}
</script>
