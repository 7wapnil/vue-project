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

export default {
  components: {
    CookieWarning
  },
  computed: {
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

    if (this.$route.query.resetPassword) {
      this.$bvModal.show('AuthModal')
    }

    if (this.$route.query.changePassword) {
      this.$bvModal.show('AccountModal')
    }
  }
}
</script>
