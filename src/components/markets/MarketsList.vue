<template>
  <div>
    <component
      v-for="market in filteredMarkets"
      :is="itemComponent"
      :key="market.id"
      :event="event"
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
import { ACTIVE_STATUS, INACTIVE_STATUS, SUSPENDED_STATUS } from '@/models/market'

export default {
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
        INACTIVE_STATUS,
        SUSPENDED_STATUS
      ]

      return this.markets.filter((market) => {
        return market && allowedStatuses.includes(market.status)
      })
    }
  }
}
</script>
