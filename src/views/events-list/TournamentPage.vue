<template>
  <b-row
    class="pt-2 bg-arc-clr-soil-light"
    no-gutters>
    <b-col>
      <scope-breadcrumbs/>
      <div
        v-for="(tabWithEvents, index) in tabsWithEvents"
        :key="index">
        <b-col class="d-inline-flex px-0 px-md-4 mt-4 events-list-title">
          <h4 class="ml-4 mb-0 text-arc-clr-white">
            {{ tabWithEvents.tab.title }}
          </h4>
        </b-col>
        <events-list
          :tab-id="tabWithEvents.tab.value"
          :events = "tabWithEvents.events"
          :loading = "loading" />
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { buildDefaultMetaTags } from '@/helpers/meta'
import { TOURNAMENT } from '@/constants/event-scopes/kinds'
import { SCOPE_QUERY, TOURNAMENT_EVENTS } from '@/graphql'
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
    eventScope () {
      return {
        query: SCOPE_QUERY,
        fetchPolicy: NETWORK_ONLY,
        variables () {
          return { slug: this.$route.params.tournamentSlug, kind: TOURNAMENT }
        },
        result ({ data }) {
          this.selectedTournament = data.eventScope
        },
        error () {
          this.$router.push({ name: 'not-found' })
        }
      }
    },
    tournamentEvents () {
      return {
        ...this.query,
        ...this.subscribeToMore
      }
    }
  },
  metaInfo () {
    return buildDefaultMetaTags({
      title: this.metaTitle,
      description: this.metaDescription,
      i18n: this.$i18n,
      siteUrl: window.location.href
    })
  },
  data () {
    return {
      loading: 0,
      tournamentEvents: [],
      selectedTournament: null,
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
    metaTitle () {
      return (this.selectedTournament && this.selectedTournament.metaTitle)
        ? this.selectedTournament.metaTitle
        : this.$i18n.t(`meta.${this.$route.params.titleKind}.tournament.title`)
    },
    metaDescription () {
      return (this.selectedTournament && this.selectedTournament.metaDescription)
        ? this.selectedTournament.metaDescription
        : this.$i18n.t(`meta.${this.$route.params.titleKind}.tournament.description`)
    },
    query () {
      return {
        query: TOURNAMENT_EVENTS,
        fetchPolicy: NETWORK_ONLY,
        variables () {
          return { tournamentId: this.tournamentId, withScopes: true }
        }
      }
    },
    subscribeToMore () {
      return eventUpdatedSubscriber({ tournamentId: this.tournamentId })
    },
    tournamentId () {
      return this.selectedTournament ? this.selectedTournament.id : null
    },
    tabsWithEvents () {
      return this.tabsMapping.map((tab) => {
        return { tab: tab, events: this.getEventsByTime(tab.value) }
      })
    }
  },
  methods: {
    getEventsByTime (tabValue) {
      switch (tabValue) {
        case LIVE: return this.tournamentEvents.live
        case UPCOMING: return this.tournamentEvents.upcoming
        default: return []
      }
    }
  }
}
</script>
