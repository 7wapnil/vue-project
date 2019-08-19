<template>
  <div
    v-visibility-change="checkEventStatus"
    class="bg-arc-clr-soil-black">
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
          :item-component="itemComponent"
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
import EventDetailsCard from '@/components/cards/EventDetailsCard'
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
      itemComponent: EventDetailsCard,
      marketsLimit: UNLIMITED_QUERY,
      markets: [],
      category: null,
      activeIndex: 0,
      userLeavedPage: false,
      closingStatuses: ['ended', 'closed', 'cancelled', 'abandoned']
    }
  },
  computed: {
    eventId () {
      return this.$route.params.id
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
  created () {
    this.isOutdated()
  },
  methods: {
    onTabChange (tab) {
      this.category = tab
    },
    checkEventStatus (evt, hidden) {
      if (hidden) {
        this.userLeavedPage = true
      }
      if (!hidden && this.userLeavedPage) {
        if (this.isStatusPositive) {
          return this.redirectUser()
        }
        this.userLeavedPage = false
      }
    },
    isStatusPositive () {
      return this.event.status && this.closingStatuses.includes(this.event.status)
    },
    redirectUser () {
      this.$router.push(`/${this.$route.params.titleKind}`)
    },
    startTimeout () {
      const duration = 5 * 60 * 1000
      setTimeout(() => {
        if (this.isStatusPositive) {
          this.redirectUser()
        }
        this.startTimeout()
      }, duration)
    },
    isOutdated () {
      if (this.isStatusPositive) {
        this.redirectUser()
      }
      this.startTimeout()
    }
  }
}
</script>
