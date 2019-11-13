<template>
  <div>
    <b-card
      :img-src="background"
      img-height="290"
      overlay
      class="introduction-area"
      body-class="casino-content-header">

      <promotion-block/>

      <div class="d-flex justify-content-between">
        <game-categories
          v-if="checkEventKind('casino')"
          :current-tab="selectedCategory"
          @tab-changed="onCategoryChange"/>
        <table-categories
          v-if="checkEventKind('live-casino')"
          :current-tab="selectedCategory"
          @tab-changed="onCategoryChange"/>
        <search/>
      </div>
    </b-card>

    <games-overview
      v-if="gamesOverview"
      @tab-changed="onCategoryChange"/>
    <tables-overview
      v-if="tablesOverview"
      @tab-changed="onCategoryChange"/>
    <games-list
      v-if="checkEventKind('casino') && !defaultTab()"
      :selected-category="selectedCategory"/>
    <tables-list
      v-if="checkEventKind('live-casino') && !defaultTab()"
      :selected-category="selectedCategory"/>
  </div>
</template>

<script>
import { findBackgroundSource } from '@/helpers/background-finder'
import PromotionBlock from '@/components/casino-games/header-section/PromotionBlock'
import GameCategories from '@/components/casino-games/header-section/GameCategories'
import TableCategories from '@/components/casino-games/header-section/TableCategories'
import Search from '@/components/casino-games/header-section/Search'
import GamesList from '@/components/casino-games/GamesList'
import TablesList from '@/components/casino-games/TablesList'
import GamesOverview from '@/components/casino-games/GamesOverview'
import TablesOverview from '@/components/casino-games/TablesOverview'

export default {
  components: {
    PromotionBlock,
    GameCategories,
    TableCategories,
    Search,
    GamesList,
    TablesList,
    GamesOverview,
    TablesOverview
  },
  data () {
    return {
      selectedCategory: {}
    }
  },
  computed: {
    background () {
      const name = 'Basketball'
      const route = 'sports'

      return findBackgroundSource({ name, route })
    },
    gamesOverview () {
      return this.checkEventKind('casino') && this.defaultTab()
    },
    tablesOverview () {
      return this.checkEventKind('live-casino') && this.defaultTab()
    }
  },
  methods: {
    onCategoryChange (tab) {
      this.selectedCategory = tab

      window.scrollTo(0, 0);
    },
    checkEventKind (kind) {
      return this.$route.params.titleKind === kind
    },
    defaultTab () {
      return this.selectedCategory.context === 'default'
    }
  }
}
</script>
