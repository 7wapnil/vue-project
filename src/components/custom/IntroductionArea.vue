<template>
  <b-container
    v-if="title"
    fluid
    class="p-0">
    <div class="introduction-area-wrapper">
      <b-img
        :src="background"
        fluid-grow/>
    </div>
  </b-container>
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
