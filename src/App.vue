<template>
  <router-view/>
</template>

<script>
import { PROVIDERS_QUERY, PROVIDER_SUBSCRIPTION, MTS_CONNECTION_STATUS_UPDATED } from '@/graphql'
import { SET_PROVIDERS, UPDATE_PROVIDER } from '@/stores/providers'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { HEALTHY, RECOVERING } from './constants/graphql/app-statuses'
import { ONLINE, OFFLINE } from '@/constants/network-events'

const EVENTS = [ONLINE, OFFLINE]

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
    EVENTS.forEach(event => window.addEventListener(event, this.updateOnlineStatus))
    this.updateOnlineStatus()

    this.livechatInit()
  },
  beforeDestroy () {
    EVENTS.forEach(event => window.removeEventListener(event, this.updateOnlineStatus))
  },
  methods: {
    ...mapMutations('providers', {
      setProviders: SET_PROVIDERS,
      updateProvider: UPDATE_PROVIDER
    }),
    ...mapActions(['requestUser']),
    updateAppStatus (status) {
      if (status === RECOVERING) { this.$router.push({ name: 'Maintenance' }) }
      if (status === HEALTHY) { this.$router.push({ name: 'home' }) }
    },
    updateOnlineStatus () {
      !navigator.onLine ? this.$bvModal.show('ConnectionModal') : this.$bvModal.hide('ConnectionModal')
    },
    livechatInit () {
      if (this.isLoggedIn) {
        this.requestUser()
        this.$livechat.setUser(this.getUser)
      }
      if (localStorage.livechat_visible) {
        const livechatStatus = !JSON.parse(localStorage.getItem('livechat_visible'))
        if (livechatStatus) {
          this.$livechat.initWidget()
          this.$livechat.hideWidgetOnPageLoad()
        }
      } else {
        if (this.isMobile && !this.isLoggedIn) {
          this.$livechat.initWidget()
          this.$livechat.hideWidgetOnPageLoad()
        }
      }
    }
  }
}
</script>
