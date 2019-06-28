<template>
  <b-img
    v-if="title"
    :src="background"
    :alt="`${title.name}-background-image`"
    fluid-grow/>
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
      return findBackgroundSource({ name: this.title ? this.title.name : null })
    }
  }
}
</script>
