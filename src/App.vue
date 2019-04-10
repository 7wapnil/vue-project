<template>
  <router-view/>
</template>

<script>
import { PROVIDERS_QUERY, PROVIDER_SUBSCRIPTION, APPLICATION_STATUS_UPDATED } from '@/graphql'
import { SET_PROVIDERS, UPDATE_PROVIDER } from '@/stores/providers'
import { mapMutations, mapActions, mapGetters } from 'vuex'

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
      applicationStatusUpdated () {
        return {
          query: APPLICATION_STATUS_UPDATED,
          result ({ data }) {
            this.updateAppStatus(data.application_status_updated.status)
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
    updateAppStatus (status) {
      if (status === 'recovering') { return this.$router.push({ name: 'Maintenance' }) }
      if (status === 'healthy') { return this.$router.push({ name: 'home' }) }
    }
  }
}
</script>
