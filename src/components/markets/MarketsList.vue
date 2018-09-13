<template>
  <div class="row">
    <div class="col">
      <loader v-if="loading"/>
      <market-item
        v-if="!loading"
        v-for="market in markets"
        :key="market.id"
        :market="market"/>
    </div>
  </div>
</template>

<script>
import MarketItem from './MatketItem'
import { mapActions } from 'vuex'

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
  created () {
    this.loadMarkets()
  },
  methods: {
    ...mapActions('markets', [
      'loadList'
    ]),
    loadMarkets () {
      this.loading = true
      const opts = this.queryOpts
      opts.eventId = this.event.id

      this
        .loadList(opts)
        .then(({ data: { markets } }) => {
          this.markets = markets
        })
        .finally(() => { this.loading = false })
    }
  }
}
</script>
