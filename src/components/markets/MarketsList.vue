<template>
  <b-row
    class="h-100 w-100"
    no-gutters>
    <b-col>
      <loader v-if="loading"/>
      <div v-if="!loading">
        <market-item
          v-for="market in filteredMarkets"
          :key="market.id"
          :event="event"
          :market="market"
          :display-market-name="displayMarketsNames"/>
      </div>
      <small
        v-if="!loading && !filteredMarkets.length"
        class="my-4 d-flex justify-content-center">
        No markets for this event
      </small>
    </b-col>
  </b-row>
</template>

<script>
import MarketItem from './MatketItem'
import { ACTIVE_STATUS, INACTIVE_STATUS, SUSPENDED_STATUS } from '@/models/market'
import { MARKETS_LIST_QUERY } from '@/graphql'

export default {
  components: {
    MarketItem
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    queryOptions: {
      type: Object,
      default () { return {} }
    },
    displayMarketsNames: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: 0,
      markets: []
    }
  },
  sockets: {
    marketsUpdated ({ id, data }) {
      if (id !== this.event.id) { return }
      data.forEach(market => this.updateMarket(market.id, market))
    },
    oddsUpdated ({ id, data }) {
      if (id !== this.event.id) { return }
      data.forEach(odd => this.updateOdd(odd.id, odd.marketId, odd))
    }
  },
  computed: {
    query () {
      return {
        query: MARKETS_LIST_QUERY,
        variables: {
          ...this.queryOptions,
          eventId: this.event.id
        }
      }
    },
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
        return allowedStatuses.includes(market.status)
      })
    }
  },
  watch: {
    queryOptions () {
      this.loadMarkets()
    }
  },
  created () {
    this.loadMarkets()
  },
  methods: {
    loadMarkets () {
      this.$apollo.addSmartQuery('markets', this.query)
    },
    updateMarket (id, changes) {
      this.updateApolloCache(this.query, (cache) => {
        const market = cache.markets.find(market => market.id === id)
        if (market) {
          Object.assign(market, changes)
        }
      })
    },
    updateOdd (id, marketId, changes) {
      this.updateApolloCache(this.query, (cache) => {
        const market = cache.markets.find(market => market.id === marketId)
        if (!market) { return }

        const odd = market.odds.find(odd => odd.id === id)
        if (!odd) { return }

        Object.assign(odd, changes)
      })
    }
  }
}
</script>
