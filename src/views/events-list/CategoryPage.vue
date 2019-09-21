<template>
  <b-row
    class="pt-2"
    no-gutters>
    <b-col>
      <scope-breadcrumbs/>
      <time-filter-tabs
        v-if="!showTitles"
        :upcoming-context="upcomingContext"
        upcoming-label
        @tab-changed="onFilterChange"/>

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
import TimeFilterTabs from '@/views/events-list/TimeFilterTabs'
import EventsList from '@/components/events/EventsList'
import HybridCard from '@/views/events-list/HybridCard'
import ScopeBreadcrumbs from '@/views/events-list/ScopeBreadcrumbs'

export default {
  components: {
    TimeFilterTabs,
    HybridCard,
    EventsList,
    ScopeBreadcrumbs
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
