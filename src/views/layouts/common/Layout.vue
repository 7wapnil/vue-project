<template>
  <div :class="titleKind">
    <component :is="layoutName">
      <router-view/>
    </component>
    <cookie-warning/>
    <modal-list/>
  </div>
</template>

<script>
import CookieWarning from './CookieWarning'
import { ESPORTS } from '@/constants/title-kinds'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    CookieWarning
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
    titleKind () {
      return this.$route.params.titleKind || ESPORTS
    },
    layoutName () {
      const name = this.isMobileDevice ? 'mobile' : 'desktop'
      return () => import(`@/views/layouts/${name}/Layout`)
    }
  },
  updated () {
    if (this.$route.query.login) {
      this.$bvModal.show('AuthModal')
    }
  },
  mounted () {
    if (this.$route.query.depositState) {
      this.$bvModal.show('AccountModal')
    }

    if (this.$route.query.deposit) {
      if (this.user) {
        this.$bvModal.show('AccountModal')
        this.changeTabIndex(3)
      } else {
        this.storeSuccessLoginUrl('openDeposit')
        this.$bvModal.show('AuthModal')
      }
      this.$router.replace({ ...this.$router.currentRoute, query: { deposit: undefined } })
    }

    if (this.$route.query.resetPassword) {
      this.$bvModal.show('AuthModal')
    }

    if (this.$route.query.changePassword) {
      this.$bvModal.show('AccountModal')
    }
  },
  methods: {
    ...mapMutations({ storeSuccessLoginUrl: 'storeSuccessLoginUrl' }),
    ...mapMutations('tabs', {
      changeTabIndex: 'changeTabIndex',
    }),
  },
}
</script>
