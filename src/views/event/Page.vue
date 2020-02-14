<template>
  <div>
    <header-section
      v-if="event"
      :event="event"
      :twitch-size="twitchSize">
      <markets-categories
        :event="event"
        :active-index="activeIndex"
        lazy
        tabs-class="event-panel-tabs"
        nav-class="event-panel-tabs-nav mx-md-4 mx-1 no-scrollbars"
        title-class="event-panel-titles"
        @update:twitch:size="updateTwitchSize"
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
import { buildDefaultMetaTags } from '@/helpers/meta'
import { UNLIMITED_QUERY } from '@/constants/graphql/limits'
import { ENDED } from '@/constants/event-statuses'
import { EVENT_BY_ID_QUERY } from '@/graphql'
import MarketsCategories from '@/components/markets/MarketsCategories'
import HeaderSection from '@/views/event/header-section/HeaderSection'
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
      twitchSize: false
    }
  },
  metaInfo () {
    return buildDefaultMetaTags({
      title: this.metaTitle,
      description: this.metaDescription,
      i18n: this.$i18n,
      siteUrl: window.location.href
    })
  },
  computed: {
    metaTitle () {
      return (this.event && this.event.metaTitle)
        ? this.event.metaTitle
        : this.$i18n.t(`meta.${this.$route.params.titleKind}.event.title`)
    },
    metaDescription () {
      return (this.event && this.event.metaDescription)
        ? this.event.metaDescription
        : this.$i18n.t(`meta.${this.$route.params.titleKind}.event.description`)
    }
  },
  watch: {
    'event.status': function (value) {
      if (value === ENDED) this.loadModal()
    }
  },
  apollo: {
    event () {
      return {
        query: EVENT_BY_ID_QUERY,
        variables: {
          slug: this.$route.params.eventSlug,
          withScopes: true
        },
        error () {
          this.$router.push({ path: '/page-not-found' })
        }
      }
    }
  },
  methods: {
    onTabChange (tab) {
      this.category = tab
    },
    updateTwitchSize (val) {
      this.twitchSize = val
    },
    loadModal () {
      this.$bvModal.show('PageLeaveModal')
      setTimeout(() => {
        this.$bvModal.hide('PageLeaveModal')
        this.$router.push(`/${this.$route.params.titleKind}`)
      }, 5000)
    }
  }
}
</script>
