<template>
  <b-container
    v-if="title"
    fluid
    class="p-0">
    <div style="max-height: 368px; overflow: hidden">
      <b-img
        :src="background"
        :alt="`${title.name}-background-image`"
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
      return findBackgroundSource({ name: this.title ? this.title.name : '' })
    }
  }
}
</script>
