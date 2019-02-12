<template>
  <router-view/>
</template>

<script>
import { PROVIDERS_QUERY, PROVIDER_SUBSCRIPTION, CATEGORY_MARKET_UPDATED, MARKETS_LIST_QUERY } from '@/graphql'
import { SET_PROVIDERS, UPDATE_PROVIDER } from '@/stores/providers'
import { UPDATE_ODDS } from '@/stores/betslip'
import { mapMutations, mapActions } from 'vuex'

export default {
  apollo: {
    providers () {
      return {
        query: PROVIDERS_QUERY,
        result ({ data: { providers } }) {
          this.setProviders(providers)
        }
      }
    },
    markets () {
      return {
        query: MARKETS_LIST_QUERY,
        variables: {
          eventId: 3011,
          limit: 1000
        },
        result ({ data: { markets } }) {
          this.updateOdds(markets)
        }
      }
    },
    $subscribe: {
      providerUpdated: {
        query: PROVIDER_SUBSCRIPTION,
        result ({ data }) {
          this.updateProvider(data.provider_updated)
        }
      },
      categoryMarketUpdated: {
        query: CATEGORY_MARKET_UPDATED,
        result ({ data }) {
          this.updateOdds(data.category_market_updated)
        }
      }
    },
  },
  created () {
    this.fetchWallets()
  },
  methods: {
    ...mapMutations('providers', {
      setProviders: SET_PROVIDERS,
      updateProvider: UPDATE_PROVIDER
    }),
    ...mapMutations('betslip', {
      updateOdds: UPDATE_ODDS
    }),
    ...mapActions('wallets', ['fetchWallets'])
  }
}
</script>
