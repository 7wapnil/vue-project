<template>
  <div>
    <div class="d-flex flex-column position-relative">

      <introduction-area :title="activeTitle"/>

      <div
        class="w-100 position-absolute"
        style="bottom: 0;">
        <sport-tabs @tab-changed="onCategoryChange"/>
        <filter-tabs @tab-changed="onFilterChange"/>
      </div>
    </div>

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
import HybridCard from './HybridCard'

export default {
  components: {
    IntroductionArea,
    SportTabs,
    FilterTabs,
    EventsList,
    HybridCard
  },
  data () {
    return {
      offset: {
        top: -218
      },
      selectedCategory: null,
      selectedFilter: null
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
      if (!this.selectedCategory) {
        return null
      }

      return { id: this.selectedCategory.value, name: this.selectedCategory.label }
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
