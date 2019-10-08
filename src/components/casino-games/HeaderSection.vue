<template>
  <b-card
    :img-src="background"
    img-height="290"
    overlay
    class="introduction-area"
    body-class="casino-content-header">

    <promotion-block/>

    <div class="d-flex justify-content-between">
      <game-categories/>
      <search/>
    </div>
  </b-card>
</template>

<script>
import { findBackgroundSource } from '@/helpers/background-finder'
import PromotionBlock from './header-section/PromotionBlock'
import GameCategories from './header-section/GameCategories'
import Search from './header-section/Search'

export default {
  components: {
    PromotionBlock,
    GameCategories,
    Search
  },
  computed: {
    background () {
      const name = 'Basketball'
      const route = 'sports'

      return findBackgroundSource({ name, route })
    }
  }
}
</script>
