<template>
  <div :class="titleKind">
    <component :is="layoutKind">
        <router-view :key="$route.fullPath"/>
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
    layoutKind () {
      if (!this.$route.meta.layout) {
        const name = this.isMobile ? 'mobile' : 'desktop'
        this.returnLayout(name)
      }
      if (!this.isMobile && this.$route.meta.layout.desktop) {
        const name = this.$route.meta.layout.desktop
        this.returnLayout(name)
      }
      if (this.isMobile && this.$route.meta.layout.mobile) {
        const name = this.$route.meta.layout.mobile
        this.returnLayout(name)
      }
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
  },
  methods: {
    returnLayout(name) {
      return () => import(`@/views/layouts/${name}/MobileLayout`)
    }
  }
}
</script>
