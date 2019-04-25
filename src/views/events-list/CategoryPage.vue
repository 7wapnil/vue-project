<template>
  <b-row
    class="pt-2"
    no-gutters>
    <b-col>
      <filter-tabs
        v-if="!showTitles"
        :title-id="$route.params.titleId"
        :category-id="$route.params.categoryId"
        :tabs="tabsMapping"
        @tab-changed="onFilterChange" />
      <events-list
        :title-id="$route.params.titleId"
        :category-id="$route.params.categoryId"
        :context="selectedFilter.context">

        <template slot-scope="{ event }">
          <hybrid-card
            :event="event"
            :tab-id="selectedFilter.id"/>
        </template>
      </events-list>
    </b-col>
  </b-row>
</template>

<script>
import FilterTabs from '@/views/events-list/FilterTabs'
import EventsList from '@/components/events/EventsList'
import HybridCard from '@/views/events-list/HybridCard'
import { UPCOMING_LIMITED } from '@/constants/graphql/event-context'
import { LIVE, UPCOMING } from '@/constants/graphql/event-start-statuses'

export default {
  components: {
    FilterTabs,
    HybridCard,
    EventsList
  },
  data () {
    let liveTab = {
      id: LIVE,
      title: this.$i18n.t('homePage.live'),
      context: LIVE
    }
    let upcomingTab = {
      id: UPCOMING,
      title: this.$i18n.t('homePage.upcoming'),
      context: UPCOMING_LIMITED
    }
    return {
      tabsMapping: [liveTab, upcomingTab],
      selectedFilter: upcomingTab
    }
  },
  computed: {
    showTitles () {
      return this.$route.name === 'title-kind'
    }
  },
  methods: {
    tabChanged (tab) {
      this.selectedFilter = tab
    }
  }
}
</script>
