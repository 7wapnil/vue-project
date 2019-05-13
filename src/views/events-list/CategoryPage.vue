<template>
  <b-row
    class="pt-2"
    no-gutters>
    <b-col>
      <filter-tabs
        v-if="!showTitles"
        :upcoming-context="upcomingContext"
        @tab-changed="onFilterChange" />

      <events-list
        :title-id="$route.params.titleId"
        :category-id="$route.params.categoryId"
        :context="selectedFilter.context"
        :key="selectedFilter.context"
        :tab-id="selectedFilter.value"/>
    </b-col>
  </b-row>
</template>

<script>
import { UPCOMING_LIMITED } from '@/constants/graphql/event-context'
import FilterTabs from '@/views/events-list/FilterTabs'
import EventsList from '@/components/events/EventsList'
import HybridCard from '@/views/events-list/HybridCard'

export default {
  components: {
    FilterTabs,
    HybridCard,
    EventsList
  },
  data () {
    return {
      selectedFilter: {},
      upcomingContext: UPCOMING_LIMITED
    }
  },
  computed: {
    showTitles () {
      return this.$route.name === 'title-kind'
    }
  },
  methods: {
    onFilterChange (tab) {
      this.selectedFilter = tab
    }
  }
}
</script>
