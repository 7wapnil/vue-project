<template>
  <div class="casino-games-category">
    <div class="category-header d-flex align-items-center justify-content-between">
      <div class="header-info d-inline-flex">
        <icon
          :name="category.icon"
          class="header-icon mr-2"
          size="24px"/>
        <div class="header-title d-inline text-arc-clr-iron">{{ category.title }}</div>
      </div>
      <div class="header-more">
        View all
        <a href="#">
          {{ category.totalCount }}
          ->
        </a>
      </div>
    </div>
    <div class="d-flex">
      <category-game
        v-for="(game, index) in category.games"
        :key="index"
        :game="game"/>
    </div>
  </div>
</template>

<script>
import CategoryGame from './CategoryGame'

export default {
  components: {
    CategoryGame
  },
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>
