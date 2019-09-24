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

const DEFAULT_KIND = 'esports'

export default {
  components: {
    CookieWarning
  },
  data () {
    return {
      mobileMeta: '',
      desktopMeta: ''
    }
  },
  computed: {
    titleKind () {
      if (this.$route.name === 'live') {
        return 'live'
      }
      return this.$route.params.titleKind || DEFAULT_KIND
    },
    layoutKind () {
      if (this.isMobile) {
        if (this.mobileMeta) {
          return () => import(`@/views/layouts/${this.mobileMeta}/layout/MobileLayout`)
        }
        return () => import('@/views/layouts/mobile/MobileLayout')
      }
      if (!this.isMobile) {
        if (this.desktopMeta) {
          return () => import(`@/views/layouts/${this.mobileMeta}/layout/DesktopLayout`)
        }
        return () => import('@/views/layouts/desktop/DesktopLayout')
      }
    }
  },
  watch: {
    '$route': {
      handler: 'getMetaData',
      immediate: true
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
    getMetaData (to) {
      if (to.meta.layout) {
        this.mobileMeta = to.meta.layout.mobile
        this.desktopMeta = to.meta.layout.desktop
      }
    }
  }
}
</script>
