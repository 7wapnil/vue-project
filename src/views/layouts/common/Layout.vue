<template>
  <div :class="titleKind">
    <component :is="layoutName"/>
    <cookie-warning v-if="!isMobile"/>
    <modal-list v-if="!isMobile"/>
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
      return () => import(`../${name}/Layout`)
    }
  },
  mounted () {
    if (this.$route.query.depositState) {
      this.$root.$emit('bv::show::modal', 'AccountModal')
    }
  }
}
</script>
