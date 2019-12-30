<template>
  <div
    :class="classNames"
    class="promo-item"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="$router.push({ path: `/casino/${category.context}` })">
    <arc-circle
      v-if="isMobile && itemsPerPage <= 3"
      :size="30"
      class="down-icon"
      inline
      depends>
      <icon
        :size="16"
        color="arc-clr-soil-black"
        name="chevron-left"/>
    </arc-circle>
    <div
      v-if="isMobile || itemsPerPage > 2"
      class="promo-img" />
    <div class="promo-text">
      <h4 class="header">{{ isMobile ? this.$i18n.t('casino.promo.jackpot') : this.$i18n.t('casino.promo.totalJackpot') }}:</h4>
      <h2 class="amount">€ {{ amount }}</h2>
      <h4 class="play-these-games">{{ this.$i18n.t('casino.promo.playTheseGames') }}</h4>
    </div>
  </div>
</template>

<script>
import { JACKPOT_TOTAL_QUERY } from '@/graphql'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
export default {
  props: {
    category: {
      type: Object,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true,
    }
  },
  data () {
    return {
      amount: 0,
      increaseInterval: null,
    }
  },
  computed: {
    classNames () {
      let classNames = this.isMobile ? 'promo-item-mobile play-item-mobile' : 'promo-item-desktop play-item-desktop'
      if (this.isMobile && this.itemsPerPage > 3) classNames += ' tablet'
      return classNames
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
    }
  },
  apollo: {
    jackpotTotal () {
      return {
        query: JACKPOT_TOTAL_QUERY,
        fetchPolicy: NETWORK_ONLY,
        pollInterval: 60 * 60 * 1000,
        result ({ data }) {
          this.amount = data.jackpotTotal.amount
        }
      }
    }
  },
}
</script>
<style lang="scss"
       scoped>
  .promo-item {
    background-image: url(#{'~@/assets/images/casino-games/lines-background.png'});
    background-repeat: no-repeat;
    background-size: cover;
    transition: all .4s ease-in-out;
    border-radius: 5px;
    position: relative;
    flex: 0 0 auto;
    display: flex;

    .promo-img {
      height: 100%;
      background-image: url(#{'~@/assets/images/casino-games/promo-coins.png'});
      background-repeat: no-repeat;
      background-size: cover;
    }

    .promo-text {
      width: 380px;
      padding: 35px 0;
      text-transform: uppercase;
      .header {
        color: $arc-clr-gold;
        font-weight: $font-weight-bold;
      }
      .play-these-games {color: $arc-clr-iron;}
    }

    &:hover {
      filter: brightness(0.5);
      transform: scale(1.05, 1.09);
      transition: all .4s ease-in-out;
    }
    &-desktop {
      margin: 10px 10px 10px 0;
      cursor: pointer;
      height: 200px;
      max-width: 600px;
      width: 100%;
      .promo-img {min-width: 220px;}
    }
    &-mobile {
      margin: 10px 24px;
      text-align: center;
      .promo-text {
        width: 100%;
        padding: 12px 0;
        .header {font-size: $h6-font-size;}
        .amount {font-size: $h3-font-size;}
        .play-these-games {font-size: $h6-font-size;}
      }
      .down-icon {
        position: absolute;
        bottom: -15px;
        left: calc(50% - 8px);
        transform: rotate(-90deg);
      }
    }
    &-mobile.tablet {
      width: 360px;
      margin: 5px;
      text-align: left;
      .promo-img {
        background-size: contain;
        min-width: 140px;
      }
    }
  }
</style>
