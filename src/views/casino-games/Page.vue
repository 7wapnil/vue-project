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
          @tab-changed="onCategoryChange"/>
        <table-categories
          v-if="checkEventKind('live-casino')"
          @tab-changed="onCategoryChange"/>
        <search/>
      </div>
    </b-card>

    <games-list
      v-if="checkEventKind('casino')"
      :selected-category="selectedCategory"/>
    <tables-list
      v-if="checkEventKind('live-casino')"
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

export default {
  components: {
    PromotionBlock,
    GameCategories,
    TableCategories,
    Search,
    GamesList,
    TablesList
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
    }
  },
  methods: {
    onCategoryChange (tab) {
      this.selectedCategory = tab
    },
    checkEventKind (kind) {
      return this.$route.params.titleKind === kind
    }
  }
}
</script>
