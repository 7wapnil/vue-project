<template>
  <router-view/>
</template>

<script>
import { PROVIDERS_QUERY, PROVIDERS_SUBSCRIPTION } from '@/graphql'
import { SET_PROVIDERS, UPDATE_PROVIDER } from '@/stores/providers'
import { mapMutations } from 'vuex'

export default {
  apollo: {
    providers () {
      return {
        query: PROVIDERS_QUERY,
        result ({ data: { providers } }) {
          this.setProviders(providers)
        },
        subscribeToMore: {
          document: PROVIDERS_SUBSCRIPTION,
          result ({ provider }) {
            this.updateProvider(provider)
          }
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
