<template>
  <div>
    <component
      v-for="market in filteredMarkets"
      :is="itemComponent"
      :key="market.id"
      :event="event"
      :showicons="false"
      :market="market"/>

    <small
      v-if="!filteredMarkets.length"
      class="my-4 d-flex justify-content-center">
      No markets for this event
    </small>
  </div>
</template>

<script>
import MarketItem from '@/components/markets/MarketItem'
import { ACTIVE_STATUS, SUSPENDED_STATUS, INACTIVE_STATUS } from '@/models/market'
import EsportsUpcomingCardItem from '@/components/cards/esports-upcoming-card/EsportsUpcomingCardItem'
import EsportsLiveCardItem from '@/components/cards/esports-live-card/EsportsLiveCardItem'
import SportsLiveCardItem from '@/components/cards/sports-live-card/SportsLiveCardItem'
import SportsUpcomingCardItem from '@/components/cards/sports-upcoming-card/SportsUpcomingCardItem'
import MobileEsportsUpcomingCardItem from '@/components/cards/mobile-esports-upcoming-card/MobileEsportsUpcomingCardItem'
import MobileSportsUpcomingCardItem from '@/components/cards/mobile-sports-upcoming-card/MobileSportsUpcomingCardItem'
import MobileSportsLiveCardItem from '@/components/cards/mobile-sports-live-card/MobileSportsLiveCardItem'

export default {
  components: {
    EsportsUpcomingCardItem,
    EsportsLiveCardItem,
    SportsLiveCardItem,
    SportsUpcomingCardItem,
    MobileEsportsUpcomingCardItem,
    MobileSportsUpcomingCardItem,
    MobileSportsLiveCardItem
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    markets: {
      type: Array,
      required: true
    },
    itemComponent: {
      type: [String, Object],
      default: MarketItem
    }
  },
  computed: {
    filteredMarkets () {
      if (!this.markets) {
        return []
      }

      const allowedStatuses = [
        ACTIVE_STATUS,
        SUSPENDED_STATUS
      ]

      return this.markets.filter((market) => {
        if (!market) return false

        return allowedStatuses.includes(market.status) ||
                (market.priority === 0 && market.status === INACTIVE_STATUS)
      }).sort((a, b) => {
        return a.priority - b.priority || a.id - b.id
      })
    }
  }
}
</script>
