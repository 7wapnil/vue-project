<template>
  <div :class="titleKind">
    <b-container
      fluid
      class="p-0">
      <nav-bar/>
    </b-container>
    <b-container
      fluid
      style="max-width: 1920px"
      class="p-0">
      <router-view :key="$route.fullPath"/>
    </b-container>
    <arc-footer/>
    <modal-list/>
    <cookie-warning/>
  </div>
</template>

<script>
import NavBar from './NavBar'
import ArcFooter from './ArcFooter'
import CookieWarning from './CookieWarning'

export default {
  components: {
    NavBar,
    ArcFooter,
    CookieWarning
  },
  computed: {
    titleKind () {
      const DEFAULT_KIND = 'esports'

      if (this.$route.name === 'live') {
        return 'live'
      }

      return this.$route.params.titleKind || DEFAULT_KIND
    }
  },
  mounted () {
    if (this.$route.query.depositState) {
      this.$root.$emit('bv::show::modal', 'AccountModal')
    }

    if (this.$route.query.resetPassword) {
      this.$root.$emit('bv::show::modal', 'AuthModal')
    }
  }
}
</script>
