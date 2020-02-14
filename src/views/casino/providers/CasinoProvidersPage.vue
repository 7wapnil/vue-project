<template>
  <div>
    <casino-providers-header/>
    <loader v-if="$apollo.loading"/>
    <div class="p-0 px-md-2 mb-md-2">
      <b-row no-gutters>
        <b-col
          v-for="provider in gameProviders"
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
import { buildDefaultMetaTags } from '@/helpers/meta'
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
  metaInfo () {
    return buildDefaultMetaTags({
      title: this.$i18n.t('meta.casino.providers.title'),
      description: this.$i18n.t('meta.casino.providers.description'),
      i18n: this.$i18n,
      siteUrl: window.location.href
    })
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
    providerComponent () {
      const ProviderItem = () => import('@/views/casino/providers/CasinoProvidersItem')
      const ProviderItemMobile = () => import('@/views/casino/providers/CasinoProvidersItemMobile')
      return this.isMobile ? ProviderItemMobile : ProviderItem
    }
  }
}
</script>
