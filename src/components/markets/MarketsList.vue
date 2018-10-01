<template>
  <div class="row">
    <div class="col">
      <loader v-if="loading"/>
      <div v-if="!loading">
        <market-item
          v-for="market in filteredMarkets"
          :key="market.id"
          :market="market"/>
      </div>
      <div
        v-if="!loading && !filteredMarkets.length"
        class="text-center">
        <small>No markets for this event</small>
      </div>
    </div>
  </div>
</template>

<script>
import MarketItem from './MatketItem'
import { ACTIVE_STATUS, INACTIVE_STATUS, SUSPENDED_STATUS } from '@/models/market'
import { MARKETS_LIST_QUERY, MARKET_BY_ID_QUERY } from '@/graphql'

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
    }
  },
  data () {
    return {
      loading: 0,
      markets: []
    }
  },
  sockets: {
    marketCreated ({ eventId, id }) {
      if (eventId !== this.event.id) { return }

      if (this.queryOptions.limit && this.markets.length >= this.queryOptions.limit) {
        this.$log.debug(`Markets list is limited to ${this.queryOptions.limit}`)
        return
      }

      this.$log.debug('Market created socket event', id, eventId)
      this.addMarket(id, eventId)
    },
    marketUpdated ({ eventId, id, changes }) {
      if (eventId !== this.event.id) { return }
      this.$log.debug('Market updated socket event', id, changes)
      this.updateMarket(id, changes)
    },
    oddUpdated ({ id, marketId, eventId, changes }) {
      if (eventId !== this.event.id) { return }
      this.$log.debug('Odd updated socket event', id, changes)
      this.updateOdd(id, marketId, changes)
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
    addMarket (id, eventId) {
      this
        .$apollo
        .getClient()
        .query({
          query: MARKET_BY_ID_QUERY,
          variables: { id, eventId },
          fetchPolicy: 'network-only'
        })
        .then(({ data: { markets } }) => {
          if (markets.length === 1) {
            this.updateApolloCache(this.query, (cache) => {
              cache.markets.push({ ...markets[0], __typename: 'Market' })
            })
          }
        })
        .catch(this.$log.error)
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
