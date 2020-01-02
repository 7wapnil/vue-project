<template>
  <div>
    <casino-providers-header/>
    <div class="p-0 px-md-2 mb-md-2">
      <b-row no-gutters>
        <b-col
          v-for="provider in providers"
          :key="provider.id"
          cols="12"
          md="6">
          <component
            :is="providerComponent"
            :provider="provider"/>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import CasinoProvidersHeader from '@/views/casino/providers/CasinoProvidersHeader'
import { NETWORK_ONLY } from '@/constants/graphql/fetch-policy'
import { GAME_PROVIDERS_QUERY } from '@/graphql'

export default {
  components: {
    CasinoProvidersHeader
  },
  data () {
    return {
      gameProviders: []
    }
  },
  apollo: {
    gameProviders () {
      return {
        query: GAME_PROVIDERS_QUERY,
        fetchPolicy: NETWORK_ONLY
      }
    }
  },
  computed: {
    providers () {
      if (this.gameProviders) {
        return this.gameProviders.filter(provider => provider.enabled === 'true')
      }
    },
    providerComponent () {
      const ProviderItem = () => import('@/views/casino/providers/CasinoProvidersItem')
      const ProviderItemMobile = () => import('@/views/casino/providers/CasinoProvidersItemMobile')
      return this.isMobile ? ProviderItemMobile : ProviderItem
    }
  }
}
</script>
