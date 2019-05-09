<template>
  <b-row
    class="pt-2"
    no-gutters>
    <b-col>
      <filter-tabs
        v-if="!showTitles"
        :title-id="$route.params.titleId"
        :category-id="$route.params.categoryId"
        @tab-changed="onFilterChange" />
      <events-list
        :title-id="$route.params.titleId"
        :category-id="$route.params.categoryId"
        :context="selectedFilter.context"
        :key="selectedFilter.context">
        <template slot-scope="{ event }">
          <hybrid-card
            :event="event"
            :tab-id="selectedFilter.value"/>
        </template>
      </events-list>
    </b-col>
  </b-row>
</template>

<script>
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
      selectedFilter: {}
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
