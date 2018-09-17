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
    </div>
  </div>
</template>

<script>
import MarketItem from './MatketItem'
import { mapGetters, mapActions } from 'vuex'
import { CANCELLED_STATUS } from '@/models/market'

export default {
  components: {
    MarketItem
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    queryOpts: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      loading: true
    }
  },
  sockets: {
    marketAdded ({ eventId, id }) {
      if (eventId !== this.event.id) { return }
      this.addMarket({ variables: this.queryOptions, id })
    },
    marketUpdated ({ eventId, id, changes }) {
      if (eventId !== this.event.id) { return }
      this.updateMarket({ variables: this.queryOptions, id, changes })
    }
  },
  computed: {
    ...mapGetters('markets', [
      'markets'
    ]),
    filteredMarkets () {
      return this.markets.filter((market) => {
        return market.status !== CANCELLED_STATUS
      })
    },
    queryOptions () {
      return {
        ...this.queryOpts,
        eventId: this.event.id
      }
    }
  },
  created () {
    this.loadMarkets()
  },
  methods: {
    ...mapActions('markets', [
      'loadList',
      'addMarket',
      'updateMarket'
    ]),
    loadMarkets () {
      this.loading = true

      this
        .loadList({ variables: this.queryOptions })
        .finally(() => { this.loading = false })
    }
  }
}
</script>
