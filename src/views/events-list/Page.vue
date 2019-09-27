<template>
  <div>
    <introduction-area :title="activeTitle">

      <promo-section>
        <auth-block/>
      </promo-section>

      <tabs-section>
        <sport-tabs @tab-changed="onCategoryChange"/>
        <filter-tabs
          v-if="selectedCategory"
          :selected-category="selectedCategory"
          @tab-changed="onFilterChange"/>
      </tabs-section>

    </introduction-area>

    <esport-events
      v-if="$route.params.titleKind === 'esports' && eventListProps"
      :selected-category="selectedCategory"
      :selected-filter="selectedFilter"
      :key="key" />

    <sport-events
      v-if="$route.params.titleKind === 'sports' && eventListProps"
      :selected-category="selectedCategory"
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
      selectedCategory: null,
      selectedFilter: null,
      isCategoryChanged: false
    }
  },
  computed: {
    eventListProps () {
      if (!this.selectedFilter) { return null }

      return {
        titleId: this.selectedCategory ? this.selectedCategory.value : null,
        tournamentId: this.$route.params.tournamentId || null,
        context: this.selectedFilter ? this.selectedFilter.value : null
      }
    },
    key () {
      if (!this.eventListProps) { return '' }
      return Object.values(this.eventListProps).join(':')
    },
    activeTitle () {
      return { name: this.selectedCategory ? this.selectedCategory.label : 'default' }
    }
  },
  methods: {
    onCategoryChange (tab) {
      this.selectedCategory = tab
    },
    onFilterChange (tab) {
      this.selectedFilter = tab
    }
  }
}
</script>
