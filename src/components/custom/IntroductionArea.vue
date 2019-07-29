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

export default {
  props: {
    title: {
      type: Object,
      default: null
    }
  },
  computed: {
    background () {
      const route = this.$route.params.titleKind
      return findBackgroundSource({ name: this.title ? this.title.name : null, route })
    },
    backgroundHeight () {
      if (this.isMobile && !this.isLoggedIn) {
        return '266'
      }
      return this.isMobile ? '168' : '356'
    },
    ...mapGetters([
      'isLoggedIn'
    ])
  }
}
</script>
