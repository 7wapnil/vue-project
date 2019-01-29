<template>
  <div>
    {{ isLiveConnected }} --- {{ isPreLiveConnected }}
    <router-view/>
  </div>

</template>

<script>
import { PROVIDERS_QUERY, PROVIDER_SUBSCRIPTION } from '@/graphql'
import { SET_PROVIDERS, UPDATE_PROVIDER } from '@/stores/providers'
import { mapMutations } from 'vuex'

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
      providerUpdated: {
        query: PROVIDER_SUBSCRIPTION,
        result ({ data }) {
          this.updateProvider(data.provider_updated)
        }
      }
    }
  },
  methods: {
    ...mapMutations('providers', {
      setProviders: SET_PROVIDERS,
      updateProvider: UPDATE_PROVIDER
    })
  }
}
</script>
