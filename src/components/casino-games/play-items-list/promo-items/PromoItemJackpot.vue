<template>
  <promo-item
    :items-per-page="itemsPerPage"
    :category="category"
    :click-handler="clickHandler"
  >
    <div class="promo-text">
      <h4 class="promo-text-header">{{ isMobile ? this.$i18n.t('casino.promo.jackpot') : this.$i18n.t('casino.promo.totalJackpot') }}:</h4>
      <h2 class="amount">€ {{ amount }}</h2>
      <h4 class="play-these-games">
        {{ this.$i18n.t('casino.promo.playTheseGames') }}
        <b-img
          v-if="!isMobile || itemsPerPage > 2"
          :src="require('@/assets/icons/long-arrow.svg')"/>
      </h4>
    </div>
  </promo-item>
</template>

<script>
import PromoItem from '@/components/casino-games/play-items-list/promo-items/PromoItem.vue'
import { JACKPOT_TOTAL_QUERY } from '@/graphql'
import { CACHE_AND_NETWORK } from '@/constants/graphql/fetch-policy'

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
  data () {
    return {
      amount: 0,
      increaseInterval: null
    }
  },
  created () {
    this.increaseInterval = setInterval(this.increaseAmount, 5000)
  },
  beforeDestroy () {
    clearInterval(this.increaseInterval);
  },
  methods: {
    increaseAmount () {
      const min = 10
      const max = 100
      this.amount += Math.floor(Math.random() * (max - min + 1)) + min
    },
    clickHandler () {
      this.$router.push({
        name: 'casino-category',
        params: { category: this.category.context }
      })
    }
  },
  apollo: {
    jackpotTotal () {
      return {
        query: JACKPOT_TOTAL_QUERY,
        fetchPolicy: CACHE_AND_NETWORK,
        pollInterval: 60 * 60 * 1000,
        result ({ data }) {
          if (!data) return
          this.amount = data.jackpotTotal.amount
        }
      }
    }
  }
}
</script>

<style lang="scss"
       scoped>
  .play-these-games img {
    margin-left: 20px;
  }
</style>
