<template>
  <router-view/>
</template>

<script>
import { PROVIDERS_QUERY, PROVIDER_SUBSCRIPTION, MTS_CONNECTION_STATUS_UPDATED } from '@/graphql'
import { SET_PROVIDERS, UPDATE_PROVIDER } from '@/stores/providers'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { HEALTHY, RECOVERING } from './constants/graphql/app-statuses'
import { ONLINE, OFFLINE } from '@/constants/network-events'

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
            this.updateProvider(data.providerUpdated)
          }
        }
      },
      mtsConnectionStatusUpdated () {
        return {
          query: MTS_CONNECTION_STATUS_UPDATED,
          result ({ data }) {
            this.updateAppStatus(data.mtsConnectionStatusUpdated.status)
          }
        }
      }
    }
  },
  data () {
    return {
      isOnline: navigator.onLine || false
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getUser'])
  },
  metaInfo () {
    const key = this.$route.params.titleKind || 'defaultTags'
    return {
      title: this.$i18n.t(`meta.${key}.title`),
      meta: [{ name: 'description', content: this.$i18n.t(`meta.${key}.description`), vmid: 'desc' }]
    }
  },
  created () {
    [ONLINE, OFFLINE].forEach(event => window.addEventListener(event, this.updateOnlineStatus))
    if (this.isLoggedIn) {
      this.fetchWallets()
      this.$livechat.setUser(this.getUser)
    }

    this.$livechat.initWidget()
  },
  beforeDestroy () {
    [ONLINE, OFFLINE].forEach(event => window.removeEventListener(event, this.updateOnlineStatus))
  },
  methods: {
    ...mapMutations('providers', {
      setProviders: SET_PROVIDERS,
      updateProvider: UPDATE_PROVIDER
    }),
    ...mapActions('wallets', ['fetchWallets']),
    updateAppStatus (status) {
      if (status === RECOVERING) { this.$router.push({ name: 'Maintenance' }) }
      if (status === HEALTHY) { this.$router.push({ name: 'home' }) }
    },
    updateOnlineStatus () {
      console.log('here')
      this.isOnline = navigator.onLine || false
      console.log(this.isOnline)
      this.isOnline ? this.$router.push({ name: 'home' }) : this.$router.push({ name: 'NoConnection' })
    }
  }
}
</script>
