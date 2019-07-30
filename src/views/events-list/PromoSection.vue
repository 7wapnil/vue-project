<template>
  <b-row
    v-if="isMobile && !isLoggedIn"
    no-gutters
    class="h-auto mt-4"
    align-v="start">
    <b-col>
      <slot/>
    </b-col>
  </b-row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  }
}
</script>
