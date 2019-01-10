<template>
  <div :class="titleKind">
    <b-container
      fluid
      class="p-0">
      <nav-bar/>
    </b-container>
    <b-container
      fluid
      style="max-width: 1920px"
      class="p-0">

      <router-view/>

    </b-container>
    <arc-footer/>
  </div>
</template>

<script>
import NavBar from './NavBar'
import ArcFooter from './ArcFooter'

export default {
  components: {
    NavBar,
    ArcFooter
  },
  computed: {
    titleKind () {
      if (this.$route.name === 'live') {
        return 'live'
      }

      return this.$route.params.titleKind
    }
  }
}
</script>
