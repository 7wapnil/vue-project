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

    <events-list
      v-if="eventListProps"
      :key="key"
      :tab-id="selectedFilter.value"
      v-bind="eventListProps"/>
  </div>
</template>

<script>
import IntroductionArea from '@/components/custom/IntroductionArea'
import SportTabs from './SportTabs'
import FilterTabs from './FilterTabs'
import EventsList from '@/components/events/EventsList'
import AuthBlock from '@/views/events-list/AuthBlock'
import PromoSection from '@/views/events-list/PromoSection'
import TabsSection from '@/views/events-list/TabsSection'

export default {
  components: {
    IntroductionArea,
    SportTabs,
    FilterTabs,
    EventsList,
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
        context: this.selectedFilter ? this.selectedFilter.context : null
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
