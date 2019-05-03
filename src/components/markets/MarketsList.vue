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

export default {
  components: {
    EsportsUpcomingCardItem,
    EsportsLiveCardItem,
    SportsLiveCardItem,
    SportsUpcomingCardItem
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
      default: () => { return MarketItem }
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
        if (market.priority === 0 && market.status === INACTIVE_STATUS) return market
        return market && allowedStatuses.includes(market.status)
      }).sort((a, b) => {
        return a.priority - b.priority || a.id - b.id
      })
    }
  }
}
</script>
