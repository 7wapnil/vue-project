<template>
  <div :key="currentLobbyName">
    <introduction-area :title="activeTitle">

      <promo-section>
        <auth-block v-observe-visibility="visibilityChanged"/>
      </promo-section>

      <tabs-section>
        <sport-tabs @tab-changed="onCategoryChange"/>
        <filter-tabs
          v-if="selectedEventScope"
          :selected-category="selectedEventScope"
          @tab-changed="onFilterChange"/>
      </tabs-section>

    </introduction-area>

    <esport-events
      v-if="checkEventKind('esports')"
      :selected-event-scope="selectedEventScope"
      :selected-tournament="selectedTournament"
      :selected-filter="selectedFilter"
      :key="key" />

    <sport-events
      v-if="checkEventKind('sports')"
      :selected-event-scope="selectedEventScope"
      :selected-tournament="selectedTournament"
      :selected-filter="selectedFilter"
      :key="key" />
  </div>
</template>

<script>
import { ESPORTS } from '@/constants/title-kinds'
import { TOURNAMENT } from '@/constants/event-scopes/kinds'
import { TITLE_QUERY, SCOPE_QUERY } from '@/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { buildTitleTag } from '@/helpers/titles'
import EventsList from '@/components/events/EventsList'
import EsportEvents from '@/components/events/EsportEvents'
import SportEvents from '@/components/events/SportEvents'
import IntroductionArea from '@/components/custom/IntroductionArea'
import SportTabs from './SportTabs'
import FilterTabs from './FilterTabs'
import AuthBlock from '@/views/events-list/AuthBlock'
import PromoSection from '@/views/events-list/PromoSection'
import TabsSection from '@/views/events-list/TabsSection'

export default {
  components: {
    EventsList,
    EsportEvents,
    SportEvents,
    IntroductionArea,
    SportTabs,
    FilterTabs,
    AuthBlock,
    PromoSection,
    TabsSection
  },
  apollo: {
    title () {
      return {
        query: TITLE_QUERY,
        variables: { slug: this.$route.params.titleSlug },
        skip: this.hasTournamentSlug || !this.hasTitleSlug,
        fetchPolicy: NETWORK_ONLY,
        result ({ data }) {
          this.selectedEventScope = buildTitleTag(data.title)
        }
      }
    },
    eventScope () {
      return {
        query: SCOPE_QUERY,
        variables: { slug: this.$route.params.tournamentSlug, kind: TOURNAMENT },
        skip: !this.hasTournamentSlug,
        fetchPolicy: NETWORK_ONLY,
        result ({ data }) {
          const payload = data.eventScope
          this.selectedTournament = payload
          this.selectedEventScope = buildTitleTag(payload.title)
        }
      }
    }
  },
  data () {
    return {
      selectedEventScope: null,
      selectedTournament: null,
      selectedFilter: null,
      isCategoryChanged: false
    }
  },
  computed: {
    eventListProps () {
      if (!this.selectedFilter) { return null }

      return {
        titleId: this.selectedEventScope ? this.selectedEventScope.id : null,
        tournamentId: this.selectedTournament ? this.selectedTournament.id : null,
        context: this.selectedFilter ? this.selectedFilter.value : null
      }
    },
    key () {
      if (!this.eventListProps) { return '' }
      return Object.values(this.eventListProps).join(':')
    },
    activeTitle () {
      return { name: this.selectedEventScope ? this.selectedEventScope.label : 'default' }
    },
    hasTitleSlug () {
      return this.$route.params.titleSlug !== undefined
    },
    hasTournamentSlug () {
      return this.$route.params.tournamentSlug !== undefined
    }
  },
  methods: {
    onCategoryChange (tab) {
      this.selectedEventScope = tab
    },
    onFilterChange (tab) {
      this.selectedFilter = tab
    },
    checkEventKind (kind = ESPORTS) {
      return this.$route.params.titleKind === kind && this.eventListProps
    },
    visibilityChanged () {
      this.$emit('auth-block:changed:visibility')
    }
  }
}
</script>
