<template>
  <promo-item
    :items-per-page="itemsPerPage"
    :category="category"
  >
    <div class="promo-text">
      <h4 class="promo-text-header">{{ this.$i18n.t('casino.promo.hotTables') }}</h4>
      <h2 class="amount">{{ this.$i18n.t('casino.promo.hotStreak') }}</h2>
      <h4 class="play-these-games">
        {{ this.$i18n.t('casino.promo.onTheseTables') }}
        <icon
          v-if="!isMobile || itemsPerPage > 2"
          color="arc-clr-soil-light"
          size="20px"
          name="upcoming-event-arrow-right"/>
      </h4>
    </div>
  </promo-item>
</template>

<script>
import PromoItem from '@/components/casino-games/play-items-list/promo-items/PromoItem.vue'

export default {
  components: {
    PromoItem
  },
  props: {
    category: {
      type: Object,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    }
  },
}
</script>

<style lang="scss"
       scoped>
  .play-these-games i {
    margin-left: 20px;
  }
</style>
