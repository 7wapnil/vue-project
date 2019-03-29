<template>
  <router-view/>
</template>

<script>
import { PROVIDERS_QUERY, PROVIDER_SUBSCRIPTION } from '@/graphql'
import { SET_PROVIDERS, UPDATE_PROVIDER } from '@/stores/providers'
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  apollo: {
    providers () {
      return {
        query: PROVIDERS_QUERY,
        result ({ data: { providers } }) {
          this.setProviders(providers)
        },
        error (error) {
          if (error.networkError) {
            this.$router.push({ name: 'Maintenance' })
          }
        }
      }
    },
    $subscribe: {
      providerUpdated: {
        query: PROVIDER_SUBSCRIPTION,
        result ({ data }) {
          this.updateProvider(data.provider_updated)
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
  }
}
</script>
