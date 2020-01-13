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
        <b-img
          v-if="!isMobile || itemsPerPage > 2"
          :src="require('@/assets/icons/long-arrow.svg')"/>
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
  .play-these-games img {
    margin-left: 20px;
  }
</style>
