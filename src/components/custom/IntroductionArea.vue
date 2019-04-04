<template>
  <b-container
    v-if="title"
    fluid
    class="p-0">
    <b-img
      :src="background"
      :alt="`${title.name}-background-image`"
      fluid-grow
      center
      style="min-height: 386px; max-height: 386px"/>
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
      return findBackgroundSource({ name: this.title ? this.title.name : '' })
    }
  }
}
</script>
