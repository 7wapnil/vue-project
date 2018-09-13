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
import { mapActions } from 'vuex'
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
      loading: true,
      markets: []
    }
  },
  computed: {
    filteredMarkets () {
      return this.markets.filter((market) => {
        return market.status !== CANCELLED_STATUS
      })
    }
  },
  created () {
    this.loadMarkets()
  },
  methods: {
    ...mapActions('markets', [
      'loadList'
    ]),
    loadMarkets () {
      this.loading = true

      this
        .loadList({
          eventId: this.event.id,
          ...this.queryOpts
        })
        .then(({ data: { markets } }) => {
          this.markets = markets
        })
        .finally(() => { this.loading = false })
    }
  }
}
</script>
