<template>
  <div class="casino-games-category">
    <div class="category-header d-flex align-items-center justify-content-between">
      <div class="header-info d-inline-flex">
        <icon
          :name="category.icon"
          class="header-icon mr-2"
          size="24px"/>
        <div class="header-title d-inline text-arc-clr-iron">{{ category.label }}</div>
      </div>
      <div class="header-more">
        <a href="#">
          {{ this.$i18n.t('casino.return') }}
        </a>
      </div>
    </div>
    <b-container>
      <b-row>
        <category-play-item
          v-for="(playItem, index) in playItems"
          :key="index"
          :item="playItem"/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import CategoryPlayItem from './CategoryPlayItem'

export default {
  components: {
    CategoryPlayItem
  },
  props: {
    category: {
      type: Object,
      required: true
    },
    playItems: {
      type: Array,
      default: () => { return [] }
    }
  }
}
</script>
