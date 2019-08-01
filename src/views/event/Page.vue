<template>
  <div class="bg-arc-clr-soil-black">
    <header-section
      v-if="event"
      :event="event"
      :showicons="false">
      <markets-categories
        :event="event"
        :active-index="activeIndex"
        lazy
        tabs-class="event-panel-tabs"
        nav-class="event-panel-tabs-nav mx-md-4 mx-1"
        title-class="event-panel-titles"
        @category-changed="onTabChange"/>
    </header-section>
    <market-category
      v-if="category"
      :event="event"
      :category="category">
      <template #default="{ markets }">
        <markets-list
          v-if="event"
          :event="event"
          :markets="markets"
          :item-component="item"
          class="p-md-4 p-1 bg-arc-clr-soil-light"/>
      </template>
    </market-category>
  </div>
</template>

<script>
import { UNLIMITED_QUERY } from '@/constants/graphql/limits'
import { EVENT_BY_ID_QUERY } from '@/graphql'
import MarketsCategories from '@/components/markets/MarketsCategories'
import HeaderSection from './header-section/HeaderSection'
import MarketsList from '@/components/markets/MarketsList'
import MarketCategory from '@/components/markets/MarketCategory'

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
      marketsLimit: UNLIMITED_QUERY,
      markets: [],
      category: null,
      activeIndex: 0
    }
  },
  computed: {
    eventId () {
      return this.$route.params.id
    },
    item () {
      return () => import(/* webpackChunkName: "event-details-card" */`@/components/cards/EventDetailsCard`)
    }
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
