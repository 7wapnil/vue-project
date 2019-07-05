<template>
  <div
    v-if="isLoggedIn && user"
    style="padding: 0 14px"
    class="d-flex align-items-center justify-content-center">
    <b-button
      variant="arc-profile-button"
      @click="showModal"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ]),
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    showModal () {
      this.$bvModal.show('AccountModal')
    }
  }
}
</script>
