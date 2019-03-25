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
  import { findBackground } from '@/helpers/background-finder'

  export default {
    computed: {
      imageFileName () {
        return findBackground({ name: this.title ? this.title.name: '' })
      },
      background () {
        return require(`@/assets/images/introduction-area/${this.imageFileName}.png`)
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
