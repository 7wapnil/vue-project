<template>
  <div>
    <header-section
      v-if="event"
      :event="event"
      :showicons="false">

      <markets-categories
        :event="event"
        :active-index="activeIndex"
        tabs-class="event-panel-tabs"
        title-class="event-panel-titles"
        content-class="event-panel-content"
        lazy
        @change-category="onTabChange"/>
    </header-section>

    <market-category
      v-if="category"
      :event="event"
      :category="category"/>
  </div>
</template>

<script>
import { UNLIMITED_QUERY } from '@/constants/graphql/limits'
import { EVENT_BY_ID_QUERY } from '@/graphql'
import MarketsCategories from '@/components/markets/MarketsCategories'
import HeaderSection from './HeaderSection'
import MarketsList from '@/components/markets/MarketsList'
import EventDetailsCard from '@/components/cards/EventDetailsCard'
import MarketCategory from '@/components/markets/MarketCategory';

export default {
  components: {
    MarketCategory,
    MarketsList,
    MarketsCategories,
    HeaderSection
  },
  data () {
    return {
      event: null,
      itemComponent: EventDetailsCard,
      marketsLimit: UNLIMITED_QUERY,
      markets: [],
      category: null,
      activeIndex: 0
    }
  },
  computed: {
    eventId () {
      return this.$route.params.id
    }
  },
  created () {
    this.activeIndex = 0
  },
  apollo: {
    event () {
      return {
        query: EVENT_BY_ID_QUERY,
        variables: {
          id: this.eventId,
          withScopes: true
        }
      }
    }
  },
  methods: {
    onTabChange (tab) {
      this.category = tab
    }
  }
}
</script>
