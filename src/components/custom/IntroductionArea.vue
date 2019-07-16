<template>
  <b-card
    v-if="title"
    :img-src="background"
    :img-height="isMobile ? '358' : ''"
    overlay
    fluid-grow
    class="introduction-area"
    body-class="p-0">
    <slot/>
  </b-card>
</template>
<script>
import { findBackgroundSource } from '@/helpers/background-finder'

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
    }
  }
}
</script>
