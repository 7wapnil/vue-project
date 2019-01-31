<template>
  <b-row
    class="h-100 w-100"
    no-gutters>
    <b-col>

      <div>
        <market-item
          v-for="market in filteredMarkets"
          :key="market.id"
          :event="event"
          :market="market"
          :display-market-name="displayMarketsNames"/>
      </div>

      <small
        v-if="!filteredMarkets.length"
        class="my-4 d-flex justify-content-center">
        No markets for this event
      </small>
    </b-col>
  </b-row>
</template>

<script>
import MarketItem from './MatketItem'
import { ACTIVE_STATUS, INACTIVE_STATUS, SUSPENDED_STATUS } from '@/models/market'

export default {
  components: {
    MarketItem
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
    displayMarketsNames: {
      type: Boolean,
      default: false
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
