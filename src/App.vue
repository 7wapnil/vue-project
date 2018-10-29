<template>
  <router-view/>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created () {
    this.loadAppState()
  },
  methods: {
    ...mapActions('app', {
      loadAppState: 'loadState'
    })
  }
}
</script>
