<template>
  <div :class="titleKind">
    <component :is="layoutName"/>
    <cookie-warning v-if="!isMobile"/>
    <modal-list v-if="!isMobile"/>
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
  computed: {
    titleKind () {
      const DEFAULT_KIND = 'esports'

      if (this.$route.name === 'live') {
        return 'live'
      }

      return this.$route.params.titleKind || DEFAULT_KIND
    },
    isMobile () {
      return this.$mq === 'mobile'
    },
    layoutName () {
      return this.isMobile ? MobileLayout : DesktopLayout
    }
  },
  mounted () {
    if (this.$route.query.depositState) {
      this.$root.$emit('bv::show::modal', 'AccountModal')
    }
  }
}
</script>
