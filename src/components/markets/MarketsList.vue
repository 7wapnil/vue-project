<template>
  <div>
    <component
      v-for="market in filteredMarkets"
      :is="item"
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
import { ACTIVE_STATUS, SUSPENDED_STATUS, INACTIVE_STATUS } from '@/models/market'

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
      type: Function,
      default: () => {
        return () => import(/* webpackChunkName: "market-item" */`@/components/markets/MarketItem`)
      }
    }
  },
  computed: {
    item () {
      return this.itemComponent
    },
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
