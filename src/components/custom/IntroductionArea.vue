<template>
  <b-container
    fluid
    class="p-0">
    <b-img  style="z-index: -999"
            fluid-grow
            :src="background"
            alt="Responsive image"/>
  </b-container>
</template>
<script>
  import { findBackgroundSource } from '@/helpers/background-finder'

  export default {
    computed: {
      background () {
        return findBackgroundSource({ name: this.title ? this.title.name: '' })
      }
    },
    props: {
      title: {
        type: Object,
        default: null
      }
    }
  }
</script>
