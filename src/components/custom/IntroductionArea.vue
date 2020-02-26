<template>
  <b-card
    v-if="title"
    :img-src="background"
    :img-height="backgroundHeight"
    overlay
    class="introduction-area"
    body-class="p-0">
    <slot/>
  </b-card>

</template>
<script>
import { findBackgroundSource } from '@/helpers/background-finder'
import { mapGetters } from 'vuex'

const MOBILE_BACKGROUND_HEIGHT = '172'
const MOBILE_BACKGROUND_HEIGHT_WITH_AUTH_BLOCK = '266'
const DESKTOP_BACKGROUND_HEIGHT = '356'

export default {
  name: 'IntroductionArea',
  props: {
    title: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ]),
    background () {
      const route = this.$route.params.titleKind
      return findBackgroundSource({ name: this.title ? this.title.name : null, route })
    },
    backgroundHeight () {
      if (this.isMobile && !this.isLoggedIn) {
        return MOBILE_BACKGROUND_HEIGHT_WITH_AUTH_BLOCK
      }
      return this.isMobile ? MOBILE_BACKGROUND_HEIGHT : DESKTOP_BACKGROUND_HEIGHT
    }
  }
}
</script>
