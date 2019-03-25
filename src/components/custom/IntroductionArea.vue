<template>
  <b-container
    fluid
    class="p-0">
    <b-img  style="z-index: -999"
            fluid-grow
            alt="Responsive image"/>
      {{ imgTitle }}
  </b-container>
</template>
<script>
  export default {
    computed: {
      background () {
        return require(`@/assets/images/introduction-area/${this.imgTitle}.png`)
      }
    },
    props: {
      imgTitle: {
        type: String,
        default: 'yoooopta'
      }
    }
  }
</script>
