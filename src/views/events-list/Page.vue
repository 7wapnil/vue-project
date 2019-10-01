<template>
  <div>
    <introduction-area :title="activeTitle">

      <promo-section>
        <auth-block/>
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
      :selected-filter="selectedFilter"
      :key="key" />

    <sport-events
      v-if="checkEventKind('sports')"
      :selected-event-scope="selectedEventScope"
      :selected-filter="selectedFilter"
      :key="key" />
  </div>
</template>

<script>
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
  data () {
    return {
      selectedEventScope: null,
      selectedFilter: null,
      isCategoryChanged: false
    }
  },
  computed: {
    eventListProps () {
      if (!this.selectedFilter) { return null }

      return {
        titleId: this.selectedEventScope ? this.selectedEventScope.value : null,
        tournamentId: this.$route.params.tournamentId || null,
        context: this.selectedFilter ? this.selectedFilter.value : null
      }
    },
    key () {
      if (!this.eventListProps) { return '' }
      return Object.values(this.eventListProps).join(':')
    },
    activeTitle () {
      return { name: this.selectedEventScope ? this.selectedEventScope.label : 'default' }
    }
  },
  methods: {
    onCategoryChange (tab) {
      this.selectedEventScope = tab
    },
    onFilterChange (tab) {
      this.selectedFilter = tab
    },
    checkEventKind (kind = 'esports') {
      return this.$route.params.titleKind === kind && this.eventListProps
    }
  }
}
</script>
