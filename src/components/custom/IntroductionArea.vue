<template>
  <b-container
    fluid
    class="p-0">
    <b-img  style="z-index: -999"
            :src="background"
            fluid-grow
            alt="Responsive image"/>
  </b-container>
</template>
<script>
  export default {
    computed: {
      background () {
        return require('@/assets/images/introduction-area/background-basketball.png')
      }
    }
  }
</script>
