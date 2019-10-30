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

export default {
  components: {
    CookieWarning
  },
  computed: {
    titleKind () {
      const DEFAULT_KIND = 'esports'

      if (this.$route.name === 'live') {
        return 'live'
      }

      return this.$route.params.titleKind || DEFAULT_KIND
    },
    layoutName () {
      const name = this.isMobile ? 'mobile' : 'desktop'
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

    if (this.$route.query.resetPassword) {
      this.$bvModal.show('AuthModal')
    }

    if (this.$route.query.changePassword) {
      this.$bvModal.show('AccountModal')
    }
  }
}
</script>
