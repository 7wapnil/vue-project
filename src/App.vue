<template>
  <router-view/>
</template>

<script>
import { PROVIDERS_QUERY, PROVIDER_SUBSCRIPTION, MTS_CONNECTION_STATUS_UPDATED } from '@/graphql'
import { SET_PROVIDERS, UPDATE_PROVIDER } from '@/stores/providers'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { HEALTHY, RECOVERING } from './constants/graphql/app-statuses'

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
    $subscribe: {
      providerUpdated () {
        return {
          query: PROVIDER_SUBSCRIPTION,
          result ({ data }) {
            this.updateProvider(data.provider_updated)
          }
        }
      },
      mtsConnectionStatusUpdated () {
        return {
          query: MTS_CONNECTION_STATUS_UPDATED,
          result ({ data }) {
            this.updateAppStatus(data.mts_connection_status_updated.status)
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getUser'])
  },
  created () {
    if (this.isLoggedIn) {
      this.fetchWallets()
      this.fetchBonuses()
      this.$livechat.setUser(this.getUser)
    }
    this.$livechat.initWidget()
  },
  methods: {
    ...mapMutations('providers', {
      setProviders: SET_PROVIDERS,
      updateProvider: UPDATE_PROVIDER
    }),
    ...mapActions('wallets', ['fetchWallets']),
    ...mapActions('bonus', ['fetchBonuses']),
    updateAppStatus (status) {
      if (status === RECOVERING) { this.$router.push({ name: 'Maintenance' }) }
      if (status === HEALTHY) { this.$router.push({ name: 'home' }) }
    }
  }
}
</script>
