<template>
  <div :class="titleKind">
    <component :is="layout"/>
    <cookie-warning/>
    <modal-list/>
  </div>
</template>

<script>
import CookieWarning from './CookieWarning'
import MobileLayout from '../mobile/Layout'
import DesktopLayout from '../desktop/Layout'

export default {
  components: {
    CookieWarning,
    MobileLayout,
    DesktopLayout
  },
  data () {
    return {
      mobile: false
    }
  },
  computed: {
    titleKind () {
      const DEFAULT_KIND = 'esports'

      if (this.$route.name === 'live') {
        return 'live'
      }

      return this.$route.params.titleKind || DEFAULT_KIND
    },
    layout () {
      return this.mobile ? MobileLayout : DesktopLayout
    }
  },
  updated () {
    if (this.$route.query.login) {
      this.$root.$emit('bv::show::modal', 'AuthModal')
    }
  },
  created () {
    this.mobile = window.innerWidth < 550
    window.addEventListener('resize', () => {
      this.mobile = window.innerWidth < 550
    })
  },
  mounted () {
    if (this.$route.query.depositState) {
      this.$root.$emit('bv::show::modal', 'AccountModal')
    }
  }
}
</script>
