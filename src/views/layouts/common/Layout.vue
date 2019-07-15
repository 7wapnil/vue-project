<template>
  <div :class="titleKind">
    <component :is="layoutName">
      <router-view :key="$route.fullPath"/>
    </component>
    <cookie-warning v-if="!isMobile"/>
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
      this.$root.$emit('bv::show::modal', 'AuthModal')
    }
  }
}
</script>
